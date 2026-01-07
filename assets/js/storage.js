// LocalStorage Wrapper
const PREFIX = 'travelblog_';

export const storage = {
    set: (key, value) => {
        try {
            localStorage.setItem(PREFIX + key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Storage set failed', e);
            return false;
        }
    },
    get: (key, defaultValue = null) => {
        try {
            const item = localStorage.getItem(PREFIX + key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error('Storage get failed', e);
            return defaultValue;
        }
    },
    remove: (key) => {
        try {
            localStorage.removeItem(PREFIX + key);
            return true;
        } catch (e) {
            console.error('Storage remove failed', e);
            return false;
        }
    }
};

// User Preferences Management
export const userPrefs = {
    getTheme: () => storage.get('theme', 'light'),
    setTheme: (theme) => storage.set('theme', theme),

    getReadingProgress: (slug) => storage.get(`progress_${slug}`, 0),
    setReadingProgress: (slug, progress) => storage.set(`progress_${slug}`, progress),

    getBookmarks: () => storage.get('bookmarks', []),
    addBookmark: (slug) => {
        const bookmarks = storage.get('bookmarks', []);
        if (!bookmarks.includes(slug)) {
            bookmarks.push(slug);
            storage.set('bookmarks', bookmarks);
        }
    },
    removeBookmark: (slug) => {
        const bookmarks = storage.get('bookmarks', []);
        const newBookmarks = bookmarks.filter(b => b !== slug);
        storage.set('bookmarks', newBookmarks);
    },

    getTypography: () => storage.get('typography', {}),
    setTypography: (key, value) => {
        const current = storage.get('typography', {});
        current[key] = value;
        storage.set('typography', current);
    },
    clearTypography: () => storage.remove('typography')
};
