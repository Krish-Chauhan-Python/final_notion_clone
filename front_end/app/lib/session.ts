import "server-only";
import { SignJWT, jwtVerify } from "jose";

// Lazy key getter so we can throw a helpful error if the env var is missing
const secretKey = process.env.SESSION_SECRET;
function getKey() {
  if (!secretKey) {
    throw new Error(
      "Missing SESSION_SECRET environment variable. Please set process.env.SESSION_SECRET"
    );
  }
  return new TextEncoder().encode(secretKey);
}

export async function createSession(userId: string): Promise<{ session: string; expiresAt: Date }> {
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000);
  
  const session = await encrypt({ userId });

  return { session, expiresAt };
}

type SessionPayload = {
  userId: string;
};
    
export async function encrypt(payload: SessionPayload) {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30m")
    .sign(getKey());
}

export async function decrypt(session: string | undefined = "") {
  if (!session) return undefined;
  try {
    const { payload } = await jwtVerify(session, getKey(), {
      algorithms: ["HS256"],
    });
    
    return payload as { userId?: string; iat?: number; exp?: number };
  } catch (error) {
    console.log("Failed to verify session", error);
    return undefined;
  }
}