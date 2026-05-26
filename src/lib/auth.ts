"use server";

import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "eal_pilot_super_secret_key_2026_x_zero_trust");

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin" | "guest";
  createdAt: string;
  lastLogin: string;
  preferences: {
    language: "ar" | "en";
    theme: string;
    highContrast: boolean;
  };
  progress: {
    xp: number;
    streak: number;
    completedExercises: string[];
    visitedPages: string[];
    assessmentScores: Record<string, number>;
    badges: string[];
  };
}

// In-memory mock DB for the N=84 Pilot (Zero-Trust Server-Side Only)
const mockDb = {
  users: new Map<string, any>()
};

async function issueAuthCookie(user: UserProfile) {
  const jwt = await new SignJWT({ user })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secret);

  const cookieStore = await cookies();
  cookieStore.set("eal_pilot_auth", jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
}

export async function getCurrentUser(): Promise<UserProfile | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("eal_pilot_auth")?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload.user as UserProfile;
  } catch {
    return null;
  }
}

export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  return user?.role === "admin";
}

export async function loginUser(email: string, password: string, options?: any) {
  const userRecord = mockDb.users.get(email.toLowerCase());
  if (!userRecord) return { ok: false as const, errorCode: "INVALID_CREDENTIALS" };
  
  const isValid = bcrypt.compareSync(password, userRecord.hash);
  if (!isValid) return { ok: false as const, errorCode: "INVALID_CREDENTIALS" };

  const user = userRecord.profile;
  user.lastLogin = new Date().toISOString();
  
  await issueAuthCookie(user);
  return { ok: true as const, user };
}

export async function registerUser(name: string, email: string, password: string, adminCode?: string, options?: any) {
  if (mockDb.users.has(email.toLowerCase())) {
    return { ok: false as const, errorCode: "EMAIL_EXISTS" };
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const user: UserProfile = {
    id: crypto.randomUUID(),
    name,
    email: email.toLowerCase(),
    role: adminCode === "EAL-ADMIN-2026" ? "admin" : "user",
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    preferences: { language: "ar", theme: "default", highContrast: false },
    progress: { xp: 0, streak: 0, completedExercises: [], visitedPages: [], assessmentScores: {}, badges: [] },
  };

  mockDb.users.set(email.toLowerCase(), { hash, profile: user });
  await issueAuthCookie(user);
  return { ok: true as const, user };
}

export async function loginAsGuest(options?: any) {
  const user: UserProfile = {
    id: crypto.randomUUID(),
    name: "Guest User",
    email: "guest@example.com",
    role: "guest",
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    preferences: { language: "ar", theme: "default", highContrast: false },
    progress: { xp: 0, streak: 0, completedExercises: [], visitedPages: [], assessmentScores: {}, badges: [] },
  };
  await issueAuthCookie(user);
  return { ok: true as const, user };
}

export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete("eal_pilot_auth");
}

export async function requestPasswordReset(email: string) {
  return { previewToken: "PILOT-RESET-1234", expiresAt: new Date(Date.now() + 3600000).toISOString() };
}

export async function resetPassword(email: string, code: string, password: string, confirmPassword?: string, options?: any) {
  return { ok: false as const, errorCode: "RESET_TOKEN_INVALID" };
}

export async function seedAdmin() {
  // Silent setup, mock DB
}
