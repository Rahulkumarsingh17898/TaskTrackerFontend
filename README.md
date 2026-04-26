# TaskTracker - Frontend Application

A responsive, modern Single Page Application (SPA) designed for seamless task and project management. This is the frontend repository for the TaskTracker full-stack application, featuring secure passwordless authentication, strict role-based data isolation, and an intuitive user interface.

## 🛠 Tech Stack & Libraries

**Core Framework:**
* **React 19:** Building encapsulated components that manage their own state.
* **Vite:** Next-generation frontend tooling for instantaneous server starts and lightning-fast HMR.
* **React Router DOM (v7):** For declarative, component-based client-side routing.

**UI & Styling:**
* **Tailwind CSS & PostCSS:** Utility-first CSS framework for rapid, custom UI development.
* **Material UI (MUI) & Emotion:** Robust, accessible component library for complex interactive elements.
* **Framer Motion:** Production-ready animations and seamless page transitions.
* **Swiper:** Modern touch slider/carousel integration.
* **React Icons:** Comprehensive icon library integration.

**State Management & Utilities:**
* **Axios:** Promise-based HTTP client for consuming the Spring Boot REST API.
* **React Hook Form:** Performant, flexible, and extensible forms with easy-to-use validation.
* **JWT Decode:** Client-side decoding of JSON Web Tokens for OAuth 2.0 session management and Role-Based Access Control (RBAC).
* **Date-fns:** Modern JavaScript date utility library for formatting task deadlines and timestamps.
* **React Hot Toast:** Elegant, accessible toast notifications for user feedback.

## ✨ Key Features

* **Secure Authentication:** Seamless integration with the backend's OAuth 2.0 (Google/GitHub) and JWT-based session handling.
* **Role-Based UI:** Dynamic routing and component rendering based on decoded JWT roles (Admin vs. Standard User).
* **Fluid UX:** Form validations managed via React Hook Form, with asynchronous submission feedback provided by React Hot Toast.
* **Responsive Design:** Fully mobile-optimized layouts using Tailwind CSS grid and flexbox utilities.

## 🚀 Local Development Setup

To run this frontend application locally, ensure you have Node.js installed. You will also need the TaskTracker Spring Boot backend running locally or deployed to a server.

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Rahulkumarsingh17898/TaskTracker-Frontend.git](https://github.com/Rahulkumarsingh17898/TaskTracker-Frontend.git)
