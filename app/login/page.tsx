"use client";

import { AuthBranding } from "@/app/_components/auth/AuthBranding";
import { LoginEmailNotification } from "@/app/_components/auth/LoginEmailNotification";
import { LoginForm } from "@/app/_components/auth/LoginForm";
import { Suspense } from "react";

export default function Login() {
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
        <LoginEmailNotification />
        <LoginForm />
      </Suspense>
    </div>
  );
}
