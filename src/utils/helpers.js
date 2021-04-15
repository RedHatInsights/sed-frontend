export const pluralize = (count, str, fallback) =>
  count > 1 ? fallback || str + 's' : str;
