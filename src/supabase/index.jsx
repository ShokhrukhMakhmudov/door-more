import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  "https://zdloxxdwpinhgdykgdem.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbG94eGR3cGluaGdkeWtnZGVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAzNzEyOTMsImV4cCI6MjAxNTk0NzI5M30.10hS6Nh7_Yh9qeUz1aE73UxAa_gGDY2A_yTn7TYwlEg"
);
