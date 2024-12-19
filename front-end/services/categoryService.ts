import { Category } from '../types';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

export async function getCategories(): Promise<Category[]> {
  const token = Cookies.get('token');
  const response = await fetch(`${API_BASE_URL}/categories`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
}