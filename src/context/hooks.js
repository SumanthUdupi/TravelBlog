import { useContext } from 'react';
import { AuthContext } from './AuthContextValue';
import { BlogContext } from './BlogContextValue';
import { IdentityContext } from './IdentityContextValue';

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const useBlog = () => {
    const context = useContext(BlogContext);
    if (!context) {
        throw new Error('useBlog must be used within a BlogProvider');
    }
    return context;
};

export const useIdentity = () => {
  const context = useContext(IdentityContext);
  if (!context) {
    throw new Error('useIdentity must be used within a IdentityProvider');
  }
  return context;
};
