import React from 'react';

// Динамический импорт компонента Dither
const DitherComponent = React.lazy(() => import('../../Dither/Dither/Dither'));

export const SimpleBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      <React.Suspense fallback={<div className="w-full h-full bg-black"></div>}>
        <DitherComponent />
      </React.Suspense>
    </div>
  );
};

// Export the simple background as default
export default SimpleBackground;