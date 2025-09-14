"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export type LoginFormValues = { email: string; password: string };

export default function useLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onFinish = async (values: LoginFormValues) => {
    setLoading(true);
    setError(null);
    const res = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });
    setLoading(false);
    if (res?.ok) {
      router.push("/");
    } else {
      setError("Email hoặc mật khẩu không đúng");
    }
  };

  return { loading, error, onFinish };
}
