import axios from "axios";

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error) && error.response?.data) {
    const values = Object.values(error.response.data);

    if (values.length > 0) {
      return String(values[0]);
    }
  }

  return "An unexpected error occurred";
}
