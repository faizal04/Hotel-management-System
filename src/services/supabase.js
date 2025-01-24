import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://gdnxdajkbiogrrpypgwp.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdkbnhkYWprYmlvZ3JycHlwZ3dwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5NzIwOTksImV4cCI6MjA1MjU0ODA5OX0.hFqjh5NZyXeM13NxkfSxAEKvzHn8AzODW_RZXQZJ9ig";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
