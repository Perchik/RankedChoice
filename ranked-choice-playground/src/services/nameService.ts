import axios from "axios";

type Name = {
  firstName: string;
  lastName: string;
};

class NameService {
  private nameQueue: Name[] = [];
  private readonly batchSize: number;
  private isFetching: boolean = false;

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
          nat: "us",
          gender: "male", // TODO: support female
          results: this.batchSize, // Fetch batchSize names
        },
      });

      const users = response.data.results;
      this.nameQueue.push(
        ...users.map((user: any) => ({
          firstName: user.name.first,
          lastName: user.name.last,
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
