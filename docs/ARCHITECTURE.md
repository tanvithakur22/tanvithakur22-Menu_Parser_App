# MenuApp – Architecture Document

## 1. High-Level Architecture Overview

MenuApp is a React-based web application that enables users to upload or capture a restaurant menu image, extracts dish names using Gemini AI, and displays each dish with a slider of food images fetched from SerpApi (Google Images engine). The app is designed as a demo, with a preference for a frontend-only approach, but allows for an optional backend to enhance security and scalability.

---

## 2. Component Breakdown

### Frontend (React)
- Image upload/capture UI
- Image preview and validation
 - API integration logic (Gemini AI, SerpApi (Google Images engine))
- Dish list and image slider components
- Search/filter UI
- Error and loading states

### Optional Backend (Node.js/Express or Serverless)
- API key proxying and protection
- Request validation and rate limiting
- (Optional) Image pre-processing or caching

### External APIs
- **Gemini AI API**: Extracts dish names from menu images
 - **SerpApi (Google Images engine)**: Fetches 3–4 food images per dish name

---

## 3. Data Flow

1. User uploads or captures a menu image in the React frontend.
5. For each dish, the frontend calls SerpApi (Google Images engine) (directly) to fetch 3–4 food images.
6. The frontend displays the dish list with image sliders and search/filter functionality.
## 4. API Integration Flow
### Gemini AI
- Input: Menu image (jpg/png/jpeg)
- Output: JSON array of dish names
- Integration: REST API call (with API key)
- Input: Dish name (string)
---

## 5. Frontend-only vs Backend-assisted Approach
- Lower hosting/maintenance cost
- API keys exposed in client (risk of abuse)
- Harder to enforce rate limits or quotas
- API keys are protected server-side
- Easier to add caching or pre/post-processing

**Cons:**
- More complex architecture
- Requires backend hosting and maintenance
- Slightly higher latency

---

## 6. Error Handling Strategy

- Validate image type/size before upload
- Show user-friendly errors for invalid images
- Handle API failures (Gemini/Google): show retry or fallback UI
- Gracefully handle empty or malformed API responses
- Fallback images for dishes with no results

---

## 7. Performance Considerations

- Minimize image size before upload (client-side compression)
- Parallelize Google Custom Search requests for multiple dishes
- Use loading indicators and progressive rendering
- Cache API results where possible (in-memory or via backend)

---

## 8. Scalability Path (Demo → Production)

- Start with frontend-only for demo and rapid iteration
- Add backend proxy for API key protection and rate limiting as usage grows
- Implement caching for frequent dish/image queries
- Modularize codebase for maintainability
- Prepare for multi-language and accessibility support

---

## 9. Security Considerations

- Never expose sensitive API keys in production frontend
- Use backend proxy for API calls in production
- Enforce rate limits to prevent abuse
- Validate and sanitize all user inputs
- Use HTTPS for all network communication
