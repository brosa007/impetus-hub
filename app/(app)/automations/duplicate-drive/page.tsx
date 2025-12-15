"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { toast } from "@/app/_hooks/use-toast";
import { ChevronRight, FolderSync, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const WEBHOOK_URL =
  "https://n8n.grupoimpetus.com/webhook/duplicate-drive-folder";

export default function DuplicateDriveForm() {
  const router = useRouter();
  const [idioma, setIdioma] = useState("");
  const [paises, setPaises] = useState("");
  const [nicho, setNicho] = useState("");
  const [produto, setProduto] = useState("");
  const [nomeFunil, setNomeFunil] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!idioma || !paises || !nicho || !produto || !nomeFunil) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        idioma,
        paises,
        nicho,
        produto,
        nomeFunil,
      };

      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar dados para o webhook");
      }

      toast({
        title: "Automação disparada!",
        description: "Os dados foram enviados com sucesso.",
      });

      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (error) {
      toast({
        title: "Erro ao enviar",
        description:
          error instanceof Error
            ? error.message
            : "Ocorreu um erro ao enviar os dados.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fade-in flex flex-col gap-6">
      {/* Breadcrumb */}
      <nav className="text-muted-foreground flex items-center gap-2 text-sm">
        <Link
          href="/automations"
          className="hover:text-foreground transition-colors"
        >
          Automations
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-medium">
          Duplicar Estrutura de Pasta
        </span>
      </nav>

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-xl">
          <FolderSync className="text-primary h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Duplicar Estrutura de Pasta (Drive)
          </h1>
          <p className="text-muted-foreground">
            Crie a estrutura padronizada para um novo projeto
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Configuração</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="idioma">Idioma</Label>
                <Input
                  id="idioma"
                  placeholder="Ex: PT, EN, ES"
                  value={idioma}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setIdioma(e.target.value)
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="paises">Países</Label>
                <Input
                  id="paises"
                  placeholder="Ex: Brasil, Portugal, Espanha"
                  value={paises}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPaises(e.target.value)
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="nicho">Nicho</Label>
                <Input
                  id="nicho"
                  placeholder="Ex: Saúde, Finanças, Relacionamentos"
                  value={nicho}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNicho(e.target.value)
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="produto">Produto</Label>
                <Input
                  id="produto"
                  placeholder="Nome do produto"
                  value={produto}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setProduto(e.target.value)
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="nomeFunil">Nome Funil</Label>
                <Input
                  id="nomeFunil"
                  placeholder="Nome do funil"
                  value={nomeFunil}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNomeFunil(e.target.value)
                  }
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Criar Pasta do Drive"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
