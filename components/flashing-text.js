import React, { useEffect, useState } from 'react';


// A component for creating a Flashing Text
function FlashingRainbowText() {
  const words = [
    "Unleash", "Productivity", "Together:", "Elevate", "your", "note-taking", "experience", "with", "our", "cutting-","edge",
    "real-","time","collaborative","application","Seamlessly","brainstorm","share","ideas", "and","collaborate"," with ","teams",
    "in","real" ,"time","making","distance","feel","like", "you're","in","the"," same"," room"];

    const rainbowColors = [
        "#f56565", "#ed8936", "#ecc94b", "#48bb78", "#4299e1", "#9f7aea", "#ed64a6"
      ];
    
      const [visibleWordIndex, setVisibleWordIndex] = useState(0);
      const [displayedWords, setDisplayedWords] = useState([]);
      const [allWordsDisplayed, setAllWordsDisplayed] = useState(false);
    
      useEffect(() => {
        if (visibleWordIndex < words.length) {
          const timeout = setTimeout(() => {
            setDisplayedWords(prevWords => [...prevWords, words[visibleWordIndex]]);
            setVisibleWordIndex(prevIndex => prevIndex + 1);
          }, 500);
    
          return () => clearTimeout(timeout);
        } else {
          setAllWordsDisplayed(true);
        }
      }, [visibleWordIndex]);
    
      return (
        <div className="text sm italic max-w-[700px] ">
          {allWordsDisplayed ? (
            <p>
              {displayedWords.join(' ')} ...
            </p>
          ) : (
            <p>
              {displayedWords.map((word, index) => (
                <span
                  key={index}
                  className="inline-block animate-rainbow"
                  style={{ color: rainbowColors[index % rainbowColors.length] }}
                >
                  {word}&nbsp;
                </span>
              ))}
            </p>
          )}
        </div>
      );
    }
    
    export default FlashingRainbowText;
