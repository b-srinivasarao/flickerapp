/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Album from "./Album";
import Photos from "./Photos";
import { useDispatch, useSelector } from "react-redux";
import { fetchAlbumDetails, fetchPhotos } from "../reducer";
import { State } from "../types/redux";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const MyPage = () => {
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  const userInfo = useSelector((state: State) => state.flicker.userInfo);
  React.useEffect(() => {
    dispatch(fetchAlbumDetails());
    dispatch(fetchPhotos());
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box width={"80%"}>
      <Box textAlign={"left"} margin="18px">
        <Typography fontSize="28px" fontWeight={"bold"}>
          {userInfo && userInfo.get("fullname")}
        </Typography>
      </Box>
      <div>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="My Album" {...a11yProps(0)} />
            <Tab label="Photos" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Album />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Photos />
        </TabPanel>
      </div>
    </Box>
  );
};
