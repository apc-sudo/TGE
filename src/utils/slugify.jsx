export const slugify = (str) =>
  encodeURIComponent(
    str
      .toLowerCase()
      .replace(/[’'/]/g, '') 
      .replace(/\s+/g, '-')  
  );

export const unslugify = (slug) =>
  decodeURIComponent(slug.replace(/-/g, ' '));