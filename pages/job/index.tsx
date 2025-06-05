import React from "react";
import InnerLayout from "../layout/InnerLayout";
import JobDetail from "../../components/job/job-info/JobDetail";
import EmployeTimeing from "../../components/job/employe-timeing/EmployeTimeing";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import OtherDetailsInfo from "../../components/job/other-info/OtherDetailsInfo";
import OrganizationView from "../../components/job/organization/OrganizationView";

const JobPage = () => {
  return (
    <>
      <InnerLayout>
        <Grid templateColumns="50% 50%" gap={6}>
          <GridItem colSpan={1} >
            <JobDetail />
            <Box h="1rem"></Box>
            <EmployeTimeing />
          </GridItem>

          <GridItem colSpan={1}>
            <OrganizationView />
            <Box h="1rem"></Box>
            <OtherDetailsInfo />
          </GridItem>
        </Grid>
      </InnerLayout>
    </>
  );
};

export default JobPage;
