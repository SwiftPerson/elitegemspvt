import React, { useState, useEffect, useRef } from 'react';

interface VideoThumbnailProps {
  videoSrc: string;
  className?: string;
}

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({ videoSrc, className = '' }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // When metadata is loaded, set the current time to 0 (or a specific frame)
    const handleLoadedMetadata = () => {
      video.currentTime = 0;
    };

    // When the video has seeked to the desired time, capture a frame.
    const handleSeeked = () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataURL = canvas.toDataURL('image/jpeg');
        setThumbnail(dataURL);
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata, { once: true });
    video.addEventListener('seeked', handleSeeked, { once: true });

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('seeked', handleSeeked);
    };
  }, [videoSrc]);

  return thumbnail ? (
    <img src={thumbnail} alt="Video thumbnail" className={className} loading="lazy" />
  ) : (
    <>
      <video ref={videoRef} src={videoSrc} preload="metadata" style={{ display: 'none' }} />
      <div className={`${className} bg-gray-900 flex items-center justify-center`}>
        <span className="text-white">Loading...</span>
      </div>
    </>
  );
};

export default VideoThumbnail;
