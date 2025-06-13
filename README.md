# Baneronetwo Personal Website

## Project Overview

This is a personal website with a cyberpunk aesthetic, featuring a blog, music player, and various interactive elements. The site is designed to showcase my work, share blog posts about technology and security, and provide a unique user experience with custom animations and visual effects.

## Features

- **Interactive Cyberpunk UI**: Matrix-style background, custom cursor, and terminal-like windows
- **Blog System**: Read articles about technology, security, and privacy
- **Music Player**: Listen to music tracks while browsing the site
- **Multi-language Support**: Switch between different languages
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

This project is built with modern web technologies:

- **React**: Frontend library for building user interfaces
- **TypeScript**: Type-safe JavaScript for better development experience
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for styling
- **shadcn/ui**: Reusable UI components built with Radix UI and Tailwind
- **Lucide Icons**: Beautiful, consistent icon set
- **React Router**: For client-side routing
- **React Query**: For data fetching and state management

## Getting Started

To run this project locally, follow these steps:

```sh
# Step 1: Clone the repository
git clone https://github.com/baneronetwo/Baneronetwo_web.git

# Step 2: Navigate to the project directory
cd Baneronetwo_web

# Step 3: Install the necessary dependencies
npm install

# Step 4: Start the development server
npm run dev
```

## Project Structure

- `/src`: Source code
  - `/components`: React components
  - `/contexts`: React context providers
  - `/hooks`: Custom React hooks
  - `/lib`: Utility functions and libraries
  - `/pages`: Page components
- `/public`: Static assets
  - `/blog`: Markdown blog posts
  - `/music`: Music files for the player

## Deployment

This project can be deployed to any static hosting service like Vercel, Netlify, or GitHub Pages. To build for production:

```sh
npm run build
```

The build output will be in the `dist` directory, which can be deployed to your hosting provider.
