import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_DATABASE_URL;
const supabaseKey = process.env.REACT_APP_DATABASE_ANOK;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
