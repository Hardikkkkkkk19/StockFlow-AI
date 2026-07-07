import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://ejdcshysulmupwjfuliz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqZGNzaHlzdWxtdXB3amZ1bGl6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTI0NzUzNSwiZXhwIjoyMDk2ODIzNTM1fQ.Q416A0F22bg2PgqviUSG8B6kw1_kl6g915teiBR4Rbo"
);