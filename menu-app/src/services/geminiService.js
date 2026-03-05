
// DEBUG: Set to true to log Gemini API responses and errors
const DEBUG_GEMINI = true;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

/**
 * Extracts dish names from a restaurant menu image using Gemini Vision API.
 * @param {File} imageFile - The image file to process.
 * @returns {Promise<string[]>} - Array of dish names.
 * @throws {Error} - On API or network failure.
 */
export async function extractDishesFromImage(imageFile) {
	const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
	if (!apiKey) throw new Error("Gemini API key not found");

	// Read image as base64
	const imageBase64 = await new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => {
			// Remove the data URL prefix
			const base64 = reader.result.split(",")[1];
			resolve(base64);
		};
		reader.onerror = reject;
		reader.readAsDataURL(imageFile);
	});

	const prompt = `Extract only the dish names from this restaurant menu image. \nReturn the result strictly as a JSON array of strings.`;

	const body = {
		contents: [
			{
				parts: [
					{ text: prompt },
					{
						inlineData: {
							mimeType: imageFile.type,
							data: imageBase64,
						},
					},
				],
			},
		],
	};

	let response, data, text;
	try {
		response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		});
		if (!response.ok) {
			if (DEBUG_GEMINI) {
				console.error("Gemini API error:", response.status, await response.text());
			}
			throw new Error(`Gemini API error: ${response.status}`);
		}
		data = await response.json();
		if (DEBUG_GEMINI) {
			console.log("Gemini API raw response:", data);
		}
		text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
		if (!text) {
			if (DEBUG_GEMINI) {
				console.error("No response text from Gemini:", data);
			}
			throw new Error("No response from Gemini");
		}
		// Try to parse JSON array from the response
		try {
			// Some models may wrap JSON in code blocks, so strip them if present
			const jsonMatch = text.match(/\[.*\]/s);
			const jsonArray = jsonMatch ? jsonMatch[0] : text;
			const dishes = JSON.parse(jsonArray);
			if (!Array.isArray(dishes)) throw new Error();
			if (DEBUG_GEMINI) {
				console.log("Gemini parsed dishes:", dishes);
			}
			return dishes;
		} catch (parseErr) {
			if (DEBUG_GEMINI) {
				console.error("Failed to parse dish names from Gemini response:", text, parseErr);
			}
			throw new Error("Failed to parse dish names from Gemini response");
		}
	} catch (err) {
		if (DEBUG_GEMINI) {
			console.error("Gemini extractDishesFromImage error:", err);
		}
		throw err;
	}
}
