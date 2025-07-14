# 🛒 React + Vite Product Dashboard

A modular, scalable, and performant **Product Dashboard** built with **React + Vite**. This dashboard includes product search, category filters, dynamic table rendering with drag-and-drop headers, cart functionality, and real-time statistics.

---

## ⚙️ Tech Stack

- **React** (Functional Components & Hooks)
- **Vite** (Fast build tool & dev server)
- **Custom Hooks** for logic abstraction
- **Tailwind CSS** (for styling)

---

## 📁 File Structure

```
src/
│
├── utils/hooks.js                   # Custom hooks & mock data generator
│
├── components/
│   ├── Cart.js       # CartItem, CartModal
│   ├── Header.js   # Header, CartButton, SearchBar
│   ├── StatsComponents.js     # StatCard, StatsSection
│   ├── Filter.js   # FilterSection
│   ├── Table.js     # ProductTable, TableRow, PaginationControls, etc.
│
├── ProductDashboard.js              # Main orchestrator component
```

---

## 🧩 Feature Overview

| Feature             | Description |
|---------------------|-------------|
| 🔍 **Search**        | Debounced product search using `useDebounce()` |
| 🗂️ **Filters**       | Category-based filtering |
| 🛒 **Cart Modal**    | Sidebar cart with product controls |
| 📊 **Stats Section** | Display product stats (count, categories, etc.) |
| 📋 **Table View**    | Draggable table headers with dynamic content |
| 🔁 **Pagination**    | Paginated product listing using `usePagination()` |
| ⚒️ **Custom Hooks**  | Reusable hooks for logic separation |

---

## 🛠️ Setup Instructions

```bash
# 1. Clone this repo
git clone https://github.com/PravendraRana/Hack2skill-assignment
cd Hack2skill-assignment

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev

# 4. Build for production
npm run build
```

---

## 🚀 Benefits of This Structure

**Scalability**
- Easy to add new features to sections
- Clear separation of concerns
- Modular for collaborative development

**Maintainability**
- Focused responsibility per file
- Easy bug tracking & fixes
- Clean import/export hierarchy

**Reusability**
- Components usable across multiple apps
- Consistent component interface patterns

**Testing**
- Unit-test ready components
- Hooks and UI logic testable in isolation

---

## 🧠 Optimizations

- **Debounced Search**: Reduces unnecessary renders
- **Code Splitting (if enabled)**: Potential for lazy loading
- **Draggable Headers**: Enhances UX with custom table layout
- **Pagination Logic**: Optimized client-side paging
- **Memoization (if applied)**: Prevents re-renders of expensive computations

---

## ⏱️ Time Tracking

| Task                      | Time Spent |
|---------------------------|------------|
| Initial Setup             | 1 hr       |
| Search & Debounce         | 1.5 hrs    |
| Cart Functionality        | 2 hrs      |
| Filters + Stats Section   | 2 hrs      |
| Table Rendering + Drag    | 2.5 hrs    |
| Pagination Logic          | 0.5 hr       |
| Refactoring & Styling     | 1.5 hrs    |
| **Total**                 | **11 hrs**  |

---

## 🧩 Challenges & Solutions

| Challenge                            | Solution |
|--------------------------------------|----------|
| Real-time search UX                  | Debounced input with `useDebounce()` |
| State clutter                        | Centralized state in `ProductDashboard.js` |
| Table header drag behavior           | Used HTML5 Drag API with custom logic |
| Filter resets affecting search       | Combined filtered & searched state cleanly |
| Reusable component needs             | Isolated UI logic & passed data via props |

---

## 📌 Future Improvements

- [ ] Add global state via Redux/Context
- [ ] Implement sorting functionality
- [ ] Add responsive design and accessibility (a11y)
- [ ] Fetch from real API backend
- [ ] Add unit & integration tests with Jest or Vitest

## 📌 Deployment 

- **Live Demo:** [hack2skill-assignment-chi.vercel.app](https://hack2skill-assignment-chi.vercel.app/)
- **Platform:** Deployed on [Vercel](https://vercel.com/)
- **CI/CD:** Automatic deployment on push to `main` branch
- **Preview URLs:** Each pull request generates a unique preview deployment
- **Production Ready:** Optimized build with fast load times and minimal bundle size

---

## 🙌 Conclusion

This project demonstrates a production-level approach to building scalable frontends in React. The modular structure makes it easy to maintain and extend while encouraging reuse and single-responsibility design.