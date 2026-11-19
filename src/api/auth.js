import {supabase} from "../lib/supabase.js";

export async function signUp({ name, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email: email.trim().toLowerCase(),
    password,
    options: {
      data: {
        name: name.trim(),
      },
    },
  });

  if (error) throw error;

  return data;
}

export async function signIn({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  });

  if (error) throw error;

  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) throw error;
}

export async function getSession() {
  const { data, error } = await supabase.auth.getSession();

  if (error) throw error;

  return data.session;
}

export async function updateCredentials({ email, password, name, }) {
  const updates = {};

  if (email) {
    updates.email = email.trim().toLowerCase();
  }

  if (password) {
    updates.password = password;
  }

  if (name) {
    updates.data = {
      name: name.trim(),
    };
  }

  if (Object.keys(updates).length === 0) {
    return null;
  }

  const { data, error } = await supabase.auth.updateUser(updates);


  if (error) throw error;

  return data;
}