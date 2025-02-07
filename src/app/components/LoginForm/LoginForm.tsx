"use client"; // Mark this as a Client Component

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from './LoginForm.module.css'; // Import the CSS module
import { useUserStore } from '../../localStorage/userStore'; // Import Zustand store

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Step 1: Send login request
      const response = await axios.post('/api/auth/login', { email, password });

      console.log(response.data)
      
      // Step 2: If login is successful, get the user profile
      if (response.data.user) {
        // Assuming `response.data.user.profilePicture` contains the profile picture URL
        const profilePicture = response.data.user.profile_picture_thumbnail;
        const displayName = response.data.user.display_name;
        const description = response.data.user.description;
        setUser({
          displayName: displayName,
          profilePicture: profilePicture,
          description: description
        }); // Store the profile picture in Zustand store

        // Redirect the user to the feed page
        router.push('/feed');
      } else {
        setError('Failed to fetch user profile.');
      }
    } catch (error) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label htmlFor="email" className="block text-black font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input} // Apply the input class
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-black font-medium mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input} // Apply the input class
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className={styles.button} // Apply the button class
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default LoginForm;
