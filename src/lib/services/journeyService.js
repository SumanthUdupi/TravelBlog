import { supabase } from '../supabase';

export async function getPublishedEntries(filters = {}) {
  let query = supabase
    .from('journey_entries')
    .select(`
      *,
      profiles:author_id(username, avatar_url),
      sacred_sites:sacred_site_id(name, slug)
    `)
    .eq('published', true)
    .order('published_at', { ascending: false });

  if (filters.siteId) {
    query = query.eq('sacred_site_id', filters.siteId);
  }

  if (filters.tag) {
    query = query.contains('tags', [filters.tag]);
  }

  if (filters.search) {
    query = query.ilike('title', `%${filters.search}%`);
  }

  if (filters.limit) {
    query = query.limit(filters.limit);
  }

  const { data, error } = await query;
  return { data, error };
}

export async function getEntryBySlug(slug) {
  const { data, error } = await supabase
    .from('journey_entries')
    .select(`
      *,
      profiles:author_id(username, avatar_url),
      sacred_sites:sacred_site_id(name, slug)
    `)
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();

  return { data, error };
}

export async function getEntryById(id) {
  const { data, error } = await supabase
    .from('journey_entries')
    .select(`
      *,
      profiles:author_id(username, avatar_url),
      sacred_sites:sacred_site_id(name, slug)
    `)
    .eq('id', id)
    .maybeSingle();

  return { data, error };
}

export async function getUserEntries(userId) {
  const { data, error } = await supabase
    .from('journey_entries')
    .select(`
      *,
      sacred_sites:sacred_site_id(name, slug)
    `)
    .eq('author_id', userId)
    .order('created_at', { ascending: false });

  return { data, error };
}

export async function createEntry(userId, entryData) {
  const { data, error } = await supabase
    .from('journey_entries')
    .insert([{
      author_id: userId,
      ...entryData
    }])
    .select();

  return { data, error };
}

export async function updateEntry(entryId, userId, updates) {
  const { data, error } = await supabase
    .from('journey_entries')
    .update(updates)
    .eq('id', entryId)
    .eq('author_id', userId)
    .select();

  return { data, error };
}

export async function deleteEntry(entryId, userId) {
  const { error } = await supabase
    .from('journey_entries')
    .delete()
    .eq('id', entryId)
    .eq('author_id', userId);

  return { error };
}

export async function searchEntries(query) {
  const { data, error } = await supabase
    .from('journey_entries')
    .select(`
      id,
      title,
      slug,
      excerpt,
      featured_image_url,
      published_at,
      sacred_sites:sacred_site_id(name, slug)
    `)
    .eq('published', true)
    .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`);

  return { data, error };
}
