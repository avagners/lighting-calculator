import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Очищать DOM после каждого теста
afterEach(() => {
  cleanup();
});

// Моки для localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

(window as unknown as { localStorage: Storage }).localStorage = localStorageMock as unknown as Storage;

// Моки для window.location
Object.defineProperty(window, 'location', {
  value: {
    origin: 'http://localhost:5173',
    pathname: '/',
    search: '',
    href: 'http://localhost:5173/',
  },
  writable: true,
});

// Моки для navigator.clipboard
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: vi.fn(),
    readText: vi.fn(),
  },
  writable: true,
});

// Моки для requestAnimationFrame
(window as unknown as { requestAnimationFrame: typeof requestAnimationFrame }).requestAnimationFrame = (callback: FrameRequestCallback) => {
  return setTimeout(callback, 0);
};

(window as unknown as { cancelAnimationFrame: typeof cancelAnimationFrame }).cancelAnimationFrame = (id: number) => {
  clearTimeout(id);
};
