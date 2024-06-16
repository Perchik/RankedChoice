import { Candidate } from "../models/Candidate";
import { fetchRandomName } from "./nameService";

const generateRandomPopularity = () => Math.floor(Math.random() * 5) + 1;

export const generateRandomCandidate = async (): Promise<Candidate> => {
  try {
    const { title, firstName, lastName, suffix } = await fetchRandomName();
    const popularity = generateRandomPopularity();
    const inPartyPopularity = generateRandomPopularity();
    const color = "#ff0000"; // Assign a random color or use logic to assign color

    return Candidate.fromNameComponents(
      title,
      firstName,
      lastName,
      popularity,
      inPartyPopularity,
      color,
      suffix
    );
  } catch (error) {
    console.error("Error generating random candidate:", error);
    throw new Error("Failed to generate random candidate");
  }
};
