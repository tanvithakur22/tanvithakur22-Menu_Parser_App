# React + Vite
# MenuApp

## Overview
MenuApp is a demo web application that lets users upload or capture a photo of a restaurant menu, automatically extracts dish names using Gemini AI, and displays each dish with a slider of real food images found via SerpApi (Google Images engine). The app helps users visually explore unfamiliar menus, making dining out easier and more engaging.

## Tech Stack
- React (Vite)
- Gemini AI (Google Generative AI Vision API)
- SerpApi (Google Images engine)

## App Flow
1. **Upload**: User uploads or captures a menu image (jpg/png/jpeg).
2. **Gemini AI**: The image is sent to Gemini AI, which extracts only the dish names.
3. **SerpApi**: For each dish, the app fetches 3–4 food images using SerpApi.
4. **Results**: Dishes and images are shown in a searchable, interactive UI.

## APIs Used
- **Gemini AI**: Extracts dish names from menu images.
- **SerpApi (Google Images engine)**: Fetches food images for each dish.

## Running Locally
1. Clone the repo and install dependencies:
	```sh
	git clone <repo-url>
	cd menu-app
	npm install
	```
2. Create a `.env` file in the root of `menu-app` with the following:
	```env
	VITE_GEMINI_API_KEY=your_gemini_api_key
	VITE_SERPAPI_KEY=your_serpapi_key
	```
3. Start the app:
	```sh
	npm run dev
	```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Environment Variables
- `VITE_GEMINI_API_KEY` — Gemini AI API key
- `VITE_SERPAPI_KEY` — SerpApi key

## Limitations
- Demo app: No authentication, no persistent storage
- API keys are exposed in frontend (not for production)
- Limited to image menus (no PDF or text menus)
- API quotas may limit usage

## Future Improvements
- Backend proxy for API key security
- User authentication and saved menu history
- Multi-language and accessibility support
- Improved error handling and analytics
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
