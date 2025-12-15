"use client";

import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";
import { ArrowRight, FolderSync, Lock, Mail, Webhook, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

interface Automation {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  status: "active" | "maintenance";
  href?: string;
}

const automations: Automation[] = [
  {
    id: "duplicate-drive",
    title: "Duplicar Estrutura de Pasta (Drive)",
    description:
      "Copia uma pasta modelo no Google Drive mantendo toda a estrutura interna para novos projetos",
    icon: FolderSync,
    status: "active",
    href: "/automations/duplicate-drive",
  },
  {
    id: "webhook-notify",
    title: "Webhook Notificador",
    description: "Dispara notificações via webhook para integrações externas",
    icon: Webhook,
    status: "maintenance",
  },
  {
    id: "email-sequence",
    title: "Sequência de E-mails",
    description: "Automatiza envio de sequências de e-mail para leads",
    icon: Mail,
    status: "maintenance",
  },
];

export default function Automations() {
  const router = useRouter();

  return (
    <div className="animate-fade-in flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
              <Zap className="text-primary h-5 w-5" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Automations</h1>
          </div>
          <p className="text-muted-foreground mt-2">
            Dispare fluxos no n8n sem depender do time técnico. Padronização
            total com um clique.
          </p>
        </div>
      </div>

      {/* Automations Grid */}
      <div className="flex flex-wrap gap-4">
        {automations.map((automation) => {
          const Icon = automation.icon;
          const isActive = automation.status === "active";

          if (isActive) {
            return (
              <Card
                key={automation.id}
                onClick={() => router.push(automation.href!)}
                className="group max-w-[400px] min-w-[280px] flex-1 cursor-pointer"
              >
                <CardHeader>
                  <div className="flex w-full items-start justify-between">
                    <div className="bg-primary/10 group-hover:bg-primary/15 flex h-11 w-11 items-center justify-center rounded-lg transition-colors">
                      <Icon className="text-primary h-5 w-5" />
                    </div>
                    <Badge variant="active">Ativo</Badge>
                  </div>
                  <CardTitle className="mt-4">{automation.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {automation.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="ghost"
                    className="group-hover:bg-accent w-full justify-between"
                  >
                    Configurar
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            );
          }

          return (
            <Tooltip key={automation.id} delayDuration={0}>
              <TooltipTrigger asChild>
                <Card className="max-w-[400px] min-w-[280px] flex-1 cursor-not-allowed opacity-50">
                  <CardHeader>
                    <div className="flex w-full items-start justify-between">
                      <div className="bg-muted flex h-11 w-11 items-center justify-center rounded-lg">
                        <Icon className="text-muted-foreground h-5 w-5" />
                      </div>
                      <Badge variant="maintenance">
                        <Lock className="mr-1 h-3 w-3" />
                        Em manutenção
                      </Badge>
                    </div>
                    <CardTitle className="text-muted-foreground mt-4">
                      {automation.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {automation.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="secondary" className="w-full" disabled>
                      Em breve
                    </Button>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <p>Esta automação está em desenvolvimento</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
}
