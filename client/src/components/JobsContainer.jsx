import { useContext } from "react";
import Wrapper from "../assets/wrappers/JobsContainer";
import { allJobsContext } from "../pages/AllJobs";
import Job from "./Job";

const JobsContainer = () => {
  const { data } = useContext(allJobsContext);
  const { jobs } = data;
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No Jobs to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className="jobs">
        {jobs.map((job) => (
          <Job key={job._id} {...job} />
        ))}
      </div>
    </Wrapper>
  );
};

export default JobsContainer;
