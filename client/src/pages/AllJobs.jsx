import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import JobsContainer from "../components/JobsContainer";
import SearchContainer from "../components/SearchContainer";
import { createContext } from "react";

export const allJobsLoader = async () => {
  try {
    const { data } = await customFetch.get("/jobs");
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

export const allJobsContext = createContext();

const AllJobs = () => {
  const { data } = useLoaderData();
  return (
    <allJobsContext.Provider value={{ data }}>
      <SearchContainer />
      <JobsContainer />
    </allJobsContext.Provider>
  );
};

export default AllJobs;
