# MenuApp – UX Flow & Screen Design

## Overview
MenuApp enables users to upload or capture a restaurant menu image, extracts dish names using Gemini AI, and displays each dish with a slider of food images. This document details the user experience flow, screen designs, and key behaviors.

---

## 1. Upload Screen

### Purpose
Allow users to upload a menu image or capture one using their device camera.

### UI Components
- App logo and title
- Instructions (e.g., "Upload or capture a menu image to get started")
- Image upload button (accepts jpg, jpeg, png)
- Camera capture button (if supported)
- Preview of selected/captured image
- "Find Dishes" button (primary action)
- Error message area

### User Actions
- Select an image file from device
- Capture a new image using camera
- Remove/replace selected image
- Click "Find Dishes" to proceed

### System Behavior
- Validates file type and size
- Shows image preview after selection/capture
- Enables "Find Dishes" only when a valid image is present
- On click, transitions to Loading/Processing Screen

### Edge Cases
- Invalid file type/size: Show error message
- No image selected: "Find Dishes" disabled
- Camera access denied: Show fallback to upload

---

## 2. Loading / Processing Screen

### Purpose
Indicate that the app is extracting dish names and fetching images.

### UI Components
- Animated loading indicator (spinner or progress bar)
- Message (e.g., "Finding dishes... Please wait")
- Optional: fun food-related animation or tips
- Cancel/Back button (optional)

### User Actions
- Wait for processing to complete
- (Optional) Cancel and return to Upload Screen

### System Behavior
 - Calls Gemini AI to extract dish names from image
 - Calls backend proxy to fetch 3–4 images per dish from SerpApi (Google Images engine)
- On success, transitions to Results Screen
- On failure, shows error and option to retry or return

### Edge Cases
- API failure: Show error, allow retry or back
- No dishes found: Show message, allow retry or back
- Slow network: Show progress or tips

---

## 3. Results Screen (Dish List)

### Purpose
Display extracted dish names with image sliders and enable dish search/filtering.

### UI Components
- Search bar (filters dishes in real time)
- List of dishes:
	- Dish name
	- Image slider (3–4 images per dish)
		- Left/right arrows or swipe for navigation
		- Image count indicator (e.g., 1/4)
- Message area for errors or empty results
- Back/Restart button

### User Actions
- Type in search bar to filter dishes
- Scroll through dish list
- Use arrows/swipe to browse images for each dish
- Click Back/Restart to upload a new menu

### System Behavior
- Filters dish list as user types (real-time)
- Handles image slider navigation per dish
- Shows fallback image if no images found for a dish
- Handles empty search results gracefully

### Edge Cases
- No images found for a dish: Show placeholder image
- All dishes filtered out: Show "No results found"
- API image fetch failure: Show error or fallback

---

## Navigation Flow
1. **Upload Screen** → (on valid image + Find Dishes) → **Loading / Processing Screen**
2. **Loading / Processing Screen** → (on success) → **Results Screen**
3. **Loading / Processing Screen** → (on error/cancel) → **Upload Screen**
4. **Results Screen** → (Back/Restart) → **Upload Screen**

---

## Search Behavior
- The search bar on the Results Screen filters the visible dish list in real time as the user types.
- Filtering is case-insensitive and matches any part of the dish name.
- If no dishes match, display a friendly "No results found" message.

---

## Image Slider Behavior
- Each dish has a horizontal image slider with 3–4 images.
- Users can navigate using left/right arrows or swipe (on mobile).
- The slider loops or disables arrows at ends (design choice).
- Show image count (e.g., 2/4) for context.
- If no images are available, show a placeholder or "No image found" message.
