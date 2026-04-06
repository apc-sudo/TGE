import React from "react";

const RippleGrid = ({
  gridColor = "#228B22",
  opacity = 0.8,
}) => {
  // For now, let's just show a CSS grid that we know works
  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* CSS-based animated grid */}
      <div 
        className="w-full h-full animate-pulse"
        style={{
          background: `
            linear-gradient(rgba(${parseInt(gridColor.slice(1,3), 16)}, ${parseInt(gridColor.slice(3,5), 16)}, ${parseInt(gridColor.slice(5,7), 16)}, ${opacity * 0.3}) 1px, transparent 1px),
            linear-gradient(90deg, rgba(${parseInt(gridColor.slice(1,3), 16)}, ${parseInt(gridColor.slice(3,5), 16)}, ${parseInt(gridColor.slice(5,7), 16)}, ${opacity * 0.3}) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridPulse 3s ease-in-out infinite'
        }}
      />
      
      {/* Add custom animation */}
      <style jsx>{`
        @keyframes gridPulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
      `}</style>
      
    </div>
  );
};

export default RippleGrid; 