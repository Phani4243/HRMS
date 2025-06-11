// services/api.ts

const API_BASE_URL = 'http://localhost:8000';

interface User {
  id: number;
  email: string;
  username: string;
  is_active: boolean;
  role: string;
}

interface SignupData {
  email: string;
  username: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const authService = {
  signup: async (data: SignupData): Promise<User> => {
    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Signup failed');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },

  login: async (data: LoginData): Promise<User> => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Login failed');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },
};