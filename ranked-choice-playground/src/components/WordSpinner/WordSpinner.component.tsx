import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useRef,
} from "react";
import styled from "@emotion/styled";

const WORD_HEIGHT = 2; // height of each word in em units
const SPIN_DURATION = 100; // duration for each spin step in milliseconds
const SLOW_SPIN_DURATION = 1000; // duration for the slow spin in milliseconds

const SpinContainer = styled.div`
  align-items: flex-start;
  border: 1px solid #ccc;
  display: flex;
  height: ${WORD_HEIGHT}em;
  overflow: hidden;
  position: relative;
  width: 200px;
`;

const SpinningText = styled.div<{ spin: boolean; slow: boolean }>`
  display: inline-block;
  transition: ${({ spin, slow }) =>
    spin ? (slow ? "transform 1s ease-out" : "transform 0.6s linear") : "none"};
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
  onFinish?: (finalWord: string) => void;
}
const WordSpinner = forwardRef<{ startSpinning: () => void }, WordSpinnerProps>(
  ({ words, onFinish }, ref) => {
    const [spinning, setSpinning] = useState<boolean>(false);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [slowTransition, setSlowTransition] = useState<boolean>(false);
    const [animationEnabled, setAnimationEnabled] = useState<boolean>(true);
    const [shiftedList, setShiftedList] = useState<string[]>(() =>
      shuffleAndConcatList(words, words[0])
    );

    const finalWordRef = useRef<string | null>(null);

    useEffect(() => {
      setShiftedList(shuffleAndConcatList(words, words[0]));
    }, [words]);

    useEffect(() => {
      let spinInterval: NodeJS.Timeout;
      let finalTimeout: NodeJS.Timeout;

      if (spinning) {
        spinInterval = setInterval(() => {
          setCurrentIndex((prevIndex) => prevIndex + 1);
        }, SPIN_DURATION);

        finalTimeout = setTimeout(() => {
          clearInterval(spinInterval);
          const randomIndex = Math.floor(Math.random() * words.length);

          // Enable slow transition for final item
          setSlowTransition(true);
          setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex + randomIndex;
            finalWordRef.current = shiftedList[newIndex % shiftedList.length];
            return newIndex;
          });

          // Disable slow transition after it completes
          setTimeout(() => {
            setSlowTransition(false);
            setSpinning(false);
            if (onFinish && finalWordRef.current) {
              onFinish(finalWordRef.current);
            }
          }, SLOW_SPIN_DURATION);
        }, words.length * 2 * SPIN_DURATION); // Spin through the list twice (words.length * 2 * 100ms)

        return () => {
          clearInterval(spinInterval);
          clearTimeout(finalTimeout);
        };
      }
    }, [spinning, words.length, onFinish, shiftedList]);

    const startSpinning = () => {
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

        // Start the spinning animation
        setSpinning(true);
      }, 10);
    };

    useImperativeHandle(ref, () => ({
      startSpinning,
    }));

    return (
      <SpinContainer aria-live="polite">
        <SpinningText
          spin={animationEnabled && spinning}
          slow={slowTransition}
          style={{
            transform: `translateY(-${currentIndex * WORD_HEIGHT}em)`,
          }}
        >
          {shiftedList.map((word, index) => (
            <TextItem key={index}>{word}</TextItem>
          ))}
        </SpinningText>
      </SpinContainer>
    );
  }
);

export default WordSpinner;
