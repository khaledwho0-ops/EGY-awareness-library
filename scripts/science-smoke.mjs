import { createServer } from "node:http";
import { setTimeout as delay } from "node:timers/promises";
import next from "next";

const port = Number(process.env.SCIENCE_SMOKE_PORT || 3021);
const host = "127.0.0.1";
const baseUrl = `http://${host}:${port}`;

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function waitForServer(url, attempts = 40) {
  for (let index = 0; index < attempts; index += 1) {
    try {
      const response = await fetch(url, { redirect: "manual" });
      if (response.ok) {
        return;
      }
    } catch {
      // Retry until the server is ready.
    }

    await delay(500);
  }

  throw new Error(`Server did not become ready at ${url}`);
}

async function requestJson(path, init) {
  const response = await fetch(`${baseUrl}${path}`, init);
  assert(response.ok, `${path} returned ${response.status}`);
  return response.json();
}

async function requestStatus(path) {
  const response = await fetch(`${baseUrl}${path}`, { redirect: "manual" });
  assert(response.ok, `${path} returned ${response.status}`);
  return response.status;
}

const app = next({
  dev: false,
  dir: process.cwd(),
  hostname: host,
  port,
});

let server;

try {
  await app.prepare();
  const handle = app.getRequestHandler();

  server = createServer((req, res) => handle(req, res));
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, host, resolve);
  });

  await waitForServer(`${baseUrl}/`);

  const journey = await requestJson("/api/science/journey");
  const evidence = await requestJson("/api/science/evidence");
  const refresh = await requestJson("/api/science/refresh", { method: "POST" });
  const report = await requestJson("/api/science/report");
  const modulePayload = await requestJson("/api/science/module/deepreal");
  const workflow = await requestJson("/api/science/workflow?module=deepreal");
  const gameResetBeforeAnswer = await requestJson("/api/science/game", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "reset", mode: "classic" }),
  });
  const game = await requestJson("/api/science/game?mode=classic");
  const firstChoiceId = game?.currentRound?.choices?.[0]?.id;
  assert(typeof firstChoiceId === "string" && firstChoiceId.length > 0, "Game payload is missing the first choice");
  const gameAnswer = await requestJson("/api/science/game", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "answer", mode: "classic", choiceId: firstChoiceId }),
  });
  const gameReset = await requestJson("/api/science/game", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "reset", mode: "classic" }),
  });
  const homeStatus = await requestStatus("/");
  const dashboardStatus = await requestStatus("/dashboard");
  const deeprealGameStatus = await requestStatus("/deepreal/game");
  const evidencePageStatus = await requestStatus("/evidence");
  const reversePageStatus = await requestStatus("/reverse");
  const presentationPageStatus = await requestStatus("/presentation");

  assert(Array.isArray(journey.modules) && journey.modules.length === 3, "Journey payload is missing modules");
  assert(typeof journey.primaryModule === "string", "Journey payload is missing primaryModule");
  assert(Array.isArray(evidence.modules) && evidence.modules.length === 3, "Evidence payload is missing modules");
  assert(typeof refresh.lastRefreshAt === "string" && refresh.lastRefreshAt.length > 0, "Refresh did not persist lastRefreshAt");
  if (!Array.isArray(refresh.history) || refresh.history.length === 0) {
    console.error("Refresh object returned from /api/science/refresh:", JSON.stringify(refresh, null, 2));
  }
  assert(Array.isArray(refresh.history) && refresh.history.length > 0, "Refresh history was not recorded");
  assert(Array.isArray(refresh.sources) && refresh.sources.length > 0, "Source registry is empty");
  assert(Array.isArray(report.evidence) && report.evidence.length === 3, "Report payload is missing evidence modules");
  assert(typeof modulePayload?.evidence?.sourceHealth?.total === "number", "Module payload is missing evidence source health");
  assert(Array.isArray(workflow.completedStepIds), "Workflow payload is missing completedStepIds");
  assert(Array.isArray(gameResetBeforeAnswer?.progress?.history) && gameResetBeforeAnswer.progress.history.length === 0, "Game reset before answer did not clear history");
  assert(typeof game?.totalRounds === "number" && game.totalRounds > 0, "Game payload is missing rounds");
  assert(typeof game?.mode?.id === "string", "Game payload is missing mode");
  assert(Array.isArray(gameAnswer?.progress?.history) && gameAnswer.progress.history.length > 0, "Game answer did not record history");
  assert(typeof gameAnswer?.lastResolution?.choiceId === "string", "Game answer did not return resolution");
  assert(Array.isArray(gameReset?.progress?.history) && gameReset.progress.history.length === 0, "Game reset did not clear history");

  console.log(
    JSON.stringify(
      {
        ok: true,
        port,
        endpoints: {
          home: homeStatus,
          dashboard: dashboardStatus,
          deeprealGame: deeprealGameStatus,
          evidence: evidencePageStatus,
          reverse: reversePageStatus,
          presentation: presentationPageStatus,
          journeyModules: journey.modules.length,
          evidenceModules: evidence.modules.length,
          refreshHistory: refresh.history.length,
          trackedSources: refresh.sourceCount,
          gameHistoryAfterAnswer: gameAnswer.progress.history.length,
        },
      },
      null,
      2,
    ),
  );
} catch (error) {
  console.error("SCIENCE_SMOKE_FAILED");
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
} finally {
  if (server) {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    }).catch(() => undefined);
  }

  if (typeof app.close === "function") {
    await app.close().catch(() => undefined);
  }
}
