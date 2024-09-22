import Example from "./LineChart";

function Profile({ username }) {
  return (
    <div className="h-96 w-[100%]">
      <Example username={username} />
    </div>
  );
}

export default Profile;
