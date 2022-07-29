import Box from "@mui/material/Box";
import { MyPage } from "../components/MyPage";

const MyAccount = () => {
  return (
    <Box
      display={"flex"}
      flexDirection="column"
      alignItems="center"
      width={"100%"}
    >
      <MyPage />
    </Box>
  );
};

export default MyAccount;
