/**
 * Fetches food images for a dish using SerpApi Google Images engine.
 * @param {string} dishName - The dish name to search for.
 * @param {number} limit - Number of images to fetch (default 4).
 * @returns {Promise<string[]>} - Array of image URLs.
 */
export async function fetchDishImages(dishName, limit = 4) {
	const query = encodeURIComponent(`${dishName}`);
	const url = `https://menu-parser-app.onrender.com/api/images?q=${query}&limit=${limit}`;
	try {
		const res = await fetch(url);
		if (!res.ok) {
			if (typeof window !== 'undefined') {
				console.error("Proxy error:", res.status, await res.text());
			}
			return [];
		}
		const images = await res.json();
		if (typeof window !== 'undefined') {
			console.log("Proxy response for", dishName, images);
		}
		if (!Array.isArray(images) || images.length === 0) {
			if (typeof window !== 'undefined') {
				console.warn("No images found in proxy response for", dishName, images);
			}
			return [];
		}
		return images;
	} catch (err) {
		if (typeof window !== 'undefined') {
			console.error("Proxy fetch error for", dishName, err);
		}
		return [];
	}
}
