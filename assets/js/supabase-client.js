import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const Auth = (() => {
  const currentUser = () => supabase.auth.getUser();

  const signUp = async (email, password) => {
    return supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    });
  };

  const signIn = async (email, password) => {
    return supabase.auth.signInWithPassword({
      email,
      password
    });
  };

  const signOut = async () => {
    return supabase.auth.signOut();
  };

  const resetPassword = async (email) => {
    return supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`
    });
  };

  const onAuthStateChange = (callback) => {
    return supabase.auth.onAuthStateChange(callback);
  };

  const getSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  };

  return {
    signUp,
    signIn,
    signOut,
    resetPassword,
    onAuthStateChange,
    getSession,
    currentUser
  };
})();

export const UserProfile = (() => {
  const get = async (userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    return { data, error };
  };

  const create = async (userId, profileData) => {
    const { data, error } = await supabase
      .from('profiles')
      .insert([{
        id: userId,
        email: profileData.email,
        ...profileData
      }]);

    return { data, error };
  };

  const update = async (userId, updates) => {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId);

    return { data, error };
  };

  const setTheme = async (userId, darkModeEnabled) => {
    return update(userId, { dark_mode_enabled: darkModeEnabled });
  };

  return {
    get,
    create,
    update,
    setTheme
  };
})();

export const JourneyEntries = (() => {
  const getPublished = async (filters = {}) => {
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

    const { data, error } = await query;
    return { data, error };
  };

  const getById = async (id) => {
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
  };

  const getBySlug = async (slug) => {
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
  };

  const create = async (userId, entryData) => {
    const { data, error } = await supabase
      .from('journey_entries')
      .insert([{
        author_id: userId,
        ...entryData
      }]);

    return { data, error };
  };

  const update = async (entryId, userId, updates) => {
    const { data, error } = await supabase
      .from('journey_entries')
      .update(updates)
      .eq('id', entryId)
      .eq('author_id', userId);

    return { data, error };
  };

  return {
    getPublished,
    getById,
    getBySlug,
    create,
    update
  };
})();

export const SacredSites = (() => {
  const getAll = async () => {
    const { data, error } = await supabase
      .from('sacred_sites')
      .select('*')
      .order('name');

    return { data, error };
  };

  const getBySlug = async (slug) => {
    const { data, error } = await supabase
      .from('sacred_sites')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    return { data, error };
  };

  const getByCategory = async (category) => {
    const { data, error } = await supabase
      .from('sacred_sites')
      .select('*')
      .eq('category', category)
      .order('name');

    return { data, error };
  };

  return {
    getAll,
    getBySlug,
    getByCategory
  };
})();

export const UserBookmarks = (() => {
  const get = async (userId) => {
    const { data, error } = await supabase
      .from('user_bookmarks')
      .select(`
        *,
        journey_entries:entry_id(title, slug),
        sacred_sites:site_id(name, slug)
      `)
      .eq('user_id', userId);

    return { data, error };
  };

  const add = async (userId, itemId, itemType = 'entry') => {
    const payload = {
      user_id: userId,
      notes: ''
    };

    if (itemType === 'entry') {
      payload.entry_id = itemId;
    } else {
      payload.site_id = itemId;
    }

    const { data, error } = await supabase
      .from('user_bookmarks')
      .insert([payload]);

    return { data, error };
  };

  const remove = async (bookmarkId) => {
    const { error } = await supabase
      .from('user_bookmarks')
      .delete()
      .eq('id', bookmarkId);

    return { error };
  };

  return {
    get,
    add,
    remove
  };
})();

export const UserProgress = (() => {
  const get = async (userId, entryId) => {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('entry_id', entryId)
      .maybeSingle();

    return { data, error };
  };

  const update = async (userId, entryId, updates) => {
    const { data, error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: userId,
        entry_id: entryId,
        ...updates,
        updated_at: new Date().toISOString()
      });

    return { data, error };
  };

  return {
    get,
    update
  };
})();

export const UserAnnotations = (() => {
  const get = async (userId) => {
    const { data, error } = await supabase
      .from('user_annotations')
      .select('*')
      .eq('user_id', userId);

    return { data, error };
  };

  const add = async (userId, itemId, itemType, content, highlightColor = 'yellow') => {
    const payload = {
      user_id: userId,
      content,
      highlight_color: highlightColor
    };

    if (itemType === 'entry') {
      payload.entry_id = itemId;
    } else {
      payload.site_id = itemId;
    }

    const { data, error } = await supabase
      .from('user_annotations')
      .insert([payload]);

    return { data, error };
  };

  const remove = async (annotationId) => {
    const { error } = await supabase
      .from('user_annotations')
      .delete()
      .eq('id', annotationId);

    return { error };
  };

  return {
    get,
    add,
    remove
  };
})();
