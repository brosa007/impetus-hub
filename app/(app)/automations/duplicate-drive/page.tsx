"use client"

import { FolderTreePreview } from "@/app/_components/automations/duplicate-drive/FolderTreePreview"
import { Button } from "@/app/_components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card"
import { Checkbox } from "@/app/_components/ui/checkbox"
import { Input } from "@/app/_components/ui/input"
import { Label } from "@/app/_components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/_components/ui/select"
import { Switch } from "@/app/_components/ui/switch"
import { toast } from "@/app/_hooks/use-toast"
import {
    Calendar,
    ChevronRight,
    Eye,
    FolderSync,
    Loader2,
    Shield,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const idiomas = ["PT", "EN", "DE", "ES", "FR"]
const paises = ["Alemanha", "Portugal", "Espanha", "França", "Itália", "Brasil"]

// Webhook URL - substitua pela URL real quando disponível
const WEBHOOK_URL = process.env.NEXT_PUBLIC_WEBHOOK_URL || ""

export default function DuplicateDriveForm() {
  const [idioma, setIdioma] = useState("")
  const [pais, setPais] = useState("")
  const [nicho, setNicho] = useState("")
  const [produto, setProduto] = useState("")
  const [includeMockup, setIncludeMockup] = useState(true)
  const [includeFunil, setIncludeFunil] = useState(true)
  const [templateUrl, setTemplateUrl] = useState("")
  const [destinoUrl, setDestinoUrl] = useState("")
  const [folderFormat, setFolderFormat] = useState("{{Idioma}} | {{País}}")
  const [keepPermissions, setKeepPermissions] = useState(false)
  const [addDateSuffix, setAddDateSuffix] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    if (!idioma || !pais || !nicho || !produto) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos de configuração.",
        variant: "destructive",
      })
      return
    }

    if (!templateUrl || !destinoUrl) {
      toast({
        title: "URLs obrigatórias",
        description: "Preencha as URLs do template e destino.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const payload = {
        idioma,
        pais,
        nicho,
        produto,
        includeMockup,
        includeFunil,
        templateUrl,
        destinoUrl,
        folderFormat,
        keepPermissions,
        addDateSuffix,
      }

      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error("Erro ao enviar dados para o webhook")
      }

      toast({
        title: "Automação disparada!",
        description: "Os dados foram enviados com sucesso.",
      })
    } catch (error) {
      toast({
        title: "Erro ao enviar",
        description: error instanceof Error ? error.message : "Ocorreu um erro ao enviar os dados.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePreview = () => {
    toast({
      title: "Prévia atualizada",
      description: "A estrutura ao lado reflete suas configurações.",
    })
  }

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/automations" className="hover:text-foreground transition-colors">
          Automations
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-medium">
          Duplicar Estrutura de Pasta
        </span>
      </nav>

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          <FolderSync className="h-6 w-6 text-primary" />
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

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Configuration Panel */}
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Configuração</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            {/* Basic Info */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col gap-2 flex-1">
                <Label htmlFor="idioma">Idioma</Label>
                <Select value={idioma} onValueChange={setIdioma}>
                  <SelectTrigger id="idioma">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border">
                    {idiomas.map((i) => (
                      <SelectItem key={i} value={i}>
                        {i}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <Label htmlFor="pais">País</Label>
                <Select value={pais} onValueChange={setPais}>
                  <SelectTrigger id="pais">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border">
                    {paises.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="nicho">Nicho</Label>
              <Input
                id="nicho"
                placeholder="Ex: Saúde, Finanças, Relacionamentos"
                value={nicho}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNicho(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="produto">Produto</Label>
              <Input
                id="produto"
                placeholder="Nome do produto"
                value={produto}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProduto(e.target.value)}
              />
            </div>

            {/* Toggles */}
            <div className="flex flex-col gap-4 pt-2">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                  <Label htmlFor="mockup">Incluir Mockup?</Label>
                  <p className="text-xs text-muted-foreground">
                    Pasta para mockups do produto
                  </p>
                </div>
                <Switch
                  id="mockup"
                  checked={includeMockup}
                  onCheckedChange={setIncludeMockup}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                  <Label htmlFor="funil">Incluir Funil?</Label>
                  <p className="text-xs text-muted-foreground">
                    Pastas: Copy, Bruto, Edição, Microlead, Upsell
                  </p>
                </div>
                <Switch
                  id="funil"
                  checked={includeFunil}
                  onCheckedChange={setIncludeFunil}
                />
              </div>
            </div>

            {/* Template Config */}
            <div className="flex flex-col gap-4 pt-4 border-t">
              <h4 className="text-sm font-medium">Configuração do Drive</h4>

              <div className="flex flex-col gap-2">
                <Label htmlFor="template">Drive Template Folder URL/ID</Label>
                <Input
                  id="template"
                  placeholder="https://drive.google.com/... ou ID"
                  value={templateUrl}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTemplateUrl(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="destino">Destino (pasta raiz) URL/ID</Label>
                <Input
                  id="destino"
                  placeholder="https://drive.google.com/... ou ID"
                  value={destinoUrl}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDestinoUrl(e.target.value)}
                />
              </div>
            </div>

            {/* Conventions */}
            <div className="flex flex-col gap-4 pt-4 border-t">
              <h4 className="text-sm font-medium">Convenções</h4>

              <div className="flex flex-col gap-2">
                <Label htmlFor="format">Formato do nome da pasta</Label>
                <Input
                  id="format"
                  value={folderFormat}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFolderFormat(e.target.value)}
                  className="font-mono text-sm"
                />
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="permissions"
                    checked={keepPermissions}
                    onCheckedChange={(checked: boolean) =>
                      setKeepPermissions(checked === true)
                    }
                  />
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="permissions" className="font-normal cursor-pointer">
                      Manter permissões do template
                    </Label>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Checkbox
                    id="date"
                    checked={addDateSuffix}
                    onCheckedChange={(checked: boolean) =>
                      setAddDateSuffix(checked === true)
                    }
                  />
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="date" className="font-normal cursor-pointer">
                      Adicionar sufixo com data (YYYY-MM-DD)
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={handlePreview}
                className="flex-1"
              >
                <Eye className="h-4 w-4 mr-2" />
                Testar Prévia
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Criando...
                  </>
                ) : (
                  "Criar Estrutura"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Preview Panel */}
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Prévia da Estrutura</CardTitle>
          </CardHeader>
          <CardContent>
            <FolderTreePreview
              idioma={idioma}
              pais={pais}
              nicho={nicho}
              produto={produto}
              includeFunil={includeFunil}
              includeMockup={includeMockup}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

