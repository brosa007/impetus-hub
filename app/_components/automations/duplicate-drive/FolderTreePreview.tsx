"use client"

import { cn } from "@/app/_lib/utils"
import { ChevronDown, ChevronRight, Folder, FolderOpen } from "lucide-react"
import { useState } from "react"

interface FolderNode {
  name: string
  children?: FolderNode[]
}

interface FolderTreePreviewProps {
  idioma: string
  pais: string
  nicho: string
  produto: string
  includeFunil: boolean
  includeMockup: boolean
}

function FolderItem({
  node,
  level = 0,
  defaultOpen = true,
}: {
  node: FolderNode
  level?: number
  defaultOpen?: boolean
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const hasChildren = node.children && node.children.length > 0

  return (
    <div className="select-none">
      <div
        className={cn(
          "hover:bg-accent/50 flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 transition-colors",
          level === 0 && "font-medium",
        )}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={() => hasChildren && setIsOpen(!isOpen)}
      >
        {hasChildren ? (
          <>
            {isOpen ? (
              <ChevronDown className="text-muted-foreground h-4 w-4 shrink-0" />
            ) : (
              <ChevronRight className="text-muted-foreground h-4 w-4 shrink-0" />
            )}
            {isOpen ? (
              <FolderOpen className="text-primary h-4 w-4 shrink-0" />
            ) : (
              <Folder className="text-primary h-4 w-4 shrink-0" />
            )}
          </>
        ) : (
          <>
            <span className="w-4" />
            <Folder className="text-muted-foreground h-4 w-4 shrink-0" />
          </>
        )}
        <span className="truncate text-sm">{node.name || "(vazio)"}</span>
      </div>
      {hasChildren && isOpen && (
        <div>
          {node.children!.map((child, index) => (
            <FolderItem
              key={`${child.name}-${index}`}
              node={child}
              level={level + 1}
              defaultOpen={level < 2}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function FolderTreePreview({
  idioma,
  pais,
  nicho,
  produto,
  includeFunil,
  includeMockup,
}: FolderTreePreviewProps) {
  const funilChildren: FolderNode[] = [
    { name: "Copy" },
    { name: "Bruto" },
    { name: "Edição" },
    { name: "Microlead" },
    { name: "Upsell" },
  ]

  const produtoChildren: FolderNode[] = []
  if (includeFunil) {
    produtoChildren.push({ name: "Funil", children: funilChildren })
  }
  if (includeMockup) {
    produtoChildren.push({ name: "Mockup" })
  }

  const tree: FolderNode = {
    name: `${idioma || "Idioma"} | ${pais || "País"}`,
    children: [
      {
        name: nicho || "Nicho",
        children: [
          {
            name: produto || "Produto",
            children: produtoChildren.length > 0 ? produtoChildren : undefined,
          },
        ],
      },
    ],
  }

  const pathParts = [
    `${idioma || "Idioma"} | ${pais || "País"}`,
    nicho || "Nicho",
    produto || "Produto",
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-muted/30 rounded-lg border p-4">
        <FolderItem node={tree} />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
          Path Final
        </p>
        <code className="bg-muted/50 block rounded-md px-3 py-2 font-mono text-sm break-all">
          /{pathParts.join("/")}
        </code>
      </div>
    </div>
  )
}

