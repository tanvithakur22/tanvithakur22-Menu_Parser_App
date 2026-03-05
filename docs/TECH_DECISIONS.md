# MenuApp – Technical Decisions & Risks

## 1. Frontend Technology Choices

- **React Version:** React 18.x (latest LTS for hooks, concurrent features, and community support)
- **State Management:**
	- Local state via React hooks (useState, useReducer) for demo simplicity
	- Context API for global state (e.g., dish list, loading state)
	- No Redux or heavy state libraries unless scaling up
- **Component Structure:**
	- Modular, functional components (Upload, Loading, Results, DishSlider, SearchBar)
	- Container/presentational split for clarity
	- CSS-in-JS or CSS Modules for styling

## 2. API Integration Strategy

- **Gemini AI API:**
  - Called from frontend for demo; via backend proxy in production
  - Handles image upload, returns JSON array of dish names
- **SerpApi (Google Images engine):**
  - Called via backend proxy to handle CORS and API key security
  - Fetches 3–4 images per dish name
  - Parallel requests for performance

## 3. API Quota & Cost Management

- Monitor Gemini and SerpApi usage to avoid exceeding free/demo quotas
- Limit number of dishes processed per upload (e.g., max 20)
- Limit images fetched per dish (max 3–4)
- Implement request throttling and error handling for quota exceedance

## 4. Security Considerations (API keys)

- API keys stored in environment variables for demo
- Warn users not to expose keys in public repos
- For production, use backend proxy to keep keys secret
- Restrict API key usage to allowed domains where possible
- Backend proxy ensures SerpApi key is never exposed to the frontend or network traffic

## 5. Error & Edge Case Handling

- Validate image type and size before upload
- Show clear errors for invalid images, API failures, or empty results
- Fallback UI for no dishes or no images found
- Handle network errors and timeouts gracefully

## 6. Performance Optimization

- Client-side image compression before upload
- Parallelize API requests for multiple dishes
- Use React Suspense/lazy loading for components
- Minimize re-renders with memoization

## 7. Key Risks & Mitigation Strategies

- **API Key Exposure:** Use backend proxy for production, restrict domains, never expose SerpApi key to frontend
- **API Quota Limits:** Monitor usage, limit requests, inform users of limits
- **Unreliable Image Extraction:** Provide fallback UI, allow user corrections (future)
- **Slow Performance:** Optimize image size, parallelize requests, show progress indicators
- **Scaling Complexity:** Modular codebase, plan for backend migration if needed

## 8. Future Enhancements

- Add backend for API key security and advanced features
- User authentication and profiles
- Persistent storage of user uploads and results
- Multi-language support and menu translation
- Accessibility improvements
- Analytics and usage tracking
