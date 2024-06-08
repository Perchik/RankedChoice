import React, { useEffect, useRef, createRef, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setElectionTitle,
  setNumberOfSeats,
} from "../../features/electionSlice";
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
import styles from "./SetupElectionDetails.module.css";
import { SetupWizardStepProps } from "../../interfaces/SetupWizardStep";

const SINGLE_MODE_TEMPLATE = "{0} of {1}";
const MULTIPLE_MODE_TEMPLATE = "{0} seats on the {1} {2} {3}";

interface SetupElectionProps extends SetupWizardStepProps {}

const SetupElectionDetails: React.FC<SetupElectionProps> = ({
  setFormComplete,
}) => {
  const dispatch = useDispatch();
  const { title, numberOfSeats } = useSelector((state: any) => state.election);

  const [isSingleMode, setIsSingleMode] = useState(true);

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
        ? SINGLE_MODE_TEMPLATE.replace("{0}", generatedWords[0]).replace(
            "{1}",
            generatedWords[1]
          )
        : MULTIPLE_MODE_TEMPLATE.replace("{0}", numberOfSeats.toString())
            .replace("{1}", generatedWords[0])
            .replace("{2}", generatedWords[1])
            .replace("{3}", generatedWords[2]);
      setCombinedName(combinedName);
      dispatch(setElectionTitle(combinedName));
    }
  }, [isSpinnerDone, isSingleMode, numberOfSeats, currentRefs, dispatch]);

  const handleModeToggle = () => {
    setIsSingleMode((prevMode) => {
      const newMode = !prevMode;
      setCombinedName(""); // Reset the name when mode changes
      setIsSpinnerDone(
        new Array(
          newMode ? singleModeLists.length : multipleModeLists.length
        ).fill(false)
      ); // Reset spinner states
      return newMode;
    });
  };

  const startAllSpinners = () => {
    if (!isSingleMode) {
      const randomSeats = Math.floor(Math.random() * 9) + 2; // Random number between 2 and 10
      dispatch(setNumberOfSeats(randomSeats));
    }
    const refsToSpin = isSingleMode
      ? singleModeRefs.current
      : multipleModeRefs.current;
    refsToSpin.forEach((ref) => ref.current?.startSpinning());
  };

  // Use useEffect to call startAllSpinners when isSingleMode changes
  useEffect(() => {
    startAllSpinners();
  }, [isSingleMode]);

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
              onChange={(e) =>
                dispatch(setNumberOfSeats(Number(e.target.value)))
              }
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
        <Button onClick={startAllSpinners} variant="contained" color="primary">
          <FontAwesomeIcon icon={faRefresh} />
        </Button>
      </div>
      <div className={styles.combinedName}>{combinedName}</div>
    </div>
  );
};

export default SetupElectionDetails;
