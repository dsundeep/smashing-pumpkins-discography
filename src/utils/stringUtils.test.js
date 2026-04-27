import { describe, expect, it } from 'vitest';
import { compareText, matchesNormalizedQuery, normalizeText } from './stringUtils';

describe('stringUtils', () => {
  it('normalizes text values safely', () => {
    expect(normalizeText('  HeLLo  ')).toBe('hello');
    expect(normalizeText(null)).toBe('');
  });

  it('compares text in ascending and descending order', () => {
    expect(compareText('A', 'B', 'asc')).toBeLessThan(0);
    expect(compareText('A', 'B', 'desc')).toBeGreaterThan(0);
  });

  it('matches normalized query', () => {
    expect(matchesNormalizedQuery('Smashing Pumpkins', 'pump')).toBe(true);
    expect(matchesNormalizedQuery('Smashing Pumpkins', 'zappa')).toBe(false);
    expect(matchesNormalizedQuery('Anything', '')).toBe(true);
  });
});
