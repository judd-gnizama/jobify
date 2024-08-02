import { useState } from "react";
import Wrapper from "../assets/wrappers/ChartsContainer";
import BarChartComp from "./BarChartComp";
import AreaChartComp from "./AreaChartComp";

const ChartsContainer = ({ data }) => {
  const [barChart, setBarChart] = useState(true);

  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button className="" type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "Area Chart" : "Bar Graph"}
      </button>
      {barChart ? <BarChartComp data={data} /> : <AreaChartComp data={data} />}
    </Wrapper>
  );
};

export default ChartsContainer;
