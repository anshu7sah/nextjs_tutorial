"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCurrent = () => {
  console.log("hook creation");
  const query = useQuery({
    queryKey: ["current"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:5000/api/profile", {
        withCredentials: true,
      });

      // if (!response.ok) {
      //   return null;
      // }
      return data.data;
    },
  });

  return query;
};
