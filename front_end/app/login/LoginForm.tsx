"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "./actions";

export function LoginForm() {
  const [state, loginAction] = useActionState(login, undefined);

  return (
    <div className="max-w-sm mx-auto mt-16 p-8 bg-white rounded-xl shadow-lg border">
      <h1 className="text-2xl font-extrabold text-blue-700 mb-6 text-center tracking-tight">
        Login
      </h1>
      <form action={loginAction} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            className="px-3 py-2 border placeholder-gray-300 text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {state?.errors?.email && (
            <p className="text-red-500 text-sm mt-1">{state.errors.email}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            className="px-3 py-2 border placeholder-gray-300 text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {state?.errors?.password && (
            <p className="text-red-500 text-sm mt-1">{state.errors.password}</p>
          )}
        </div>

        <SubmitButton />
      </form>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="w-full mt-4 py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-blue-300 transition"
    >
      {pending ? "Logging in..." : "Login"}
    </button>
  );
}
