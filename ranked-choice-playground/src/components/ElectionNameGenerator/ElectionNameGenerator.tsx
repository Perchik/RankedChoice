import React, { useEffect, useRef, createRef, useState, useMemo } from "react";
import WordSpinner from "../Common/WordSpinner";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import {
  titles,
  responsibilities,
  orgs,
  orgJoiners,
} from "./electionNameStrings";
import styles from "./ElectionNameGenerator.module.css";

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
        : `${numberOfSeats} seats on the ${generatedWords[0]} ${generatedWords[1]} ${generatedWords[2]}`;
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
    <div className={styles.container}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Mode</FormLabel>
        <RadioGroup
          row
          aria-label="mode"
          name="mode"
          value={isSingleMode ? "single" : "multiple"}
          onChange={handleModeToggle}
        >
          <FormControlLabel value="single" control={<Radio />} label="Single" />
          <FormControlLabel
            value="multiple"
            control={<Radio />}
            label="Multiple"
          />
        </RadioGroup>
      </FormControl>
      <div className={styles.spinnerContainer}>
        {!isSingleMode && (
          <>
            <TextField
              label="Seats"
              type="number"
              value={numberOfSeats}
              onChange={(e) => setNumberOfSeats(Number(e.target.value))}
              inputProps={{ min: 1 }}
              variant="outlined"
              margin="normal"
            />
            <Typography className={styles.sentenceText}>
              seats on The
            </Typography>
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
              <Typography className={styles.sentenceText}>of</Typography>
            )}
          </React.Fragment>
        ))}
        <Button onClick={handleSpin} variant="contained" color="primary">
          <FontAwesomeIcon icon={faRefresh} />
        </Button>
      </div>
      <div className={styles.combinedName}>{combinedName}</div>
      <div>
        <Button variant="contained" color="primary" onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default ElectionNameGenerator;
