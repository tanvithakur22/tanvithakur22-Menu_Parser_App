import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchDishImages } from "../services/serpApiService";
import DishCard from "../components/DishCard";
import SearchBar from "../components/SearchBar";

// In-memory cache for dish images (persists for session)
const dishImageCache = {};

export default function ResultsPage() {
	const location = useLocation();
	const navigate = useNavigate();
	const dishNames = location.state?.dishNames || [];

	const [search, setSearch] = useState("");
	const [dishImages, setDishImages] = useState({}); // { dishName: [urls] }
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let isMounted = true;
		async function fetchAllImages() {
			setLoading(true);
			const results = {};
			await Promise.all(
				dishNames.map(async (dish) => {
					if (dishImageCache[dish]) {
						results[dish] = dishImageCache[dish];
						return;
					}
					try {
						const images = await fetchDishImages(dish, 4);
						dishImageCache[dish] = images;
						results[dish] = images;
					} catch {
						dishImageCache[dish] = [];
						results[dish] = [];
					}
				})
			);
			if (isMounted) {
				setDishImages(results);
				setLoading(false);
			}
		}
		if (dishNames.length > 0) {
			fetchAllImages();
		} else {
			setLoading(false);
		}
		return () => {
			isMounted = false;
		};
	}, [dishNames]);

	const filteredDishes = dishNames.filter((name) =>
		name.toLowerCase().includes(search.trim().toLowerCase())
	);

	if (loading) {
  return (
    <div className="loading-page">
      <div className="loading-content">
        <div className="spinner large-spinner" />
        <h2 className="loading-title">Fetching dish images</h2>
        <p className="loading-subtitle">
          We’re finding the best images for each dish.
          <br />
          This may take a few seconds.
        </p>
      </div>
    </div>
  );
}


	return (
  <div className="results-page">
    {/* Header */}
	
	
    <div className="results-header">
      <div className="results-title-group">
        <h1 className="page-title">Detected Dishes</h1>
        <p className="page-subtitle">
          Browse dishes extracted from the menu
        </p>
      </div>
	   
      <button
        className="gradient-button"
        onClick={() => navigate("/", { replace: true })}
      >
        Back to Upload
      </button>

    </div>

    {/* Search */}
    <div className="results-search">
  <input
    type="text"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="Search dishes you’re craving… 🍜"
    className="search-input-modern"
  />
</div>

    {/* Dishes */}
    {filteredDishes.length === 0 ? (
      <div className="empty-state">No dishes found.</div>
    ) : (
      <div className="dish-grid-large">
        {filteredDishes.map((dish) => (
          <DishCard
            key={dish}
            dishName={dish}
            images={dishImages[dish] || []}
          />
        ))}
      </div>
    )}
  </div>
);

}
