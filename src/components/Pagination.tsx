import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../types/redux";
import { fetchImages } from "../reducer";

const PaginationOutlined = () => {
  const itemData = useSelector((state: State) => state.flicker.images);
  const dispatch = useDispatch();
  if (!itemData?.photos?.photo?.length) return <></>;

  const goToPage = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(fetchImages(value));
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={itemData?.photos?.pages}
        page={itemData.photos.page}
        variant="outlined"
        onChange={goToPage}
      />
    </Stack>
  );
};

export default PaginationOutlined;
