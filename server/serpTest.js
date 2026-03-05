import fetch from "node-fetch";

const API_KEY = "YOUR_SERPAPI_KEY";

const url = `https://serpapi.com/search.json?engine=google_images&q=pasta+food+dish&num=4&api_key=540bf1fc375cc77ecf32a2a602a62f8784c42afb84553fe23bf49d752b669b75`;

const res = await fetch(url);
const data = await res.json();

console.log(JSON.stringify(data.image_results || data.images_results, null, 2));
