import { useState } from "react";
interface IProps {
  jobs: string[];
  setJobs: (value: string[]) => void;
}
function Todo(props: IProps) {
  const [job, setjob] = useState("");
  const { jobs, setJobs } = props;
  const handleInputjob = () => {
    if (job) {
      setJobs([...jobs, job]);
      setjob("");
    }
  };
  return (
    <>
      <div style={{ border: "1px solid red" }}>
        <input
          type="text"
          placeholder="enter to do...."
          value={job}
          onChange={(e) => setjob(e.target.value)}
        />
        <button onClick={handleInputjob}>add</button>
      </div>
    </>
  );
}

export default Todo;
