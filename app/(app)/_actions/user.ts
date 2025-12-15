"use server";

import { createClient } from "@/app/_lib/supabase/server";

export async function getUser() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) {
      console.error("Error fetching user:", authError);
      return null;
    }

    if (!user) {
      return null;
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (profileError) {
      console.error("Error fetching profile:", profileError);
      const userName =
        user.user_metadata?.full_name ||
        user.user_metadata?.name ||
        user.email?.split("@")[0] ||
        "Usuário";

      const userInitials = userName
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

      return {
        id: user.id,
        email: user.email,
        name: userName,
        initials: userInitials,
      };
    }

    const userName = profile.name || "Usuário";

    const userInitials = userName
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    return {
      id: user.id,
      email: user.email,
      name: userName,
      initials: userInitials,
    };
  } catch (error) {
    console.error("Error in getUser action:", error);
    return null;
  }
}
