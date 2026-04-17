"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GoogleSignButton } from "@/components/google-sign-button";
import { Card } from "@/components/ui/card";
import Loading from "../loading";

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!formData.email.trim()) {
      setError("Por favor, preencha seu email");
      return;
    }

    if (!formData.password.trim()) {
      setError("Por favor, preencha sua senha");
      return;
    }

    setLoading(true);

    try {
      const { error: signInError } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
      });

      if (signInError) {
        setError(signInError.message || "Erro ao fazer login");
      } else {
        router.push("/");
      }
    } catch (err) {
      setError("Erro ao fazer login. Tente novamente");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="itens-center flex min-h-screen justify-center px-6 py-6">
          <Card className="w-full max-w-md shadow-lg">
            <div className="p-8">
              <h1 className="mb-5 text-center text-3xl font-bold text-gray-900">
                Entrar
              </h1>

              {error && (
                <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-gray-900"
                  >
                    Email
                  </label>
                  <Input
                    placeholder="Seu email"
                    name="email"
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border-gray-300"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-gray-900"
                  >
                    Senha
                  </label>
                  <Input
                    placeholder="Sua senha"
                    name="password"
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="border-gray-300"
                  />
                </div>

                <Button
                  type="submit"
                  className="mt-6 w-full"
                  disabled={loading}
                >
                  {loading ? "Entrando..." : "Entrar"}
                </Button>

                <p className="mt-4 text-center text-sm text-gray-600">
                  Não tem uma conta?{" "}
                  <a
                    href="/sign-up"
                    className="font-semibold text-black hover:underline"
                  >
                    Criar conta
                  </a>
                </p>
              </form>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
