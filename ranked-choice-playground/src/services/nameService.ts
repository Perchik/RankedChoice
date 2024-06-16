import axios from "axios";

type Name = {
  title: string;
  firstName: string;
  lastName: string;
  suffix?: string;
};

class NameService {
  private nameQueue: Name[] = [];
  private readonly batchSize: number;
  private isFetching: boolean = false;

  private titleWeights: { [key: string]: number } = {
    "": 80,
    "Dr.": 5,
    "Rev.": 1,
    "Prof.": 2,
  };

  private suffixWeights: { [key: string]: number } = {
    "Jr.": 5,
    "Sr.": 5,
    "Esq.": 1,
    PhD: 10,
    MD: 5,
    DMin: 1,
    "": 100,
  };

  constructor(batchSize: number = 10) {
    this.batchSize = batchSize;
    this.fetchNames(); // Initial fetch
  }

  private async fetchNames(): Promise<void> {
    if (this.isFetching) return; // Prevent multiple fetches simultaneously
    this.isFetching = true;
    try {
      const response = await axios.get("https://randomuser.me/api/", {
        params: {
          inc: "name",
          nat: "us,gb,ca,au,nz", // Diverse nationalities using English alphabet
          gender: "male", // TODO: support female
          results: this.batchSize, // Fetch batchSize names
        },
      });

      const users = response.data.results;
      this.nameQueue.push(
        ...users.map((user: any) => ({
          title: this.assignRandomTitle(),
          firstName: user.name.first,
          lastName: user.name.last,
          suffix: this.assignRandomSuffix(),
        }))
      );
    } catch (error) {
      console.error("Error fetching random names:", error);
    } finally {
      this.isFetching = false;
    }
  }

  private async ensureNamesAvailable(): Promise<void> {
    while (this.nameQueue.length === 0) {
      if (!this.isFetching) {
        await this.fetchNames();
      }
      // Wait a bit to allow fetchNames to populate the queue
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  private assignRandomTitle(): string | undefined {
    return this.weightedRandomSelection(this.titleWeights);
  }

  private assignRandomSuffix(): string | undefined {
    return this.weightedRandomSelection(this.suffixWeights);
  }

  private weightedRandomSelection(
    weights: { [key: string]: number },
    defaultValue?: string
  ): string | undefined {
    const totalWeight = Object.values(weights).reduce(
      (sum, weight) => sum + weight,
      0
    );
    const randomValue = Math.random() * totalWeight;

    let cumulativeWeight = 0;
    for (const [key, weight] of Object.entries(weights)) {
      cumulativeWeight += weight;
      if (randomValue < cumulativeWeight) {
        return key;
      }
    }

    return defaultValue;
  }

  public async getNextName(): Promise<Name> {
    await this.ensureNamesAvailable(); // Ensure names are available before proceeding

    if (this.nameQueue.length <= 2 && !this.isFetching) {
      this.fetchNames(); // Fetch more names when about to run out
    }

    return this.nameQueue.shift()!;
  }
}

const nameService = new NameService();

export const fetchRandomName = async (): Promise<Name> => {
  return nameService.getNextName();
};
