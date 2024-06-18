import React from "react";
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  Inject,
  PieSeries,
  AccumulationDataLabel,
  AccumulationLegend,
  AccumulationTooltip,
} from "@syncfusion/ej2-react-charts";
import { Box, Grid, Typography } from "@mui/material";

interface SyncfusionPieChartProps {
  data: { x: string; y: number; text: string; fill: string; tooltip: string }[];
}

const SyncfusionPieChart: React.FC<SyncfusionPieChartProps> = ({ data }) => {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={8}>
        <AccumulationChartComponent
          id="pie-chart"
          legendSettings={{ visible: false }}
          height="350px"
          // eslint-disable-next-line no-template-curly-in-string
          tooltip={{ enable: true, format: "${point.tooltip}" }}
        >
          <Inject
            services={[
              PieSeries,
              AccumulationDataLabel,
              AccumulationLegend,
              AccumulationTooltip,
            ]}
          />
          <AccumulationSeriesCollectionDirective>
            <AccumulationSeriesDirective
              dataSource={data}
              xName="x"
              yName="y"
              pointColorMapping="fill"
              tooltipMappingName="tooltip"
              dataLabel={{
                visible: true,
                position: "Outside",
                connectorStyle: { length: "10%" },
                name: "text",
                font: { size: "14px" },
              }}
            />
          </AccumulationSeriesCollectionDirective>
        </AccumulationChartComponent>
      </Grid>
      <Grid item xs={4}>
        <Box>
          {data.map((entry, index) => (
            <Box key={index} display="flex" alignItems="center" mb={1}>
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  backgroundColor: entry.fill,
                  marginRight: 1,
                }}
              />
              <Typography variant="body2">{entry.text}</Typography>
            </Box>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};

export default SyncfusionPieChart;
