import { supabase } from '../supabase';

// Profile Management
export async function getUserProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();

  return { data, error };
}

export async function createUserProfile(userId, profileData) {
  const { data, error } = await supabase
    .from('profiles')
    .insert([{
      id: userId,
      ...profileData
    }])
    .select();

  return { data, error };
}

export async function updateUserProfile(userId, updates) {
  const { data, error } = await supabase
    .from('profiles')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId)
    .select();

  return { data, error };
}

// Bookmarks
export async function getUserBookmarks(userId) {
  const { data, error } = await supabase
    .from('user_bookmarks')
    .select(`
      id,
      notes,
      created_at,
      journey_entries:entry_id(
        id,
        title,
        slug,
        excerpt,
        featured_image_url
      ),
      sacred_sites:site_id(
        id,
        name,
        slug,
        description
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  return { data, error };
}

export async function addBookmark(userId, itemId, itemType = 'entry', notes = '') {
  const payload = {
    user_id: userId,
    notes
  };

  if (itemType === 'entry') {
    payload.entry_id = itemId;
  } else {
    payload.site_id = itemId;
  }

  const { data, error } = await supabase
    .from('user_bookmarks')
    .insert([payload])
    .select();

  return { data, error };
}

export async function removeBookmark(bookmarkId) {
  const { error } = await supabase
    .from('user_bookmarks')
    .delete()
    .eq('id', bookmarkId);

  return { error };
}

export async function isBookmarked(userId, itemId, itemType = 'entry') {
  const column = itemType === 'entry' ? 'entry_id' : 'site_id';
  const { data, error } = await supabase
    .from('user_bookmarks')
    .select('id')
    .eq('user_id', userId)
    .eq(column, itemId)
    .maybeSingle();

  return { isBookmarked: !!data, data, error };
}

// Progress Tracking
export async function getUserProgress(userId, entryId) {
  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('entry_id', entryId)
    .maybeSingle();

  return { data, error };
}

export async function updateUserProgress(userId, entryId, updates) {
  const { data, error } = await supabase
    .from('user_progress')
    .upsert({
      user_id: userId,
      entry_id: entryId,
      ...updates,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'user_id,entry_id'
    })
    .select();

  return { data, error };
}

export async function getUserJourneyProgress(userId) {
  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false });

  return { data, error };
}

// Annotations
export async function getUserAnnotations(userId) {
  const { data, error } = await supabase
    .from('user_annotations')
    .select(`
      *,
      journey_entries:entry_id(title, slug),
      sacred_sites:site_id(name, slug)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  return { data, error };
}

export async function addAnnotation(userId, itemId, itemType, content, highlightColor = 'yellow') {
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
    .insert([payload])
    .select();

  return { data, error };
}

export async function removeAnnotation(annotationId) {
  const { error } = await supabase
    .from('user_annotations')
    .delete()
    .eq('id', annotationId);

  return { error };
}
