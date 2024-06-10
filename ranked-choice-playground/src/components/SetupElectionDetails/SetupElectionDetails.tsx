import React, {
  useEffect,
  useRef,
  createRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, TextField, Tooltip, IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

import {
  setElectionTitle,
  setNumberOfSeats,
} from "../../features/electionSlice";
import WordSpinner from "../Common/WordSpinner";
import {
  titles,
  responsibilities,
  orgs,
  orgJoiners,
} from "./electionNameStrings";
import styles from "./SetupElectionDetails.module.css";
import { SetupWizardStepProps } from "../../interfaces/SetupWizardStep";
import SelectableCard from "../Common/SelectableCard";
import { SinglePersonIcon, MultiplePeopleIcon } from "../../assets/Icons";

const SINGLE_MODE_TEMPLATE = "{0} of {1}";
const MULTIPLE_MODE_TEMPLATE = "{0} {1} {2}";

interface SetupElectionProps extends SetupWizardStepProps {}

const SetupElectionDetails: React.FC<SetupElectionProps> = ({
  setFormComplete,
}) => {
  const dispatch = useDispatch();
  const { numberOfSeats, title } = useSelector((state: any) => state.election);

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

  const currentRefs = isSingleMode ? singleModeRefs : multipleModeRefs;
  const wordLists = isSingleMode ? singleModeLists : multipleModeLists;

  const handleSpin = () => {
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
        : MULTIPLE_MODE_TEMPLATE.replace("{0}", generatedWords[0])
            .replace("{1}", generatedWords[1])
            .replace("{2}", generatedWords[2]);
      if (isSingleMode) dispatch(setNumberOfSeats(1));
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

  const handleModeToggle = (isSingle: boolean) => {
    if (isSingle !== isSingleMode) {
      // If the mode changed
      setIsSingleMode(isSingle);
      setIsSpinnerDone(
        new Array(
          isSingle ? singleModeLists.length : multipleModeLists.length
        ).fill(false)
      );
      dispatch(setNumberOfSeats(isSingle ? 1 : 2));
    }
  };

  const startAllSpinners = useCallback(() => {
    currentRefs.current.forEach((ref) => ref.current?.startSpinning());
  }, [currentRefs]);

  useEffect(() => {
    startAllSpinners();
  }, [isSingleMode, startAllSpinners]);

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
            icon={<SinglePersonIcon sx={{ fontSize: "60px" }} />}
            title="One"
          />
          <SelectableCard
            selected={!isSingleMode}
            onClick={() => handleModeToggle(false)}
            icon={<MultiplePeopleIcon sx={{ fontSize: "60px" }} />}
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
