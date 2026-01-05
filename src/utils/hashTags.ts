export const extractHashtags = (description?: string | null): string[] => {
  if (!description) return [];
  // Match words that start with # followed by alphanumeric characters
  const hashtagRegex = /#\w+/g;
  const matches = description.match(hashtagRegex);
  return matches ? [...new Set(matches)] : []; // Return unique hashtags
};

export const isDateHashtag = (tag: string): boolean => {
  // Check if it's an 8-digit hashtag (MMDDYYYY format)
  return /^#\d{8}$/.test(tag);
};

export const isYearHashtag = (tag: string): boolean => {
  // Check if it's a 4-digit hashtag (YYYY format)
  return /^#\d{4}$/.test(tag);
};

export const sortDateHashtags = (tags: string[]): string[] => {
  return tags.sort((a, b) => {
    const aDigits = a.replace('#', '');
    const bDigits = b.replace('#', '');

    // Parse MMDDYYYY format
    const aMonth = parseInt(aDigits.substring(0, 2), 10);
    const aDay = parseInt(aDigits.substring(2, 4), 10);
    const aYear = parseInt(aDigits.substring(4, 8), 10);

    const bMonth = parseInt(bDigits.substring(0, 2), 10);
    const bDay = parseInt(bDigits.substring(2, 4), 10);
    const bYear = parseInt(bDigits.substring(4, 8), 10);

    // Create date objects for comparison
    const aDate = new Date(aYear, aMonth - 1, aDay);
    const bDate = new Date(bYear, bMonth - 1, bDay);

    return aDate.getTime() - bDate.getTime();
  });
};

export const sortYearHashtags = (tags: string[]): string[] => {
  return tags.sort((a, b) => {
    const aYear = parseInt(a.replace('#', ''), 10);
    const bYear = parseInt(b.replace('#', ''), 10);
    return aYear - bYear;
  });
};
