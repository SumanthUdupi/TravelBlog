import { supabase } from '../supabase';

export async function getAllSites() {
  const { data, error } = await supabase
    .from('sacred_sites')
    .select('*')
    .order('name');

  return { data, error };
}

export async function getSiteBySlug(slug) {
  const { data, error } = await supabase
    .from('sacred_sites')
    .select(`
      *,
      journey_entries:journey_entries(
        id,
        title,
        slug,
        excerpt,
        featured_image_url,
        published_at
      )
    `)
    .eq('slug', slug)
    .maybeSingle();

  return { data, error };
}

export async function getSiteById(id) {
  const { data, error } = await supabase
    .from('sacred_sites')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  return { data, error };
}

export async function getSitesByCategory(category) {
  const { data, error } = await supabase
    .from('sacred_sites')
    .select('*')
    .eq('category', category)
    .order('name');

  return { data, error };
}

export async function getNearestSites(latitude, longitude, radiusKm = 50) {
  const { data, error } = await supabase
    .rpc('get_nearby_sites', {
      lat: latitude,
      lng: longitude,
      radius_km: radiusKm
    });

  return { data, error };
}

export async function getSiteMetadata(siteId) {
  const { data, error } = await supabase
    .from('content_metadata')
    .select('*')
    .eq('site_id', siteId)
    .maybeSingle();

  return { data, error };
}
