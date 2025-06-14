import { Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import AttendanceStats from "./attendance-stats/AttendanceStats";
import AttendanceTimeing from "./attendance-timeing/AttendanceTimeing";
import AttendanceAction from "./attendance-action/AttendanceAction";

const AttendanceBoxes = () => {
  return (
    <>
      <Grid templateColumns="30% 35% auto" gap={4} mt={3}>
        <GridItem>
          <AttendanceStats />
        </GridItem>
        <GridItem>
          <AttendanceTimeing  />
        </GridItem>
        <GridItem marginTop="15px">
          <AttendanceAction />
        </GridItem>
      </Grid>
    </>
  );
};

export default AttendanceBoxes;
