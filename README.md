# React E-Commerce Store

A modern, responsive e-commerce web application built with React, Tailwind CSS, and React Router. The app leverages the [FakeStoreAPI](https://fakestoreapi.com/) for products and user data, featuring authentication, cart functionality, product search, checkout with payment options, and user profile management.

---

## Demo

*https://ecommerce-store-tawny-xi.vercel.app*

---

## Features

- **Product Catalog:** View dynamic product listings and categories fetched from FakeStoreAPI
- **Search:** Search products with a responsive search bar integrated into the navbar
- **Authentication:** Login and logout with user session management (supports FakeStoreAPI users or custom usernames)
- **User Profile:** View and update user details, including uploading a profile image (stored locally)
- **Shopping Cart:** Add, update quantity, and remove items; cart state is persisted with localStorage
- **Checkout:** Multi-step checkout form with validation, supporting credit card and cash on delivery payment methods
- **Responsive Design:** Fully responsive UI optimized for desktop, tablet, and mobile devices
- **Animations:** Smooth UI transitions and hover effects with Framer Motion
- **Notifications:** User actions are confirmed or errored via React Toastify notifications
- **Error Handling:** Graceful error boundaries and API request handling

---

## Tech Stack

- React 18+
- React Router DOM v6
- Tailwind CSS (v3 or v4)
- React Icons
- Framer Motion
- React Toastify
- FakeStoreAPI (public REST API)

---

## Getting Started

### Prerequisites

- Node.js v16+
- npm or yarn package manager

### Installation
```
git clone <your-repo-url>
cd ecommerce-store
npm install
```


### Running Locally

npm start


Open [http://localhost:3000](http://localhost:3000) to view the app in development mode.

### Building for Production
npm run build


---

## Usage

- Navigate between product categories via the navbar
- Search products globally using the navbar search
- Register/login with existing FakeStoreAPI users or free text username (non-secure demo mode)
- Manage your shopping cart with quantity controls and removals
- Proceed to checkout after login (supports form validation and payment method toggling)
- Update your account info and profile picture in the profile page

---


## Acknowledgements

- [FakeStoreAPI](https://fakestoreapi.com/) for providing product and user data API  
- React and Tailwind CSS communities for inspiring and powerful libraries




