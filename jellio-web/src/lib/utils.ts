import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBaseUrl(): string {
  var match = window.location.href.match(/.*?\/jellio/);
  if (!match) {
    throw new Error('URL must include /jellio');
  }
  return match[0];
}

export function getOrCreateDeviceId(): string {
  const key = 'jellio_device_id';
  let id = localStorage.getItem(key);
  if (!id) {
    // Simple, stable identifier for header metadata
    id = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(key, id);
  }
  return id;
}
