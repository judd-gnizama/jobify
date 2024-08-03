import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import JobsContainer from "../components/JobsContainer";
import SearchContainer from "../components/SearchContainer";
import { createContext } from "react";

export const allJobsLoader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  try {
    const { data } = await customFetch.get("/jobs", { params });
    return { data, searchValues: { ...params } };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

export const allJobsContext = createContext();

const AllJobs = () => {
  const { data, searchValues } = useLoaderData();
  return (
    <allJobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobsContainer />
    </allJobsContext.Provider>
  );
};

export default AllJobs;
