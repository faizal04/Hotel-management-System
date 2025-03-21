import supabase from "./supabase";

export async function Login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new error(error);
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session) return null;
  const { data, error } = await supabase.auth.getUser();
  console.log(data);
  if (error) throw new Error(error.message);
  return data.user;
}

export async function Logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
