"use client";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { toast } from "@/app/_hooks/use-toast";
import { createClient } from "@/app/_lib/supabase/client";
import { ArrowRight, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function ResetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setIsValidToken(true);
      } else {
        setIsValidToken(false);
      }
    };

    checkSession();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) {
      toast({
        title: "Senhas não coincidem",
        description: "As senhas devem ser iguais.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Senha muito curta",
        description: "A senha deve ter pelo menos 6 caracteres.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const supabase = createClient();

      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        toast({
          title: "Erro ao redefinir senha",
          description: error.message,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      toast({
        title: "Senha redefinida com sucesso",
        description: "Sua senha foi atualizada. Você pode fazer login agora.",
      });

      // Aguardar um pouco antes de redirecionar
      setTimeout(() => {
        router.push("/login");
        router.refresh();
      }, 1500);
    } catch {
      toast({
        title: "Erro inesperado",
        description: "Ocorreu um erro ao redefinir a senha. Tente novamente.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  if (isValidToken === null) {
    return (
      <div className="bg-background flex flex-1 items-center justify-center p-8">
        <div className="text-muted-foreground">Verificando link...</div>
      </div>
    );
  }

  if (isValidToken === false) {
    return (
      <div className="bg-background flex flex-1 items-center justify-center p-8">
        <div className="flex w-full max-w-md flex-col gap-8">
          <div className="flex flex-col gap-2 text-center">
            <h2 className="text-2xl font-bold tracking-tight">
              Link inválido ou expirado
            </h2>
            <p className="text-muted-foreground">
              O link de redefinição de senha é inválido ou já expirou. Por
              favor, solicite um novo link.
            </p>
          </div>

          <Button asChild className="h-11 w-full">
            <a href="/forgot-password">Solicitar novo link</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background flex flex-1 items-center justify-center p-8">
      <div className="flex w-full max-w-md flex-col gap-8">
        <div className="flex flex-col gap-2 text-center lg:text-left">
          <h2 className="text-2xl font-bold tracking-tight">Redefinir senha</h2>
          <p className="text-muted-foreground">Digite sua nova senha abaixo</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Nova senha</Label>
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
                required
                minLength={6}
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

          <div className="flex flex-col gap-2">
            <Label htmlFor="confirmPassword">Confirmar nova senha</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setConfirmPassword(e.target.value)
                }
                className="h-11 pr-10"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {confirmPassword &&
              password === confirmPassword &&
              password.length >= 6 && (
                <div className="text-primary flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4" />
                  Senhas coincidem
                </div>
              )}
          </div>

          <Button type="submit" className="h-11 w-full" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="border-primary-foreground/30 border-t-primary-foreground h-4 w-4 animate-spin rounded-full border-2" />
                Redefinindo...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                Redefinir senha
                <ArrowRight className="h-4 w-4" />
              </div>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
