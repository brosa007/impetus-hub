"use client";

import { toast } from "@/app/_hooks/use-toast";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function LoginEmailNotification() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("emailSent") === "true") {
      toast({
        title: "E-mail enviado!",
        description: "Verifique sua caixa de entrada para confirmar sua conta.",
      });
    }
  }, [searchParams]);

  return null;
}
