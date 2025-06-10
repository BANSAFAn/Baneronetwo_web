import React from 'react';

// React component for background animation

// Simple CSS background component
const SimpleBackground = () => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-800 relative">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)] animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.2),transparent_50%)] animate-pulse delay-1000"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.2),transparent_50%)] animate-pulse delay-2000"></div>
      </div>
    </div>
  );
};

// Export the simple background as default
export default SimpleBackground;