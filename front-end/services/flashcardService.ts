import { Flashcard, FlashcardInput } from '../types';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

export async function getFlashcards(token: string): Promise<Flashcard[]> {
  const response = await fetch(`${API_BASE_URL}/flashcards`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch flashcards');
  }
  return response.json();
}

export async function getFlashcardById(id: number, token: string): Promise<Flashcard> {
  const response = await fetch(`${API_BASE_URL}/flashcards/${id}`, {
    headers: {
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

export async function updateFlashcard(id: number, data: FlashcardInput): Promise<Flashcard> {
  const token = Cookies.get('token');
  const response = await fetch(`${API_BASE_URL}/flashcards/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update flashcard');
  }
  return response.json();
}

export async function deleteFlashcard(id: number): Promise<void> {
  const token = Cookies.get('token');
  const response = await fetch(`${API_BASE_URL}/flashcards/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to delete flashcard');
  }
}