import { useState, useEffect, useRef } from 'react';

// Define the Photo type for TypeScript
interface Photo {
  src: string;
  width: number;
  height: number;
}

const photos: Photo[] = [
    {
        src: 'https://placehold.co/120x200/png',
        width: 4,
        height: 3
    },
    {
        src: 'https://placehold.co/600x400/png',
        width: 1,
        height: 1
    },
    {
        src: 'https://placehold.co/200x400/png',
        width: 4,
        height: 3
    },
    {
        src: 'https://placehold.co/600x400/png',
        width: 1,
        height: 1
    },
    {
        src: 'https://placehold.co/400x600/png',
        width: 4,
        height: 3
    },
    {
        src: 'https://placehold.co/600x400/png',
        width: 1,
        height: 1
    },
    {
        src: 'https://placehold.co/600x400/png',
        width: 4,
        height: 3
    },
    {
        src: 'https://placehold.co/600x700/png',
        width: 1,
        height: 1
    },
    {
        src: 'https://placehold.co/400x400/png',
        width: 4,
        height: 3
    },
    {
        src: 'https://placehold.co/600x400/png',
        width: 1,
        height: 1
    },
    {
        src: 'https://placehold.co/600x400/png',
        width: 4,
        height: 3
    },
    {
        src: 'https://placehold.co/600x400/png',
        width: 1,
        height: 1
    },
    {
        src: 'https://placehold.co/600x200/png',
        width: 4,
        height: 3
    },
    {
        src: 'https://placehold.co/600x400/png',
        width: 1,
        height: 1
    },
    {
        src: 'https://placehold.co/600x400/png',
        width: 4,
        height: 3
    },
    {
        src: 'https://placehold.co/600x400/png',
        width: 1,
        height: 1
    }
];

const PhotoGallery: React.FC = () => {
  // Split photos into three columns
  const column1 = photos.filter((_, index) => index % 3 === 0);
  const column2 = photos.filter((_, index) => index % 3 === 1);
  const column3 = photos.filter((_, index) => index % 3 === 2);
  
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
      const newPositions = scrollPositions.map((pos, idx) => {
        const speed = speeds[idx];
        const delta = speed * deltaTime / 16; // Normalize by 60fps
        return pos + delta;
      });
      
      const columns = [col1Ref.current, col2Ref.current, col3Ref.current];
      
      columns.forEach((col, idx) => {
        if (col) {
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
    animationFrameRef.current = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [scrollPositions]);
  

  const duplicateImages = (columnImages: Photo[]) => {
    return [...columnImages, ...columnImages];
  };
  
  return (
    <div className="relative bg-white min-h-screen px-6 py-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100" />
      
      <div className="relative z-10 max-w-[80%] mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 my-8">Photo Gallery</h1>
        
        <div className="grid grid-cols-3 gap-4 h-[80rem]">
          {/* Column 1 */}
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
                    alt={`Image ${idx}`} 
                    className="w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Column 2 */}
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
                    alt={`Image ${idx}`} 
                    className="w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Column 3 */}
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
                    alt={`Image ${idx}`} 
                    className="w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery;
