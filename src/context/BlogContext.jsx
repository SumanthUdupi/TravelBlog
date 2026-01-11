import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { storageService } from '../services/storage';

const BlogContext = createContext();

const initialState = {
    posts: [],
    categories: [],
    isLoading: false,
    error: null,
    currentPost: null
};

const blogReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload, isLoading: false };
        case 'SET_POSTS':
            return { ...state, posts: action.payload, isLoading: false };
        case 'SET_CATEGORIES':
            return { ...state, categories: action.payload };
        case 'ADD_POST':
            return { ...state, posts: [action.payload, ...state.posts], isLoading: false };
        case 'UPDATE_POST':
            return {
                ...state,
                posts: state.posts.map(post => post.id === action.payload.id ? action.payload : post),
                currentPost: state.currentPost?.id === action.payload.id ? action.payload : state.currentPost,
                isLoading: false
            };
        case 'DELETE_POST':
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.payload),
                isLoading: false
            };
        case 'SET_CURRENT_POST':
            return { ...state, currentPost: action.payload, isLoading: false };
        default:
            return state;
    }
};

export const BlogProvider = ({ children }) => {
    const [state, dispatch] = useReducer(blogReducer, initialState);

    // Initial Load
    useEffect(() => {
        const loadData = async () => {
            dispatch({ type: 'SET_LOADING', payload: true });
            try {
                const [posts, categories] = await Promise.all([
                    storageService.getPosts(),
                    storageService.getCategories()
                ]);
                dispatch({ type: 'SET_POSTS', payload: posts });
                dispatch({ type: 'SET_CATEGORIES', payload: categories });
            } catch (err) {
                dispatch({ type: 'SET_ERROR', payload: err.message });
            }
        };
        loadData();
    }, []);

    // Actions
    const createPost = async (postData) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const newPost = await storageService.createPost(postData);
            dispatch({ type: 'ADD_POST', payload: newPost });
            return newPost;
        } catch (err) {
            dispatch({ type: 'SET_ERROR', payload: err.message });
            throw err;
        }
    };

    const updatePost = async (id, updates) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const updatedPost = await storageService.updatePost(id, updates);
            dispatch({ type: 'UPDATE_POST', payload: updatedPost });
            return updatedPost;
        } catch (err) {
            dispatch({ type: 'SET_ERROR', payload: err.message });
            throw err;
        }
    };

    const deletePost = async (id) => {
        if (!window.confirm("Are you sure you want to delete this post? This cannot be undone.")) return;

        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            await storageService.deletePost(id);
            dispatch({ type: 'DELETE_POST', payload: id });
        } catch (err) {
            dispatch({ type: 'SET_ERROR', payload: err.message });
        }
    };

    const getPostBySlug = async (slug) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            // Check local state first
            const existing = state.posts.find(p => p.slug === slug);
            if (existing) {
                dispatch({ type: 'SET_CURRENT_POST', payload: existing });
                return existing;
            }
            // Fallback to service
            const post = await storageService.getPostBySlug(slug);
            dispatch({ type: 'SET_CURRENT_POST', payload: post });
            return post;
        } catch (err) {
            dispatch({ type: 'SET_ERROR', payload: err.message });
        }
    }

    return (
        <BlogContext.Provider value={{ ...state, createPost, updatePost, deletePost, getPostBySlug }}>
            {children}
        </BlogContext.Provider>
    );
};

export const useBlog = () => {
    const context = useContext(BlogContext);
    if (!context) {
        throw new Error('useBlog must be used within a BlogProvider');
    }
    return context;
};
