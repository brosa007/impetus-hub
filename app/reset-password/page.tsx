"use client";

import { AuthBranding } from "@/app/_components/auth/AuthBranding";
import { ResetPasswordForm } from "@/app/_components/auth/ResetPasswordForm";

export default function ResetPassword() {
  return (
    <div className="flex min-h-screen">
      <AuthBranding
        title={
          <>
            Nova senha
            <br />
            de acesso
          </>
        }
        subtitle="Digite uma nova senha segura para acessar sua conta."
      />
      <ResetPasswordForm />
    </div>
  );
}
