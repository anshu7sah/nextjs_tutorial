import React from "react";

const page = () => {
  console.log(process.env.NEXT_PUBLIC_API_KEY);
  throw Error("new error");
  return <div>signin</div>;
};

export default page;
