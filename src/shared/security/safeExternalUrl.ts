export function toSafeExternalUrl(candidate: string): string | null {
  if (candidate !== candidate.trim()) {
    return null;
  }
  try {
    const url = new URL(candidate);
    const isHttps = url.protocol === 'https:';
    const hasCredentials = url.username !== '' || url.password !== '';
    return isHttps && !hasCredentials ? url.href : null;
  } catch {
    return null;
  }
}
