const cache = new Map();

/**
 * Function to fetch data with caching
 * @param {string} key - Unique key for caching the response
 * @param {Function} fetchFunction - Function to fetch data if not present in cache
 * @returns {Promise<any>} - The fetched or cached data
 */
export const fetchWithCache = async (key, fetchFunction) => {
  if (cache.has(key)) {
    console.log(`Cache hit for key: ${key}`);
    return cache.get(key); // Return cached data
  }

  console.log(`Cache miss for key: ${key}. Fetching data...`);
  const data = await fetchFunction(); // Fetch data using provided function
  cache.set(key, data); // Cache the fetched data
  return data;
};

/**
 * Function to clear a specific cache entry
 * @param {string} key - Unique key to clear from the cache
 */
export const clearCache = (key) => {
  if (cache.has(key)) {
    cache.delete(key);
    console.log(`Cache cleared for key: ${key}`);
  }
};

/**
 * Function to clear the entire cache
 */
export const clearAllCache = () => {
  cache.clear();
  console.log("All cache cleared");
};
