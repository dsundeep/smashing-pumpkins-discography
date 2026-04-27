export const normalizeText = (value) => {
  return String(value ?? '').trim().toLowerCase();
};

export const compareText = (a, b, direction = 'asc') => {
  const compare = String(a ?? '').localeCompare(String(b ?? ''));
  return direction === 'desc' ? -compare : compare;
};

export const matchesNormalizedQuery = (value, normalizedQuery) => {
  if (!normalizedQuery) {
    return true;
  }

  return normalizeText(value).includes(normalizedQuery);
};
