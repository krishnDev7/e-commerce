'use client';

import { Navigation } from '@ecommerce/ui';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AppNavigation() {
  const [cartItemCount, setCartItemCount] = useState(3);
  const [wishlistItemCount, setWishlistItemCount] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const mockUser = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facepad&facepad=2&w=256&h=256&q=80',
  };

  const handleSearch = (query: string) => {
    console.log('Search:', query);
  };

  const handleCartClick = () => {
    router.push('/cart');
  };

  const handleWishlistClick = () => {
    console.log('Wishlist clicked');
  };

  const handleProfileClick = () => {
    console.log('Profile clicked');
  };

  const handleSignIn = () => {
    router.push('/login');
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
  };

  return (
    <Navigation
      cartItemCount={cartItemCount}
      wishlistItemCount={wishlistItemCount}
      isAuthenticated={isAuthenticated}
      user={isAuthenticated ? mockUser : undefined}
      onSearch={handleSearch}
      onCartClick={handleCartClick}
      onWishlistClick={handleWishlistClick}
      onProfileClick={handleProfileClick}
      onSignIn={handleSignIn}
      onSignOut={handleSignOut}
    />
  );
}