// Variable interpolation engine for Bad News game
// Replaces {{variableName}} tokens in text with stored game variables

export function interpolate(text: string, variables: Record<string, string>): string {
  if (!text) return '';
  return text.replace(/\{\{([^}]+)\}\}/g, (_match, key) => {
    const k = key.trim();
    return variables[k] ?? k;
  });
}

// Strip HTML tags from content (some nodes have <p> tags, etc.)
export function stripHtml(text: string): string {
  if (!text) return '';
  return text.replace(/<[^>]*>/g, '').trim();
}
