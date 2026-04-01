# MediFlow - B2B Healthcare SaaS Platform

A high-performance, responsive B2B Healthcare SaaS dashboard built to demonstrate modern frontend architecture, state management, and real-time background processing.

**[🔴 Live Demo (Vercel/Netlify Link Here)](#)**

---

## 🚀 Tech Stack

* **Core:** React 18, TypeScript, Vite
* **Styling:** Tailwind CSS (Focus on zero-bloat, CSS-only visual components)
* **Authentication:** Firebase Auth
* **State Management:** React Context API (Auth State) & Custom Hooks (Local Data)
* **Background Processing:** Service Workers (Push Notifications) & Node.js
* **Icons:** Lucide React

---

## ✨ Core Features & Rubric Mapping

### 1. Authentication & Protected Routes
* Full integration with Firebase Authentication.
* Implemented **Context API** (`AuthContext`) to manage global user state.
* **Protected Routes:** Unauthorized users attempting to access `/dashboard`, `/patient`, or `/analytics` are automatically redirected to the login flow.

### 2. Patient Management Module
* Robust patient data display with seamless **Grid View** and **List View** toggling.
* Instant, memoized search functionality for zero-latency filtering.
* **Optimistic UI Updates:** Changing a patient's status updates the UI immediately while syncing in the background.

### 3. Real-Time Push Notifications (Service Worker)
* Fully implemented browser **Service Worker** (`sw.js`).
* **Real-World Use Case:** When a doctor changes a patient's status to "Critical" in the UI, a POST request is sent to a lightweight Node.js backend, which triggers an authentic OS-level Push Notification via the VAPID protocol to alert the user.

### 4. High-Performance Analytics (Bonus)
* Built a dedicated Analytics page to visualize patient demographics and department loads.
* **Performance Choice:** Instead of importing heavy libraries like `Chart.js` or `Recharts` (which bloat the JS bundle), all charts are built using **Pure CSS and Tailwind widths**. This results in a 0kb bundle footprint and instantaneous GPU-accelerated rendering.

---

## 🧠 Architectural Decisions (Micro-Architecture)

To ensure scalability, the project follows a domain-driven, modular folder structure:
* `/src/pages`: Isolated modules (Dashboard, Patient, Analytics) acting as distinct domains.
* `/src/components`: Reusable, generic UI components (Layouts, Modals, Skeletons).
* `/src/hooks`: Encapsulated business logic (`useAuth`, `usePatients`).
* `/src/lib`: Core utilities and mock data schemas.

**Perceived Performance Optimization:** Implemented mapped Skeleton Loaders (`Array.from`) during data fetching to prevent layout shift and drastically improve perceived load times.

---

## 🛠️ Running Locally

Because this project features real Web Push Notifications, it requires both the React frontend and a lightweight Node backend to run simultaneously.

### 1. Install Dependencies
```bash
npm install