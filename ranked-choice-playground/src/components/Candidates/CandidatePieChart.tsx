import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/index";
import { Candidate } from "../../models/Candidate";
import SyncfusionPieChart from "../Common/SyncfusionPieChart";
import { getPartyName } from "../../constants/PartyData";
interface CandidatePieChartProps {
  useInPartyPopularity?: boolean;
  partyId?: string;
}

const CandidatePieChart: React.FC<CandidatePieChartProps> = ({
  useInPartyPopularity = false,
  partyId,
}) => {
  const candidatesState = useSelector(
    (state: RootState) => state.candidates.candidates
  );

  const candidates: Candidate[] =
    partyId && useInPartyPopularity
      ? candidatesState[partyId] || []
      : Object.values(candidatesState).flat();

  const data = candidates.map((candidate) => ({
    x: candidate.fullName,
    y: useInPartyPopularity
      ? candidate.inPartyPopularity
      : candidate.popularity,
    text: candidate.shortName,
    fill: candidate.personalColor,
    tooltip: getPartyName(candidate.partyId),
  }));

  return <SyncfusionPieChart data={data} />;
};

export default CandidatePieChart;
