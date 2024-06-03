export class Voter {
  preferredParty: string;
  preferences: { [candidateName: string]: number };
  civicMindedness: number; // This will determine how much of the ballot the voter will fill out.
 
  constructor(
    preferredParty: string,
    preferences: { [candidateName: string]: number },
    civicMindedness: number
  ) {
    this.preferredParty = preferredParty;
    this.preferences = preferences;
    this.civicMindedness = civicMindedness;
  }

  getPreferredParty(): string | null {
    const sortedPreferences = Object.entries(this.preferences).sort(
      (a, b) => b[1] - a[1]
    );
    return sortedPreferences.length > 0 ? sortedPreferences[0][0] : null;
  }
}
