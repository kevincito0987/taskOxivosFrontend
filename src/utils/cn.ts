import { clsx, type ClassValue } from 'clsx';
import { feelingsMerge, twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}