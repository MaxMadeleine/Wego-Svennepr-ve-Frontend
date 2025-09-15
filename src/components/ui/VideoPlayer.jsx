import React from 'react';

export const VideoPlayer = ({ 
  src = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  poster = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
  title = "Video Player",
  className = ""
}) => {
  return (
    <div className={`max-w-4xl mx-auto p-6 ${className}`}>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h2>
      <video 
        className="w-full rounded-lg shadow-lg"
        controls
        preload="metadata"
        poster={poster}
      >
        <source 
          src={src} 
          type="video/mp4" 
        />
      </video>
    </div>
  );
};