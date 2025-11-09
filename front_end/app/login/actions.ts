"use server";

import { z } from "zod";
import { createSession } from "@/app/lib/session";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const testUser = {
  id: "1",
  email: "krish@gmail.com",
  password: "12345678",
};

const loginSchema = z.object({
  email: z.email({ message: "Invalid email address" }).trim(),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }).trim(),
});

export async function login(prevState: any, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  if (email !== testUser.email || password !== testUser.password) {
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }

  const { session, expiresAt } = await createSession(testUser.id);

  // Set the cookie in the request context (server action) where cookies().set is available
  const cookieStore = await (cookies() as unknown as Promise<any>);
  (cookieStore as any).set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/",
  });

  redirect("/dashboard");
}

export async function logout() {
  // Delete the cookie in the request context
  const cookieStore = await (cookies() as unknown as Promise<any>);
  (cookieStore as any).delete("session");
  redirect("/login");
}