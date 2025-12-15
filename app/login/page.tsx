"use client";

import { AuthBranding } from "@/app/_components/auth/AuthBranding";
import { LoginForm } from "@/app/_components/auth/LoginForm";
import { toast } from "@/app/_hooks/use-toast";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

export default function Login() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("emailSent") === "true") {
      toast({
        title: "E-mail enviado!",
        description: "Verifique sua caixa de entrada para confirmar sua conta.",
      });
    }
  }, [searchParams]);

  return (
    <div className="flex min-h-screen">
      <AuthBranding
        title={
          <>
            Sistema de Operações
            <br />
            Impetus Hub
          </>
        }
        subtitle="Plataforma interna para gerenciamento de operações e automações."
      />
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
