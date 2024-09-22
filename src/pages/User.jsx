import { useState } from "react";
import TabSubmissions from "../components/TabSubmissions";

export default function User({ username }) {
  const [styleBlur, setStyleBlur] = useState(true);

  return (
    // {`transition-all duration-700 ease-in-out ${styleBlur ? "blur-md" : ""}`}
    <div
    // className={`mt-8 transition-all duration-300 ease-in-out sm:mx-4 lg:mx-14 ${styleBlur ? "opacity-0 blur-md" : ""}`}
    >
      <TabSubmissions username={username} />
    </div>
  );
}
