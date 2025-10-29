import { createClient } from '@supabase/supabase-js';

/**
 * Supabase Client Configuration
 * 
 * This creates a connection to your Supabase backend.
 * Environment variables are loaded from .env.local file.
 */

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables!');
  console.error('Make sure .env.local file exists with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * User Management Functions
 */

// Get or create user by name (simple auth for now)
export async function getOrCreateUser(name) {
  try {
    // Check if user exists by name
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('name', name)
      .single();

    if (existingUser) {
      return { data: existingUser, error: null };
    }

    // Create new user if doesn't exist
    const { data: newUser, error: createError } = await supabase
      .from('users')
      .insert([{ name }])
      .select()
      .single();

    return { data: newUser, error: createError };
  } catch (error) {
    return { data: null, error };
  }
}

/**
 * Entry Management Functions
 */

// Fetch all entries for a user
export async function fetchEntries(userId) {
  const { data, error } = await supabase
    .from('entries')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  return { data, error };
}

// Create a new entry
export async function createEntry(userId, entryData) {
  const { data, error } = await supabase
    .from('entries')
    .insert([{
      user_id: userId,
      first_name: entryData.firstName,
      last_name: entryData.lastName,
      date: entryData.date,
      topics: entryData.topics,
      notes: entryData.notes,
      email: entryData.email || null,
      phone: entryData.phone || null,
      audio_url: entryData.audioUrl || null,
      transcript: entryData.transcript || null,
    }])
    .select()
    .single();

  return { data, error };
}

// Update an entry
export async function updateEntry(entryId, updates) {
  const { data, error } = await supabase
    .from('entries')
    .update({
      first_name: updates.firstName,
      last_name: updates.lastName,
      date: updates.date,
      topics: updates.topics,
      notes: updates.notes,
      email: updates.email || null,
      phone: updates.phone || null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', entryId)
    .select()
    .single();

  return { data, error };
}

// Delete an entry
export async function deleteEntryFromDB(entryId) {
  const { error } = await supabase
    .from('entries')
    .delete()
    .eq('id', entryId);

  return { error };
}

// Export all entries as JSON
export async function exportEntries(userId) {
  const { data, error } = await fetchEntries(userId);
  
  if (error) {
    console.error('Error exporting entries:', error);
    return;
  }

  const dataStr = JSON.stringify(data, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `backpocket-export-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

