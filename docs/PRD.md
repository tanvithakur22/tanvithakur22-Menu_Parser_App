# Product Requirements Document (PRD): MenuApp

## 1. Problem Statement

Restaurant menus are often presented as images or photos, making it difficult for users to quickly discover dishes, especially when language barriers or unclear layouts are present. There is a need for a simple tool that can extract dish names from menu images and visually enrich them with relevant food images, improving user experience and engagement.

## 2. Goals & Success Criteria

**Goals:**
- Enable users to upload or capture a photo of a restaurant menu.
 - Automatically extract dish names from the menu image using Gemini AI.
 - Display a visually engaging slider of food images for each dish using SerpApi (Google Images engine).
- Allow users to search and filter dishes easily.

**Success Criteria:**
- Users can upload/capture a menu image and see extracted dish names within 10 seconds.
- For each dish, 3–4 relevant food images are displayed in a slider.
- The search bar filters dishes in real time.
- The app works on desktop and mobile browsers.
- No authentication or payment required.

## 3. User Personas

- **Tourist**: Visiting a foreign country, wants to understand menu items visually.
- **Food Enthusiast**: Loves exploring new dishes, wants to see what each dish looks like before ordering.
- **Restaurant Owner (Demo User)**: Wants to showcase how their menu could be digitized and visually enhanced.

## 4. User Stories

- As a user, I want to upload or take a photo of a menu so I can get dish names extracted automatically.
- As a user, I want to see a list of dish names detected from the menu image.
- As a user, I want to see multiple food images for each dish so I know what to expect.
- As a user, I want to search for a dish by name so I can quickly find what I want.
- As a user, I want a simple, fast, and mobile-friendly experience.

## 5. Functional Requirements

- Users can upload a menu image (jpg, jpeg, png) or capture via device camera.
- The app uses Gemini AI to extract dish names from the uploaded image.
- The extracted dish names are returned as a clean JSON array.
 - For each dish, the app uses SerpApi (Google Images engine) to fetch 3–4 relevant food images.
- Each dish is displayed with an image slider showing the fetched images.
- A search bar allows users to filter the list of dishes in real time.
- Responsive UI for both desktop and mobile browsers.
- No authentication or payment flows.

## 6. Non-Functional Requirements

- **Performance:** Dish extraction and image fetching should complete within 10 seconds for typical menu images.
- **Usability:** Intuitive, minimal UI with clear instructions.
- **Accessibility:** Basic accessibility (alt text for images, keyboard navigation).
- **Reliability:** Graceful error handling for failed uploads, extraction, or image fetches.
- **Security:** Uploaded images are processed client-side or securely if backend is used; API keys are never exposed to frontend or network traffic; no user data is stored.

## 7. Out of Scope

- User authentication, registration, or profiles.
- Payment processing or ordering functionality.
- Menu translation or nutritional information.
- Persistent storage of user data or images.
- Admin or restaurant management features.

## 8. Assumptions & Constraints

 - Gemini AI and SerpApi (Google Images engine) API keys are available and usage is within free/demo limits.
- The app is frontend-only unless backend is required for API key security.
- Menu images are of reasonable quality (clear, readable text).
- The app is a demo and not intended for production use.
- No support for PDF or non-image menu formats.
