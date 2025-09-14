"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
};

export default function useRegister() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  const onFinish = async (values: RegisterFormValues) => {
    setLoading(true);
    setError(null);
    setOk(false);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    setLoading(false);
    if (res.ok) {
      setOk(true);
      setTimeout(() => router.push("/auth/login"), 800);
    } else {
      const data: unknown = await res.json().catch(() => ({}));
      const msg =
        typeof data === "object" && data !== null && "error" in data
          ? (data as { error: string }).error
          : "Đăng ký thất bại";
      setError(msg);
    }
  };

  return { loading, error, ok, onFinish };
}
