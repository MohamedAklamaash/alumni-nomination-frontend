import { photos_2023, photos_2024, photos_2025 } from '@/constants/photos_url';
import { useState, useEffect, useRef } from 'react';

// Define the Photo type for TypeScript
interface Photo {
  src: string;
  width: number;
  height: number;
}

// Props interface for PhotoGallery
interface PhotoGalleryProps {
  currentYear: number; // 0 for 2025, 1 for 2024, 2 for 2023
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ currentYear }) => {
  // Select photos array based on current year
  let selectedPhotos;
  let yearLabel;
  
  if (currentYear === 0) {
    selectedPhotos = photos_2025;
    yearLabel = '2025';
  } else if (currentYear === 1) {
    selectedPhotos = photos_2024;
    yearLabel = '2024';
  } else {
    selectedPhotos = photos_2023;
    yearLabel = '2023';
  }
  
  // Convert photo URLs to photo objects
  const photos = selectedPhotos.map((url) => {
    return {
      src: url,
      width: 4,
      height: 3
    }
  });

  // State to track window size
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );
  
  // Split photos based on screen size
  const getColumnDistribution = () => {
    if (windowWidth < 640) { // Small screens - 1 column
      return {
        column1: photos,
        column2: [],
        column3: []
      };
    } else if (windowWidth < 1024) { // Medium screens - 2 columns
      return {
        column1: photos.filter((_, index) => index % 2 === 0),
        column2: photos.filter((_, index) => index % 2 === 1),
        column3: []
      };
    } else { // Large screens - 3 columns
      return {
        column1: photos.filter((_, index) => index % 3 === 0),
        column2: photos.filter((_, index) => index % 3 === 1),
        column3: photos.filter((_, index) => index % 3 === 2)
      };
    }
  };
  
  const { column1, column2, column3 } = getColumnDistribution();
  
  // Refs for each column container
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);
  
  // Animation speeds (pixels per second)
  const speeds = [0.5, 0.7, 0.4];
  
  // Animation state
  const [scrollPositions, setScrollPositions] = useState<number[]>([0, 0, 0]);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);

  // Listen for window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Initialize width on component mount
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Animation effect
  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!lastTimestampRef.current) {
        lastTimestampRef.current = timestamp;
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      
      const deltaTime = timestamp - lastTimestampRef.current;
      lastTimestampRef.current = timestamp;
      
      // Update scroll positions for each column
      const newPositions = [...scrollPositions];
      
      // Get active columns based on screen size
      let activeColumns: (HTMLDivElement | null)[] = [];
      
      if (windowWidth < 640) {
        activeColumns = [col1Ref.current];
      } else if (windowWidth < 1024) {
        activeColumns = [col1Ref.current, col2Ref.current];
      } else {
        activeColumns = [col1Ref.current, col2Ref.current, col3Ref.current];
      }
      
      // Update and apply scroll positions only for active columns
      activeColumns.forEach((col, idx) => {
        if (col) {
          const speed = speeds[idx];
          const delta = speed * deltaTime / 16; // Normalize by 60fps
          newPositions[idx] += delta;
          
          col.scrollTop = newPositions[idx];
          
          const maxScroll = col.scrollHeight / 2;
          if (newPositions[idx] >= maxScroll) {
            newPositions[idx] = 0;
            col.scrollTop = 0;
          }
        }
      });
      
      setScrollPositions(newPositions);
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    animationFrameRef.current = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [windowWidth, scrollPositions]); // Re-initialize animation when window size changes
  
  const duplicateImages = (columnImages: Photo[]) => {
    return [...columnImages, ...columnImages];
  };
  
  return (
    <div className="relative bg-white min-h-screen px-4 sm:px-6 py-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100" />
      
      <div className="relative z-10 w-full sm:max-w-[90%] md:max-w-[85%] lg:max-w-[80%] mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 my-4 sm:my-8 text-center lg:text-left">
          Photo Gallery - {yearLabel}
        </h1>
        
        {/* Responsive grid layout */}
        <div className={`grid gap-4 h-[50rem] sm:h-[60rem] overflow-auto scroll-none md:h-[70rem] lg:h-[80rem] 
                         ${windowWidth < 640 ? 'grid-cols-1' : 
                           windowWidth < 1024 ? 'grid-cols-2' : 'grid-cols-3'}`}>
          
          {/* Column 1 - Always visible */}
          <div 
            ref={col1Ref}
            className="overflow-hidden h-full" 
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="space-y-4 pb-4">
              {duplicateImages(column1).map((photo, idx) => (
                <div key={`col1-${idx}`} className="rounded-lg overflow-hidden shadow-md">
                  <img 
                    src={photo.src} 
                    alt={`Gallery image ${idx + 1}`} 
                    className="w-full object-cover"
                    loading="lazy"
                    onError={() => {
                      console.error('Failed to load image:', photo.src);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Column 2 - Visible on medium screens and up */}
          {windowWidth >= 640 && (
            <div 
              ref={col2Ref}
              className="overflow-hidden h-full" 
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="space-y-4 pb-4">
                {duplicateImages(column2).map((photo, idx) => (
                  <div key={`col2-${idx}`} className="rounded-lg overflow-hidden shadow-md">
                    <img 
                      src={photo.src} 
                      alt={`Gallery image ${idx + 1}`} 
                      className="w-full object-cover"
                      loading="lazy"
                      onError={() => {
                        console.error('Failed to load image:', photo.src);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Column 3 - Visible on large screens only */}
          {windowWidth >= 1024 && (
            <div 
              ref={col3Ref}
              className="overflow-hidden h-full" 
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="space-y-4 pb-4">
                {duplicateImages(column3).map((photo, idx) => (
                  <div key={`col3-${idx}`} className="rounded-lg overflow-hidden shadow-md">
                    <img 
                      src={photo.src} 
                      alt={`Gallery image ${idx + 1}`} 
                      className="w-full object-cover"
                      loading="lazy"
                      onError={() => {
                        console.error('Failed to load image:', photo.src);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery;