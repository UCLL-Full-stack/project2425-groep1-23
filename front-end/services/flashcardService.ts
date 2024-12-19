import { Flashcard, FlashcardInput } from '../types';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

export async function getFlashcards(): Promise<Flashcard[]> {
  const token = Cookies.get('token');
  const response = await fetch(`${API_BASE_URL}/flashcards`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Failed to fetch flashcards:', response.status, errorText);
    throw new Error('Failed to fetch flashcards');
  }
  return response.json();
}

export async function getFlashcardById(id: number): Promise<Flashcard> {
  const token = Cookies.get('token');
  const response = await fetch(`${API_BASE_URL}/flashcards/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch flashcard');
  }
  return response.json();
}

export async function createFlashcard(data: FlashcardInput): Promise<Flashcard> {
  const token = Cookies.get('token');
  const response = await fetch(`${API_BASE_URL}/flashcards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to create flashcard');
  }
  return response.json();
}