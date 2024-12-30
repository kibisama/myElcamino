import { LinePlot, ChartContainer, ChartsXAxis } from "@mui/x-charts";

const LineChart = ({ xData, yData }) => {
  return (
    <ChartContainer
      width={500}
      height={300}
      xAxis={[{ scaleType: "point", data: xData }]}
      series={[{ data: yData, type: "line" }]}
    >
      <LinePlot />
      <ChartsXAxis />
    </ChartContainer>
  );
};

export default LineChart;
