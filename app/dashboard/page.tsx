import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardClient } from "./dashboard-client"
import { getClients, getCommercials, getTags } from "@/lib/database"

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch all data server-side
  const [clients, commercials, tags] = await Promise.all([getClients(), getCommercials(), getTags()])

  return <DashboardClient initialClients={clients} initialCommercials={commercials} initialTags={tags} user={user} />
}
