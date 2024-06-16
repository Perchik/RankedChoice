// src/services/candidateService.ts
import { Candidate } from "../types/types";
import { fetchRandomName } from "./nameService";
import { partyNames } from "../constants/PartyData";

const generateRandomPopularity = () => Math.floor(Math.random() * 100);

const getRandomParty = (exclude?: string): string => {
  const filteredParties = exclude
    ? partyNames.filter((party) => party !== exclude)
    : partyNames;
  return filteredParties[Math.floor(Math.random() * filteredParties.length)];
};

export const generateRandomCandidate = async (): Promise<Candidate> => {
  try {
    const { firstName, lastName } = await fetchRandomName();
    const majorParty = getRandomParty();
    const minorParty =
      Math.random() > 0.5 ? getRandomParty(majorParty) : undefined;
    const popularity = generateRandomPopularity();
    const photoSvg = "";

    return {
      firstName,
      lastName,
      majorParty,
      minorParty,
      popularity,
      photoSvg,
    };
  } catch (error) {
    console.error("Error generating random candidate:", error);
    throw new Error("Failed to generate random candidate");
  }
};
