"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCurrent = () => {
  const query = useQuery({
    queryKey: ["current"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:5000/api/profile", {
        withCredentials: true,
      });
      if (!response.ok) {
        return null;
      }
      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
