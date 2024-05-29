import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import styled from "@emotion/styled";

const WORD_HEIGHT = 2; // height of each word in em units

const ScrollContainer = styled.div`
  align-items: flex-start;
  border: 1px solid #ccc;
  display: flex;
  height: ${WORD_HEIGHT}em;
  overflow: hidden;
  position: relative;
  width: 200px;
`;

const ScrollingText = styled.div<{ scroll: boolean; slow: boolean }>`
  display: inline-block;
  transition: ${({ scroll, slow }) =>
    scroll
      ? slow
        ? "transform 1s ease-out"
        : "transform 0.6s linear"
      : "none"};
`;

const TextItem = styled.div`
  height: ${WORD_HEIGHT}em;
  line-height: ${WORD_HEIGHT}em;
  text-align: center;
`;

const shuffleAndConcatList = (baseList: string[], currentItem: string) => {
  const filteredList = baseList.filter((item) => item !== currentItem);
  return [
    currentItem,
    ...filteredList.sort(() => Math.random() - 0.5),
    ...baseList.sort(() => Math.random() - 0.5),
    ...baseList.sort(() => Math.random() - 0.5),
  ];
};

interface WordSpinnerProps {
  words: string[];
}

const WordSpinner: React.FC<WordSpinnerProps> = ({ words }) => {
  const [scrolling, setScrolling] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [slowTransition, setSlowTransition] = useState<boolean>(false);
  const [animationEnabled, setAnimationEnabled] = useState<boolean>(true);
  const [shiftedList, setShiftedList] = useState<string[]>(() =>
    shuffleAndConcatList(words, words[0])
  );

  useEffect(() => {
    shuffleAndConcatList(words, words[0]);
  }, [words]);

  useEffect(() => {
    let scrollInterval: NodeJS.Timeout;
    let finalTimeout: NodeJS.Timeout;

    if (scrolling) {
      scrollInterval = setInterval(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 100);

      finalTimeout = setTimeout(() => {
        clearInterval(scrollInterval);
        const randomIndex = Math.floor(Math.random() * words.length);

        // Enable slow transition for final item
        setSlowTransition(true);
        setCurrentIndex((prevIndex) => prevIndex + randomIndex);

        // Disable slow transition after it completes
        setTimeout(() => {
          setSlowTransition(false);
          setScrolling(false);
        }, 1000); // Match the duration of the slow transition
      }, words.length * 2 * 100); // Scroll through the list twice (words.length * 2 * 100ms)

      return () => {
        clearInterval(scrollInterval);
        clearTimeout(finalTimeout);
      };
    }
  }, [scrolling, words.length]);

  const startScrolling = () => {
    // Temporarily disable the transition for resetting the position
    setAnimationEnabled(false);

    // Move the current item to the first spot in the parent div
    const currentItem = shiftedList[currentIndex % shiftedList.length];
    setShiftedList(shuffleAndConcatList(words, currentItem));
    setCurrentIndex(0);

    // Force a reflow to apply the change immediately
    setTimeout(() => {
      // Enable the transition again
      setAnimationEnabled(true);

      // Start the scrolling animation
      setScrolling(true);
    }, 10);
  };

  return (
    <div>
      <ScrollContainer>
        <ScrollingText
          scroll={animationEnabled && scrolling}
          slow={slowTransition}
          style={{ transform: `translateY(-${currentIndex * WORD_HEIGHT}em)` }}
        >
          {shiftedList.map((word, index) => (
            <TextItem key={index}>{word}</TextItem>
          ))}
        </ScrollingText>
      </ScrollContainer>
      <Button variant="contained" color="primary" onClick={startScrolling}>
        Generate
      </Button>
    </div>
  );
};

export default WordSpinner;
