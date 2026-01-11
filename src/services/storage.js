/**
 * StorageService
 * Handles persistence of blog data using localStorage.
 * Simulates an async API for future extensibility.
 */

import { initialPosts } from '../data/initialPosts';

const STORAGE_KEYS = {
  POSTS: 'travel_blog_posts',
  CATEGORIES: 'travel_blog_categories',
  SETTINGS: 'travel_blog_settings'
};

const DEFAULT_CATEGORIES = [
  { id: 'philosophy', name: 'Philosophy', slug: 'philosophy' },
  { id: 'mythology', name: 'Mythology', slug: 'mythology' },
  { id: 'architecture', name: 'Architecture', slug: 'architecture' },
  { id: 'history', name: 'History', slug: 'history' }
];

const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

class StorageService {
  constructor() {
    this.init();
  }

  init() {
    // Force seed to ensure new immersive content is visible
    console.log('Seeding immersive content...');
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(initialPosts));

    if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(DEFAULT_CATEGORIES));
    }
  }

  // --- Posts ---

  async getPosts() {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    try {
      const posts = JSON.parse(localStorage.getItem(STORAGE_KEYS.POSTS) || '[]');
      return posts;
    } catch (error) {
      console.error("Error reading posts from storage:", error);
      return [];
    }
  }

  async getPostBySlug(slug) {
    const posts = await this.getPosts();
    return posts.find(post => post.slug === slug) || null;
  }

  async getPostById(id) {
    const posts = await this.getPosts();
    return posts.find(post => post.id === id) || null;
  }

  async createPost(postData) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const posts = await this.getPosts();

    const newPost = {
      id: generateId(),
      ...postData,
      slug: postData.slug || generateSlug(postData.title),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: postData.status || 'draft', // 'draft' | 'published'
      views: 0
    };

    posts.unshift(newPost);
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    return newPost;
  }

  async updatePost(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const posts = await this.getPosts();
    const index = posts.findIndex(p => p.id === id);

    if (index === -1) throw new Error(`Post with id ${id} not found`);

    const updatedPost = {
      ...posts[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    // Regenerate slug if title changed and slug wasn't manually provided
    if (updates.title && !updates.slug) {
      updatedPost.slug = generateSlug(updates.title);
    }

    posts[index] = updatedPost;
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    return updatedPost;
  }

  async deletePost(id) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const posts = await this.getPosts();
    const newPosts = posts.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(newPosts));
    return true;
  }

  // --- Categories ---

  async getCategories() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CATEGORIES) || '[]');
  }
}

export const storageService = new StorageService();
