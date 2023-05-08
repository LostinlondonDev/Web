import { HttpErrorResponse } from "../interfaces/errorResponse.interface";


export const useFecth = <T,D>() => {
  const fetchPost = async (url: string, body: D) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include'
      });
      return (await response.json()) as T;
    } catch (error) {
        return error as HttpErrorResponse
    }
  };

  return { fetchPost };
};
