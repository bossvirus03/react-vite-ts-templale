import Todo from "./components/Todo";
import { useState } from "react";
function App() {
  const [jobs, setJobs] = useState<string[]>([]);
  return (
    <>
      <Todo jobs={jobs} setJobs={setJobs} />
      <ul>
        {jobs.map((job) => {
          return <li key={job}>{job}</li>;
        })}
      </ul>
    </>
  );
}

export default App;

//ln2qmt0cvidNYdZx
