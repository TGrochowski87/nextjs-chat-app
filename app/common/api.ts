import axios, { AxiosError } from "axios";

export const incrementRoomHeadCount = async (roomId: number) => {
  return axios
    .patch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/rooms/${roomId}/increment`)
    .catch((error: Error | AxiosError) => {
      if (axios.isAxiosError(error)) {
        console.log(error.status);
        console.error(error.response);
      } else {
        console.error(error);
      }
    });
};
