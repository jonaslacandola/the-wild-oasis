import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://bvjrxjzuzflxtuwlegqm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2anJ4anp1emZseHR1d2xlZ3FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIxNTM3MDMsImV4cCI6MjAxNzcyOTcwM30.zMfXxXXaxDxG3aBKOHAGWjgMnscRVn_Od_v7g1RQjC8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
