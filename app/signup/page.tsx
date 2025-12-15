"use client";

import { AuthBranding } from "@/app/_components/auth/AuthBranding";
import { SignupForm } from "@/app/_components/auth/SignupForm";

export default function Signup() {
  return (
    <div className="flex min-h-screen">
      <AuthBranding
        title={
          <>
            Cadastro de Usuário
            <br />
            Impetus Hub
          </>
        }
        subtitle="Solicite acesso à plataforma de operações internas."
      />
      <SignupForm />
    </div>
  );
}
