import { IoBarChartSharp } from "react-icons/io5";
import { FaWpforms } from "react-icons/fa";
import { MdAdminPanelSettings, MdQueryStats } from "react-icons/md";
import { ImProfile } from "react-icons/im";

const links = [
  {
    text: "add job",
    path: ".", // dot means  it goes to its parent like in file paths (or you can use /dashboard)
    icon: <FaWpforms />,
  },
  {
    text: "all jobs",
    path: "all-jobs",
    icon: <MdQueryStats />,
  },
  {
    text: "stats",
    path: "stats",
    icon: <IoBarChartSharp />,
  },
  {
    text: "profile",
    path: "profile",
    icon: <ImProfile />,
  },
  {
    text: "admin",
    path: "admin",
    icon: <MdAdminPanelSettings />,
  },
];

export default links;
