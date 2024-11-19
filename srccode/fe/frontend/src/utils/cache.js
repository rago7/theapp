const cache = {};

// Fetch data with caching
export const fetchWithCache = async (key, fetchFunction) => {
  if (cache[key]) {
    console.log(`Cache hit for ${key}`);
    return cache[key];
  }
  console.log(`Cache miss for ${key}`);
  const data = await fetchFunction();
  cache[key] = data;
  return data;
};

// Clear a specific cache
export const clearCache = (key) => {
  if (cache[key]) {
    delete cache[key];
    console.log(`Cache cleared for ${key}`);
  }
};

// Clear all caches
export const clearAllCache = () => {
  Object.keys(cache).forEach(clearCache);
  console.log('All caches cleared');
};
