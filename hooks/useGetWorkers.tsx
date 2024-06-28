import { Category, User, UserService } from "@prisma/client";
import axios from "axios";

export const useGetWorkers = async (
  url: string
): Promise<{
  categories: Category[];
  users: (UserService & { user: User })[];
}> => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch workers from ${url}:`, error);
    throw new Error('Failed to fetch workers');
  }
};