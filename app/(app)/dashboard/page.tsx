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
import {
  Activity,
  ArrowRight,
  DollarSign,
  FileText,
  FolderKanban,
  Lock,
  Server,
  Sparkles,
  Video,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface HubModule {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  status: "active" | "maintenance";
  href?: string;
}

const modules: HubModule[] = [
  {
    id: "automations",
    title: "Automations",
    description: "Dispare fluxos no n8n sem depender do time técnico",
    icon: Zap,
    status: "active",
    href: "/automations",
  },
  {
    id: "ai-creators",
    title: "AI Creators",
    description: "Ferramentas de IA para criação de conteúdo",
    icon: Sparkles,
    status: "maintenance",
  },
  {
    id: "backend",
    title: "Backend",
    description: "Gerenciamento de APIs e integrações",
    icon: Server,
    status: "maintenance",
  },
  {
    id: "audiovisual",
    title: "Audio Visual",
    description: "Produção e edição de vídeos",
    icon: Video,
    status: "maintenance",
  },
  {
    id: "copy",
    title: "Copy",
    description: "Gestão de copies e scripts de vendas",
    icon: FileText,
    status: "maintenance",
  },
  {
    id: "financeiro",
    title: "Controladoria / Financeiro",
    description: "Relatórios e controle financeiro",
    icon: DollarSign,
    status: "maintenance",
  },
  {
    id: "projetos",
    title: "Projetos",
    description: "Acompanhamento de projetos e tarefas",
    icon: FolderKanban,
    status: "maintenance",
  },
];

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className="animate-fade-in flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Central de operações da Impetus. Um clique e foi.
        </p>
      </div>

      {/* Status Card */}
      <Card className="border-primary/20 from-primary/5 bg-gradient-to-r to-transparent">
        <CardContent className="flex items-center justify-between py-6">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-xl">
              <Activity className="text-primary h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold">Hub Operacional</h3>
              <p className="text-muted-foreground text-sm">
                Sistema online • 1 módulo ativo
              </p>
            </div>
          </div>
          <Badge variant="success" className="h-7 px-3">
            Operando
          </Badge>
        </CardContent>
      </Card>

      {/* Modules Grid */}
      <div className="flex flex-wrap gap-4">
        {modules.map((module) => {
          const Icon = module.icon;
          const isActive = module.status === "active";

          if (isActive) {
            return (
              <Card
                key={module.id}
                onClick={() => router.push(module.href!)}
                className="group max-w-[400px] min-w-[280px] flex-1 cursor-pointer"
              >
                <CardHeader>
                  <div className="flex w-full items-start justify-between">
                    <div className="bg-primary/10 group-hover:bg-primary/15 flex h-11 w-11 items-center justify-center rounded-lg transition-colors">
                      <Icon className="text-primary h-5 w-5" />
                    </div>
                    <Badge variant="active">Ativo</Badge>
                  </div>
                  <CardTitle className="mt-4">{module.title}</CardTitle>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="ghost"
                    className="group-hover:bg-accent w-full justify-between"
                  >
                    Acessar
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            );
          }

          return (
            <Tooltip key={module.id} delayDuration={0}>
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
                      {module.title}
                    </CardTitle>
                    <CardDescription>{module.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="secondary" className="w-full" disabled>
                      Em breve
                    </Button>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <p>Este módulo está em desenvolvimento</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
}
