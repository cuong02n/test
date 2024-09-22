import Example from "./LineChart";

function Profile({ data, problemsSolved }) {
  return (
    <div className="h-96 w-[100%]">
      <Example data={data} problemsSolved={problemsSolved} />
    </div>
  );
}

export default Profile;
