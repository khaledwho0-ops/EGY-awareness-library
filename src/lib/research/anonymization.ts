import { createHash } from "crypto";

const EXPORT_NAMESPACE = "egyptian-awareness-library-research-export-v1";

function fallbackHash(value: string): string {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return (hash >>> 0).toString(16).padStart(8, "0");
}

async function sha256Hex(value: string): Promise<string> {
  if (typeof globalThis.crypto !== "undefined" && globalThis.crypto.subtle) {
    const encoded = new TextEncoder().encode(value);
    const digest = await globalThis.crypto.subtle.digest("SHA-256", encoded);

    return Array.from(new Uint8Array(digest))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  return fallbackHash(value);
}

export async function anonymizeParticipantId(participantId: string): Promise<string> {
  const normalized = participantId.trim() || "anonymous";
  const digest = await sha256Hex(`${EXPORT_NAMESPACE}:${normalized}`);
  return `anon_${digest.slice(0, 24)}`;
}

/**
 * Synchronous server-side participant ID hash using Node.js crypto.
 * Used by API routes where async is inconvenient.
 */
export function hashParticipantId(participantId: string): string {
  const normalized = (participantId || "anonymous").trim();
  const digest = createHash("sha256")
    .update(`${EXPORT_NAMESPACE}:${normalized}`)
    .digest("hex");
  return `anon_${digest.slice(0, 24)}`;
}

export async function anonymizeParticipantEntity<T extends { participantId: string }>(entity: T): Promise<T> {
  return {
    ...entity,
    participantId: await anonymizeParticipantId(entity.participantId),
  };
}

export async function anonymizeParticipantEntities<T extends { participantId: string }>(entities: T[]): Promise<T[]> {
  return Promise.all(entities.map((entity) => anonymizeParticipantEntity(entity)));
}
