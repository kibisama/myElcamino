import { BarPlot, ChartContainer, ChartsXAxis } from "@mui/x-charts";

const BarChart = ({ xData, yData }) => {
  return (
    <ChartContainer
      width={500}
      height={300}
      xAxis={[{ scaleType: "band", data: xData }]}
      series={[{ data: yData, type: "bar" }]}
    >
      <BarPlot />
      <ChartsXAxis />
    </ChartContainer>
  );
};

export default BarChart;
