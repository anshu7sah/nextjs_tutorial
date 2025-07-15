"use client";

import { useCurrent } from "@/hooks/use-current";

export default function Home() {
  const { data } = useCurrent();
  // if (!data) {
  //   redirect("/signin");
  // }
  console.log(data);

  return <div></div>;
}
