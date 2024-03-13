import React, { useEffect } from 'react';
import './ScrollingHeadlines.css'; // Import the CSS file

const ScrollingHeadlines = ({ headlines }) => {
  // Function to scroll headlines
  const scrollHeadlines = () => {
    const container = document.getElementById('headline-container');
    if (container) {
      container.scrollLeft += 2; // Adjust the scroll speed as needed
    }
  };

  // Set up the scrolling effect on component mount
  useEffect(() => {
    const scrollInterval = setInterval(scrollHeadlines, 50); // Adjust the interval as needed

    // Clean up the interval on component unmount
    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div id="headline-container" className="scrolling-container">
      {headlines.map((headline, index) => (
        <div key={index} className="headline">
            <marquee behavior="scroll" direction="left">
          {headline}
          </marquee>
        </div>
      ))}
    </div>
  );
};

export default ScrollingHeadlines;
