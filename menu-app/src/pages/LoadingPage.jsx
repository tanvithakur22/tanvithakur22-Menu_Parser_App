import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { extractDishesFromImage } from "../services/geminiService";

export default function LoadingPage() {
	const location = useLocation();
	const navigate = useNavigate();
	const imageFile = location.state?.imageFile;

	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!imageFile) {
			setError("No image provided. Please upload a menu image.");
			setLoading(false);
			return;
		}
		let isMounted = true;
		extractDishesFromImage(imageFile)
			.then((dishes) => {
				if (!isMounted) return;
				if (!Array.isArray(dishes)) {
					setError("We couldn't understand the menu image. Please try again with a clearer photo.");
					setLoading(false);
					return;
				}
				if (dishes.length === 0) {
					setError("No dishes were detected in your menu image. Please try again with a different or clearer photo.");
					setLoading(false);
					return;
				}
				navigate("/results", { state: { dishNames: dishes, imageFile } });
			})
			.catch(() => {
				if (isMounted) {
					setError(
						"Sorry, something went wrong while extracting dishes. Please try again or use a different menu image."
					);
					setLoading(false);
				}
			});
		return () => {
			isMounted = false;
		};
	}, [imageFile, navigate]);

	const handleBack = () => {
		navigate("/", { replace: true });
	};

	return (
  <div className="loading-page">
    <div className="loading-content">

      {/* Show spinner + text ONLY when loading and no error */}
      {loading && !error && (
        <>
          <div className="spinner large-spinner" />
          <h2 className="loading-title">Analyzing your menu</h2>
          <p className="loading-subtitle">
            We’re reading the menu and identifying dishes.
            <br />
            This usually takes a few seconds.
          </p>
        </>
      )}

      {/* Error state */}
      {error && (
        <>
          <div className="error loading-error">{error}</div>

          <div className="action-row">
            <button type="button" className="button" onClick={handleBack}>
              Go Back
            </button>
            <button
              type="button"
              className="secondary-button"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </>
      )}

    </div>
  </div>
);



}
