import { AppLayout } from "@/app/_components/Layout/AppLayout"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AppLayout>{children}</AppLayout>
}

