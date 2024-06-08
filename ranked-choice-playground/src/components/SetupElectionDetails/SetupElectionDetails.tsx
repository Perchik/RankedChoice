import React, { useEffect, useRef, createRef, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setElectionTitle,
  setNumberOfSeats,
} from "../../features/electionSlice";
import WordSpinner from "../Common/WordSpinner";
import { Button, Box, Typography } from "@mui/material";
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
import SelectableCard from "../Common/SelectableCard"; // Import the new SelectableCard component
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import NumericInput from "../Common/NumericInput"; // Import the new NumericInput component

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

  const handleSpin = () => {
    if (!isSingleMode) {
      const randomSeats = Math.floor(Math.random() * 9) + 2; // Random number between 2 and 10
      dispatch(setNumberOfSeats(randomSeats));
    }
    setIsSpinnerDone(new Array(currentRefs.current.length).fill(false));
    currentRefs.current.forEach((ref) => ref.current?.startSpinning());
  };

  const handleFinish = (index: number) => {
    setIsSpinnerDone((prev) => {
      const newIsSpinnerDone = [...prev];
      newIsSpinnerDone[index] = true;
      return newIsSpinnerDone;
    });
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

  useEffect(() => {
    startAllSpinners();
  }, [isSingleMode]);

  const startAllSpinners = () => {
    currentRefs.current.forEach((ref) => ref.current?.startSpinning());
  };

  return (
    <div className={styles.container}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Box sx={{ display: "flex", gap: 4 }}>
          <SelectableCard
            selected={isSingleMode}
            onClick={handleModeToggle}
            icon={<PersonIcon fontSize="large" />}
            title="One"
          />
          <SelectableCard
            selected={!isSingleMode}
            onClick={handleModeToggle}
            icon={<GroupIcon fontSize="large" />}
            title="Multiple"
          >
            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
              <NumericInput
                value={numberOfSeats}
                onChange={(value) => dispatch(setNumberOfSeats(value))}
                min={1}
                increment={1}
              />
            </Box>
          </SelectableCard>
        </Box>
      </Box>
      <div className={styles.spinnerContainer}>
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
    </div>
  );
};

export default SetupElectionDetails;
