import { Box, Tabs, Text } from "@radix-ui/themes";
import TableSubmissions from "./TableSubmissions";
import { useSelector } from "react-redux";
import Profile from "./Profile/Profile";

export default function TabSubmissions({ setStyleBlur }) {
  const { problemsSolved, correctSubmissions, skippedSubmissions } =
    useSelector((store) => store.user);
  // setStyleBlur(false);

  return (
    <div className={""}>
      <Profile />
    </div>
  );
}
