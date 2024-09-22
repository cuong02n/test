import { useEffect, useState } from "react";
import TabSubmissions from "../components/TabSubmissions";
import CenteredLoader from "../ui/CenteredLoader";
import { GET_RATING_GRAPH, USER_STATUS } from "../utils/api";
import ErrorPage from "./ErrorPage";

export default function User({ username }) {
  const [styleBlur, setStyleBlur] = useState(true);
  const [data, setData] = useState([]);
  const [problemsSolved, setProblemsSolved] = useState([]);
  const [correctSubmissions, setCorrectSubmissions] = useState([]);
  const [skippedSubmissions, setSkippedSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(GET_RATING_GRAPH(username));

        if (res.status === 400) {
          throw new Error("User not found");
        } else if (res.status === 403) {
          throw new Error("Too many requests");
        } else if (res.status !== 200) {
          throw new Error("Failed to fetch data");
        }

        if (res.headers.get("Content-Type").includes("text/html")) {
          throw new Error(
            "Network error or CodeForces API is down. Please try again later",
          );
        }

        const data = await res.json();

        setData(data.result);
      } catch (error) {
        if (error instanceof TypeError && error.message === "Failed to fetch") {
          const str =
            "Network error or CodeForces API is down. Please try again later.";

          setErrorMsg(str);
        } else {
          setErrorMsg(error.message);
        }
      }
    };

    const fetchProblemsSolved = async () => {
      try {
        const res = await fetch(USER_STATUS(username));

        if (res.status === 400) {
          throw new Error("User not found");
        } else if (res.status === 403) {
          throw new Error("Too many requests");
        } else if (res.status !== 200) {
          throw new Error("Failed to fetch data");
        }

        const data = await res.json();

        const newQuestionsSolved = [];
        const newCorrectSubmissions = [];
        const newSkippedSubmissions = [];

        data.result.forEach((it) => {
          const submission = {
            id: it.id,
            problem: it.problem.name,
            contestId: it.contestId,
            rating: it.problem.rating ? it.problem.rating : 0,
            index: it.problem.index,
            tags: it.problem.tags,
            creationTimeSeconds: it.creationTimeSeconds,
          };

          if (it.verdict === "SKIPPED") {
            newSkippedSubmissions.push(submission);
          } else if (it.verdict === "OK") {
            if (
              !newQuestionsSolved.some((x) => x.problem === it.problem.name)
            ) {
              newQuestionsSolved.push(submission);
            }
            newCorrectSubmissions.push(submission);
          }
        });

        setProblemsSolved(newQuestionsSolved);
        setCorrectSubmissions(newCorrectSubmissions);
        setSkippedSubmissions(newSkippedSubmissions);
        setIsLoading(false);
      } catch (error) {
        if (error instanceof TypeError && error.message === "Failed to fetch") {
          const str =
            "Network error or CodeForces API is down. Please try again later.";
          setErrorMsg(str);
        } else {
          setErrorMsg(error.message);
        }
      }
    };

    fetchData();
    fetchProblemsSolved();
  }, [username]);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => setStyleBlur(false), 500); // Unblur after loading
    }
  }, [isLoading]);

  if (isLoading) return <CenteredLoader />;
  else if (errorMsg) {
    return <ErrorPage text={errorMsg} />;
  } else if (
    problemsSolved.length +
      correctSubmissions.length +
      skippedSubmissions.length ===
    0
  ) {
    return (
      <ErrorPage
        title="No data to show here !"
        text={"User has not made any submissions yet."}
        type={"info"}
      />
    );
  }

  return (
    // {`transition-all duration-700 ease-in-out ${styleBlur ? "blur-md" : ""}`}
    <div
      className={`mt-8 transition-all duration-300 ease-in-out sm:mx-4 lg:mx-14 ${styleBlur ? "opacity-0 blur-md" : ""}`}
    >
      <TabSubmissions data={data} problemsSolved={problemsSolved} />
    </div>
  );
}
