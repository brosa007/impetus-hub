"use client";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { toast } from "@/app/_hooks/use-toast";
import { createClient } from "@/app/_lib/supabase/client";
import { ArrowRight, Eye, EyeOff, Zap } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchParams.get("emailSent") === "true") {
      toast({
        title: "E-mail enviado!",
        description: "Verifique sua caixa de entrada para confirmar sua conta.",
      });
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const supabase = createClient();

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Erro ao fazer login",
          description: error.message,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      if (data.user) {
        toast({
          title: "Login realizado",
          description: "Bem-vindo ao Impetus Hub!",
        });
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      toast({
        title: "Erro inesperado",
        description: "Ocorreu um erro ao fazer login. Tente novamente.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Branding */}
      <div className="from-primary via-primary/90 to-primary/80 relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br p-12 lg:flex lg:w-1/2">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="bg-primary-foreground absolute top-20 left-10 h-72 w-72 rounded-full blur-3xl" />
          <div className="bg-primary-foreground absolute right-10 bottom-20 h-96 w-96 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="bg-primary-foreground/20 flex h-12 w-12 items-center justify-center rounded-xl backdrop-blur-sm">
              <Zap className="text-primary-foreground h-6 w-6" />
            </div>
            <span className="text-primary-foreground text-2xl font-bold">
              Impetus Hub
            </span>
          </div>
        </div>

        <div className="relative z-10 flex flex-col gap-6">
          <h1 className="text-primary-foreground text-4xl leading-tight font-bold">
            Sistema de Operações
            <br />
            Impetus Hub
          </h1>
          <p className="text-primary-foreground/80 max-w-md text-lg">
            Plataforma interna para gerenciamento de operações e automações.
          </p>
        </div>

        <div className="text-primary-foreground/60 relative z-10 text-sm">
          © {new Date().getFullYear()} Grupo Impetus. Europa.
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="bg-background flex flex-1 items-center justify-center p-8">
        <div className="flex w-full max-w-md flex-col gap-8">
          <div className="flex flex-col gap-2 text-center lg:text-left">
            <h2 className="text-2xl font-bold tracking-tight">
              Acesso ao sistema
            </h2>
            <p className="text-muted-foreground">
              Faça login com suas credenciais corporativas
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                className="h-11"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  className="h-11 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button type="submit" className="h-11 w-full" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="border-primary-foreground/30 border-t-primary-foreground h-4 w-4 animate-spin rounded-full border-2" />
                  Entrando...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Entrar
                  <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </Button>
          </form>

          <p className="text-muted-foreground text-center text-sm">
            Não tem uma conta?{" "}
            <Link
              href="/signup"
              className="text-primary cursor-pointer hover:underline"
            >
              Criar conta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
