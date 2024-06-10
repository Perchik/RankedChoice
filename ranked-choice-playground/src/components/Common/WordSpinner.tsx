import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useRef,
  useCallback,
} from "react";
import { Box, Typography, useTheme } from "@mui/material";

const shuffleAndConcatList = (baseList: string[], currentItem: string) => {
  const filteredList = baseList.filter((item) => item !== currentItem);
  return [
    currentItem,
    ...filteredList.sort(() => Math.random() - 0.5),
    ...baseList.sort(() => Math.random() - 0.5),
  ];
};

interface WordSpinnerProps {
  words: string[];
  onFinish?: (finalWord: string) => void;
  alignment?: "left" | "center" | "right";
}

const WordSpinner = forwardRef<{ startSpinning: () => void }, WordSpinnerProps>(
  ({ words, onFinish, alignment = "center" }, ref) => {
    const [shiftedList, setShiftedList] = useState<string[]>(() =>
      shuffleAndConcatList(words, words[0])
    );
    const [finalIndex, setFinalIndex] = useState<number>(0);
    const [animationDuration, setAnimationDuration] = useState<number>(2);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const [isResetting, setIsResetting] = useState<boolean>(false);
    const spinningTextRef = useRef<HTMLDivElement>(null);
    const generatedWordRef = useRef<string | null>(null);
    const theme = useTheme();
    const textRef = useRef<HTMLDivElement>(null);
    const [wordHeight, setWordHeight] = useState<number>(2); // default height

    const resetSpinner = useCallback(() => {
      setIsAnimating(false);
      setIsResetting(true);
      const currentItem = shiftedList[finalIndex];
      setShiftedList(shuffleAndConcatList(words, currentItem));

      requestAnimationFrame(() => setIsResetting(false));
    }, [shiftedList, finalIndex, words]);

    useEffect(() => {
      const handleTransitionEnd = () => {
        const generatedWord = shiftedList[finalIndex];
        generatedWordRef.current = generatedWord;
        if (onFinish) {
          onFinish(generatedWord);
        }
        resetSpinner();
      };

      const spinningTextNode = spinningTextRef.current;
      if (spinningTextNode) {
        spinningTextNode.addEventListener("transitionend", handleTransitionEnd);
      }

      return () => {
        if (spinningTextNode) {
          spinningTextNode.removeEventListener(
            "transitionend",
            handleTransitionEnd
          );
        }
      };
    }, [finalIndex, onFinish, resetSpinner, shiftedList]);

    useEffect(() => {
      if (textRef.current) {
        const fontSize = window.getComputedStyle(textRef.current).fontSize;
        setWordHeight(parseFloat(fontSize) + 14);
      }
    }, []);

    const startSpinning = () => {
      const randomIndex = Math.floor(Math.random() * words.length);
      const newFinalIndex = randomIndex + words.length; // We loop through once before settling on a random entry, so we add words.length here.
      const newAnimationDuration = 2 + Math.random() * 2; // total duration 2-4s. Randomized to prevent multiple spinners from running in sync.

      setFinalIndex(newFinalIndex);
      setAnimationDuration(newAnimationDuration);
      setIsAnimating(true);
    };

    useImperativeHandle(ref, () => ({
      startSpinning,
      getGeneratedWord: () => generatedWordRef.current,
    }));

    return (
      <Box
        sx={{
          alignItems: "flex-start",
          display: "flex",
          height: `${wordHeight}px`,
          overflow: "hidden",
          position: "relative",
          px: 1,
        }}
      >
        <Box
          ref={spinningTextRef}
          className={`${isAnimating ? "is-animating" : ""} ${
            isResetting ? "is-resetting" : ""
          }`}
          sx={{
            display: "inline-block",
            willChange: "transform",
            transition: isAnimating
              ? `transform ${animationDuration}s ease-in-out`
              : "none",
            transform: isAnimating
              ? `translateY(calc(${finalIndex} * -${wordHeight}px))`
              : "translateY(0)",
          }}
          data-testid="spinning-text"
        >
          {shiftedList.map((word, index) => (
            <Typography
              key={index}
              ref={index === 0 ? textRef : null}
              variant="h6"
              sx={{
                height: `${wordHeight}px`,
                lineHeight: `${wordHeight}px`,
                textAlign: alignment,
              }}
              data-testid={`text-item-${index}`}
            >
              {word}
            </Typography>
          ))}
        </Box>
      </Box>
    );
  }
);

export default WordSpinner;
