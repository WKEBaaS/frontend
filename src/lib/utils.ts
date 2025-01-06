import { type ClassValue, clsx } from 'clsx';
import crypto from 'crypto';
import { twMerge } from 'tailwind-merge';
import { i18n } from './i18n';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function generateProjectReferenceID(length: number = 20) {
	const chars = 'abcdefghijklmnopqrstuvwxyz';
	const bytes = crypto.randomBytes(length);
	let result = '';

	for (let i = 0; i < bytes.length; i++) {
		result += chars[bytes[i] % chars.length];
	}

	return result;
}

export function getLanguagePathFromUrl(url: URL) {
  const lang = i18n.getLanguageFromUrl(url);
  return lang === 'en' ? '' : `/${lang}`;
}
