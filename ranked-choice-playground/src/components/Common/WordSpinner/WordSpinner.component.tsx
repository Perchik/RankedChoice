import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useRef,
  useCallback,
} from "react";
import styled from "@emotion/styled";

const WORD_HEIGHT = 2; // height of each word in em units

const SpinContainer = styled.div`
  align-items: flex-start;
  border: 1px solid #ccc;
  display: flex;
  height: ${WORD_HEIGHT}em;
  overflow: hidden;
  position: relative;
  width: 200px;
`;

const SpinningText = styled.div<{
  animationDuration: number;
  finalIndex: number;
}>`
  display: inline-block;
  will-change: transform;

  &.is-animating {
    transition: transform ${({ animationDuration }) => animationDuration}s
      ease-in-out;
    transform: ${({ finalIndex }) =>
      `translateY(calc(${finalIndex} * -${WORD_HEIGHT}em))`};
  }

  &.is-resetting {
    transition: none;
    transform: translateY(0);
  }
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
  ];
};

interface WordSpinnerProps {
  words: string[];
  onFinish?: (finalWord: string) => void;
}

const WordSpinner = forwardRef<{ startSpinning: () => void }, WordSpinnerProps>(
  ({ words, onFinish }, ref) => {
    const [shiftedList, setShiftedList] = useState<string[]>(() =>
      shuffleAndConcatList(words, words[0])
    );
    const [finalIndex, setFinalIndex] = useState<number>(0);
    const [animationDuration, setAnimationDuration] = useState<number>(2);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const [isResetting, setIsResetting] = useState<boolean>(false);
    const spinningTextRef = useRef<HTMLDivElement>(null);
    const generatedWordRef = useRef<string | null>(null);

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
      <SpinContainer>
        <SpinningText
          ref={spinningTextRef}
          className={`${isAnimating ? "is-animating" : ""} ${
            isResetting ? "is-resetting" : ""
          }`}
          animationDuration={animationDuration}
          finalIndex={finalIndex}
          data-testid="spinning-text"
        >
          {shiftedList.map((word, index) => (
            <TextItem key={index} data-testid={`text-item-${index}`}>
              {word}
            </TextItem>
          ))}
        </SpinningText>
      </SpinContainer>
    );
  }
);

export default WordSpinner;
