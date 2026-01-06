/*
  # Core Tables for Immersive Travel Log

  1. New Tables
    - `profiles` - User account information and preferences
    - `journey_entries` - Blog posts and travel narratives
    - `sacred_sites` - Information about temples and locations
    - `user_bookmarks` - Users' saved locations and entries
    - `user_progress` - Reading progress and journey tracking
    - `user_annotations` - User notes and reflections
    - `content_metadata` - SEO and content organization data

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Restrict data to user ownership where applicable

  3. Features Enabled
    - User authentication and personalization
    - Bookmarking and saved items
    - Reading progress tracking
    - User annotations and reflections
    - Content organization and search
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text UNIQUE NOT NULL,
  username text UNIQUE,
  avatar_url text,
  bio text,
  dark_mode_enabled boolean DEFAULT false,
  language text DEFAULT 'en',
  notifications_enabled boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can create own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create sacred sites table
CREATE TABLE IF NOT EXISTS sacred_sites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  location text,
  latitude decimal,
  longitude decimal,
  category text,
  significance_level text,
  images jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE sacred_sites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Sacred sites are publicly readable"
  ON sacred_sites FOR SELECT
  TO authenticated, anon
  USING (true);

-- Create journey entries table
CREATE TABLE IF NOT EXISTS journey_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  excerpt text,
  featured_image_url text,
  sacred_site_id uuid REFERENCES sacred_sites(id),
  tags jsonb DEFAULT '[]'::jsonb,
  reading_time_minutes integer,
  published boolean DEFAULT false,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE journey_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published entries are readable by all"
  ON journey_entries FOR SELECT
  TO authenticated, anon
  USING (published = true);

CREATE POLICY "Authors can read own entries"
  ON journey_entries FOR SELECT
  TO authenticated
  USING (author_id = auth.uid() OR published = true);

CREATE POLICY "Authors can create entries"
  ON journey_entries FOR INSERT
  TO authenticated
  WITH CHECK (author_id = auth.uid());

CREATE POLICY "Authors can update own entries"
  ON journey_entries FOR UPDATE
  TO authenticated
  USING (author_id = auth.uid())
  WITH CHECK (author_id = auth.uid());

-- Create user bookmarks table
CREATE TABLE IF NOT EXISTS user_bookmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  entry_id uuid REFERENCES journey_entries(id) ON DELETE CASCADE,
  site_id uuid REFERENCES sacred_sites(id) ON DELETE CASCADE,
  notes text,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT must_have_entry_or_site CHECK (entry_id IS NOT NULL OR site_id IS NOT NULL)
);

ALTER TABLE user_bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own bookmarks"
  ON user_bookmarks FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own bookmarks"
  ON user_bookmarks FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own bookmarks"
  ON user_bookmarks FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own bookmarks"
  ON user_bookmarks FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Create user progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  entry_id uuid REFERENCES journey_entries(id) ON DELETE CASCADE,
  scroll_percentage integer DEFAULT 0,
  time_spent_seconds integer DEFAULT 0,
  completed boolean DEFAULT false,
  last_read_position integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, entry_id)
);

ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own progress"
  ON user_progress FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own progress"
  ON user_progress FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Create user annotations table
CREATE TABLE IF NOT EXISTS user_annotations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  entry_id uuid REFERENCES journey_entries(id) ON DELETE CASCADE,
  site_id uuid REFERENCES sacred_sites(id) ON DELETE CASCADE,
  content text NOT NULL,
  highlight_color text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT must_have_entry_or_site CHECK (entry_id IS NOT NULL OR site_id IS NOT NULL)
);

ALTER TABLE user_annotations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own annotations"
  ON user_annotations FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own annotations"
  ON user_annotations FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own annotations"
  ON user_annotations FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own annotations"
  ON user_annotations FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Create content metadata table
CREATE TABLE IF NOT EXISTS content_metadata (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entry_id uuid UNIQUE REFERENCES journey_entries(id) ON DELETE CASCADE,
  site_id uuid UNIQUE REFERENCES sacred_sites(id) ON DELETE CASCADE,
  meta_title text,
  meta_description text,
  seo_keywords jsonb,
  canonical_url text,
  open_graph_image text,
  engagement_score integer DEFAULT 0,
  view_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT must_have_entry_or_site CHECK (entry_id IS NOT NULL OR site_id IS NOT NULL)
);

ALTER TABLE content_metadata ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Content metadata is publicly readable"
  ON content_metadata FOR SELECT
  TO authenticated, anon
  USING (true);

-- Create indexes for performance
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_journey_entries_slug ON journey_entries(slug);
CREATE INDEX idx_journey_entries_author ON journey_entries(author_id);
CREATE INDEX idx_journey_entries_published ON journey_entries(published);
CREATE INDEX idx_sacred_sites_slug ON sacred_sites(slug);
CREATE INDEX idx_user_bookmarks_user ON user_bookmarks(user_id);
CREATE INDEX idx_user_progress_user ON user_progress(user_id);
CREATE INDEX idx_user_annotations_user ON user_annotations(user_id);
