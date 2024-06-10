import React, { useEffect, useRef, createRef, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setElectionTitle,
  setNumberOfSeats,
} from "../../features/electionSlice";
import WordSpinner from "../Common/WordSpinner";
import {
  Button,
  Box,
  Typography,
  TextField,
  Tooltip,
  Paper,
  IconButton,
} from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";
import {
  titles,
  responsibilities,
  orgs,
  orgJoiners,
} from "./electionNameStrings";
import styles from "./SetupElectionDetails.module.css";
import { SetupWizardStepProps } from "../../interfaces/SetupWizardStep";
import SelectableCard from "../Common/SelectableCard";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";

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
      setFormComplete(true);
    }
  }, [
    isSpinnerDone,
    setFormComplete,
    isSingleMode,
    numberOfSeats,
    currentRefs,
    dispatch,
  ]);

  const handleModeToggle = (mode: boolean) => {
    if (mode !== isSingleMode) {
      setIsSingleMode(mode);
      setCombinedName(""); // Reset the name when mode changes
      setIsSpinnerDone(
        new Array(
          mode ? singleModeLists.length : multipleModeLists.length
        ).fill(false)
      ); // Reset spinner states
    }
  };

  useEffect(() => {
    startAllSpinners();
  }, [isSingleMode]);

  const startAllSpinners = () => {
    currentRefs.current.forEach((ref) => ref.current?.startSpinning());
  };

  return (
    <div className={styles.container}>
      <Typography variant="h4">
        How many seats are open in this election?
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
          <SelectableCard
            selected={isSingleMode}
            onClick={() => handleModeToggle(true)}
            icon={<PersonIcon fontSize="large" />}
            title="One"
          />
          <SelectableCard
            selected={!isSingleMode}
            onClick={() => handleModeToggle(false)}
            icon={<GroupIcon fontSize="large" />}
            title="Multiple"
          >
            <Box
              sx={{ display: "flex", alignItems: "center", mt: 2 }}
              onClick={(e) => e.stopPropagation()} // Prevent event propagation
            >
              <TextField
                type="number"
                value={numberOfSeats}
                onChange={(e) =>
                  dispatch(setNumberOfSeats(Number(e.target.value)))
                }
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                inputProps={{ min: 2, max: 10 }}
                sx={{ width: "80px", ml: 2 }}
              />
            </Box>
          </SelectableCard>
        </Box>
      </Box>
      <Typography variant="h4" sx={{ py: 2 }}>
        {`This election will be for ${isSingleMode ? "the position of" : `${numberOfSeats} seats on the`}`}
      </Typography>
      <Box
        display="flex"
        flexDirection="row"
        sx={{
          backgroundColor: "#0000000b",
          borderBottom: "solid 1px grey",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          pt: 1,
        }}
      >
        {wordLists.map((words, index) => (
          <React.Fragment
            key={`${isSingleMode ? "single" : "multiple"}-${index}`}
          >
            <WordSpinner
              ref={currentRefs.current[index]}
              words={words}
              onFinish={() => handleFinish(index)}
              alignment={
                index === 0
                  ? "right"
                  : index === wordLists.length - 1
                    ? "left"
                    : "center"
              }
            />
            {isSingleMode && index === 0 && (
              <Typography
                variant="h6"
                sx={{
                  px: 1,
                  height: "34px",
                }}
              >
                of
              </Typography>
            )}
          </React.Fragment>
        ))}
        <Tooltip title="Regenerate">
          <IconButton onClick={handleSpin} color="primary" sx={{ ml: 2 }}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </div>
  );
};

export default SetupElectionDetails;
