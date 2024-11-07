import React, { useEffect, useState } from 'react';

interface PageNumberProps {
  police: string;
}

export function PageNumber({ police }: PageNumberProps) {
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const calculatePages = () => {
      // Get page height in pixels (A4 page height at 96 DPI)
      const pageHeight = 1123; // ~297mm (A4 height) at 96 DPI
      const contentHeight = document.documentElement.scrollHeight;
      const calculatedPages = Math.ceil(contentHeight / pageHeight);
      setTotalPages(calculatedPages > 0 ? calculatedPages : 1);
    };

    // Calculate on mount and window resize
    calculatePages();
    window.addEventListener('resize', calculatePages);

    // Cleanup
    return () => window.removeEventListener('resize', calculatePages);
  }, []);

  // Generate page number elements
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => (
    <div key={i} className="print:block" style={{ 
      pageBreakAfter: i < totalPages - 1 ? 'always' : 'auto',
      display: 'none' // Hidden in normal view
    }}>
      <div className="fixed bottom-4 left-0 right-0 text-center text-xs text-gray-600">
        {i + 1}/{totalPages} - Police: {police}
      </div>
    </div>
  ));

  return (
    <>
      {pageNumbers}
      <style>
        {`
          @media print {
            @page {
              margin-bottom: 20mm;
            }
          }
        `}
      </style>
    </>
  );
}