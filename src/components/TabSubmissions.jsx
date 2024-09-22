import Profile from "./Profile/Profile";

export default function TabSubmissions({ data, problemsSolved }) {
  return (
    <div className={""}>
      <Profile data={data} problemsSolved={problemsSolved} />
    </div>
  );
}
