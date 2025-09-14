# DROPP// - Auction House

An online auction platform where users can list items for sale and bid on others' listings. Built as a front-end application that interfaces with the Noroff API to provide comprehensive auction functionality.

![DROPP Auction Platform Screenshot](https://via.placeholder.com/800x400/1a9cb0/ffffff?text=DROPP+Auction+Platform)

## 📋 Table of Contents

- [Description](#description)
- [User Stories](#user-stories)
- [Built With](#built-with)
- [Features](#features)
- [Getting Started](#getting-started)
- [API Integration](#api-integration)
- [Deployment](#deployment)
- [Testing](#testing)

## 📖 Description

This project is a front-end application that interfaces with the Noroff API to provide auction functionality. Users with a `stud.noroff.no` email can register, receive 1000 credits, and participate in auctions. Non-registered users can browse and search listings.

The application follows modern web development practices using Vite for fast development, Tailwind CSS for styling, and a modular JavaScript architecture for maintainability.

## 👤 User Stories

The client has specified the following requirements:

- ✅ A user with a `stud.noroff.no` email may register
- ✅ A registered user may login
- ✅ A registered user may logout
- ✅ A registered user may update their avatar
- ✅ A registered user may view their total credit
- ✅ A registered user may create a Listing with a title, deadline date, media gallery and description
- ✅ A registered user may add a Bid to another user's Listing
- ✅ A registered user may view Bids made on a Listing
- ✅ An unregistered user may search through Listings

## 🛠 Built With

### Technologies
- **[Vite](https://vitejs.dev/)** - Fast build tool and development server
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[ESLint](https://eslint.org/)** - Code linting and formatting

### Development Tools
- **Node.js** (v16 or later)
- **npm/pnpm/yarn** - Package manager

### Approved Resources Used
- **CSS Framework**: Tailwind CSS (v4.1.6)
- **Hosting**: Netlify
- **Design Application**: Figma
- **Planning Application**: GitHub Projects

## ✨ Features

### Authentication & User Management
- User registration with `stud.noroff.no` email validation
- Secure login/logout functionality
- Profile management with editable bio and avatar
- Credit system tracking (1000 credits upon registration)

### Auction Functionality
- Create listings with title, description, deadline, and media gallery
- Browse and search all listings (public access)
- Place bids on listings (registered users only)
- View bid history and current highest bids
- Real-time countdown timers for ending auctions

### User Interface
- Responsive design for mobile and desktop
- Modern, clean interface with consistent branding
- Loading states and error handling
- Intuitive navigation and user feedback

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v16 or later)
- **npm**, **pnpm**, or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tin-kri/Semester-Project-2.git
   cd Semester-Project-2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

### Environment Setup

No additional environment variables are required as the application uses the public Noroff API endpoints.

## 🔌 API Integration

The application integrates with the **Noroff Auction API v2**:
- **Base URL**: `https://v2.api.noroff.dev`
- **Documentation**: [Noroff API Docs](https://api.noroff.dev/docs/static/index.html)

## 🌐 Deployment

### Live Demo
🔗 **[View Live Demo](https://your-netlify-url.netlify.app)**

### Deployment Steps
The application is deployed on Netlify:

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure redirects for SPA routing

### Build Commands
```bash
# Development
npm run dev

# Production build
npm run build

# Preview build
npm run preview
```

## 🧪 Testing

### Manual Testing
1. Register a new account with a `stud.noroff.no` email
2. Login and verify credit balance (1000 credits)
3. Create a new listing with title, description, and image
4. Browse listings as both authenticated and non-authenticated user
5. Place bids on listings
6. Update profile bio and avatar

---

**Course**: Front-End Development  
**Institution**: Noroff School of Technology and Digital Media  
**Year**: 2024
