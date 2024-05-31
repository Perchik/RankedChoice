import axios from "axios";

const API_URL = "http://localhost:5000/generate_headshot";

interface HeadshotResponse {
  svg: string;
}

export const generateHeadshot = async (
  accessoryColor: string
): Promise<string> => {
  try {
    const response = await axios.post<HeadshotResponse>(API_URL, {
      accessory_color: accessoryColor,
    });
    return response.data.svg;
  } catch (error) {
    console.error("Error generating headshot:", error);
    throw new Error("Failed to generate headshot");
  }
};
