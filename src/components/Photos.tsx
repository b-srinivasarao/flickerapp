import { Box } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../types/redux";
import { uploadImage } from "../reducer";
import { Link } from "react-router-dom";

const Photos = () => {
  const photos = useSelector((state: State) => state.flicker.photos);
  const dispatch = useDispatch();

  const pickImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const file: File = (target.files as FileList)[0];
    const url = URL.createObjectURL(file);
    console.log(url);
    dispatch(uploadImage(url));
  };
  return (
    <>
      <Box display={"flex"} justifyContent="end">
        <Tooltip title="Upload Photo">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <input hidden accept="image/*" type="file" onChange={pickImage} />
            <FileUploadIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      </Box>
      {
        <ImageList
          sx={{ width: "100%", display: "flex", flexWrap: "wrap" }}
          cols={4}
        >
          {photos?.map((item, idx) => (
            <ImageListItem key={item.id + idx} sx={{ width: 260 }}>
              <Link key={item.id} to={`/photos/${item.id}/eg45645hht`}>
                <img
                  style={{ height: "200px" }}
                  src={`${item.url_l}`}
                  srcSet={`${item.url_l}`}
                  alt=""
                  loading="lazy"
                />
              </Link>
            </ImageListItem>
          ))}
        </ImageList>
      }
    </>
  );
};

export default Photos;
