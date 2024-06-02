import React, { useEffect, useRef, createRef, useState, useMemo } from "react";
import WordSpinner from "../Common/WordSpinner";
import {
  Button,
  TextField,
  Switch,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import { Refresh } from "@mui/icons-material";
import {
  titles,
  responsibilities,
  orgs,
  orgJoiners,
} from "./electionNameStrings";
import "./ElectionNameGenerator.module.css";

interface ElectionNameGeneratorProps {
  onNext: (name: string) => void;
}

const ElectionNameGenerator: React.FC<ElectionNameGeneratorProps> = ({
  onNext,
}) => {
  const [isSingleMode, setIsSingleMode] = useState(true);
  const [numberOfSeats, setNumberOfSeats] = useState(1);

  const singleModeLists = useMemo(() => [titles, responsibilities], []);
  const multipleModeLists = useMemo(
    () => [orgs, orgJoiners, responsibilities],
    []
  );

  const singleModeRefs = useRef(
    singleModeLists.map(() =>
      createRef<{
        startSpinning: () => void;
        getGeneratedWord: () => string | null;
      }>()
    )
  );

  const multipleModeRefs = useRef(
    multipleModeLists.map(() =>
      createRef<{
        startSpinning: () => void;
        getGeneratedWord: () => string | null;
      }>()
    )
  );

  const [isSpinnerDone, setIsSpinnerDone] = useState<boolean[]>(
    new Array(singleModeLists.length).fill(false)
  );
  const [combinedName, setCombinedName] = useState<string>("");

  const currentRefs = isSingleMode ? singleModeRefs : multipleModeRefs;
  const wordLists = isSingleMode ? singleModeLists : multipleModeLists;

  const handleSpin = () => {
    if (!isSingleMode) {
      setNumberOfSeats(Math.floor(Math.random() * 9) + 2); // Random number between 2 and 10
    }
    setIsSpinnerDone(new Array(currentRefs.current.length).fill(false));
    currentRefs.current.forEach((ref) => ref.current?.startSpinning());
  };

  const handleFinish = (index: number) => {
    const newIsSpinnerDone = [...isSpinnerDone];
    newIsSpinnerDone[index] = true;
    setIsSpinnerDone(newIsSpinnerDone);
  };

  useEffect(() => {
    if (isSpinnerDone.every((done) => done)) {
      const generatedWords = currentRefs.current.map(
        (ref) => ref.current?.getGeneratedWord() || ""
      );
      const combinedName = isSingleMode
        ? `${generatedWords[0]} of ${generatedWords[1]}`
        : `${numberOfSeats} seats on The ${generatedWords[0]} ${generatedWords[1]} ${generatedWords[2]}`;
      setCombinedName(combinedName);
    }
  }, [isSpinnerDone, isSingleMode, numberOfSeats, currentRefs]);

  const handleNext = () => {
    onNext(combinedName);
  };

  const handleModeToggle = () => {
    setIsSingleMode((prevMode) => !prevMode);
    setCombinedName(""); // Reset the name when mode changes
    setIsSpinnerDone(
      new Array(
        !isSingleMode ? multipleModeLists.length : singleModeLists.length
      ).fill(false)
    ); // Reset spinner states

    // Force the spinner refs to update
    if (!isSingleMode) {
      multipleModeRefs.current.forEach((ref) => ref.current?.startSpinning());
    } else {
      singleModeRefs.current.forEach((ref) => ref.current?.startSpinning());
    }
  };

  return (
    <div className="container">
      <FormControlLabel
        control={<Switch checked={!isSingleMode} onChange={handleModeToggle} />}
        label={isSingleMode ? "Single" : "Multiple"}
      />
      <div className={`spinner-container `}>
        {!isSingleMode && (
          <>
            <TextField
              className="styled-text-field"
              type="number"
              value={numberOfSeats}
              onChange={(e) => setNumberOfSeats(Number(e.target.value))}
              label="Seats"
              inputProps={{ min: 1 }}
            />
            <span className="sentence-text">seats on The</span>
          </>
        )}
        {wordLists.map((words, index) => (
          <React.Fragment
            key={`${isSingleMode ? "single" : "multiple"}-${index}`}
          >
            <WordSpinner
              ref={currentRefs.current[index]}
              words={words}
              onFinish={() => handleFinish(index)}
            />
            {isSingleMode && index === 0 && (
              <span className="sentence-text">of</span>
            )}
          </React.Fragment>
        ))}
        <IconButton onClick={handleSpin}>
          <Refresh />
        </IconButton>
      </div>
      <div className="combined-name">{combinedName}</div>
      <div>
        <Button variant="contained" color="primary" onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default ElectionNameGenerator;
