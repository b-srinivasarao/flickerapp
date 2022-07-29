/* eslint-disable react-hooks/exhaustive-deps */
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../types/redux";
import AddAlbum from "./AddAlbum";
import Loading from "./Loading";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { fetchAlbumPhotos } from "../reducer";

type PhotoProps = {
  open: boolean;
  handleClose: any;
  id: string;
  name: string;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "48%",
  bgcolor: "background.paper",
  border: "2px solid grey",
  boxShadow: 24,
  p: 4,
};
const ViewAlbumPhoto = ({ open, handleClose, id, name }: PhotoProps) => {
  const photos = useSelector((state: State) => state.flicker.albumPhotos) || [];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAlbumPhotos(id));
  }, []);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h1>{name}</h1>
        <Box
          display={"flex"}
          maxHeight={"500px"}
          overflow={"auto"}
          justifyContent="space-evenly"
          flexWrap={"wrap"}
        >
          {photos.map((photo, idx) => (
            <img
              key={photo.id + "" + idx}
              src={`${photo.url_o}`}
              srcSet={`${photo.url_o}`}
              alt=""
              loading="lazy"
              style={{ height: "200px", width: "300px" }}
            />
          ))}
        </Box>
      </Box>
    </Modal>
  );
};
const Album = () => {
  const { loading, albumsInfo } = useSelector((state: State) => state.flicker);
  const [open, setOpen] = useState("");
  const handleOpen = (idx: string) => {
    setOpen(idx);
    console.log(idx);
  };
  const handleClose = () => setOpen("");
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <AddAlbum />
      {albumsInfo?.length ? (
        <ImageList style={{ display: "flex", flexWrap: "wrap" }}>
          {albumsInfo?.map((album, idx) => {
            return (
              <div key={idx + album.id}>
                <ViewAlbumPhoto
                  open={open === album.id}
                  name={album.title}
                  id={album.id}
                  handleClose={handleClose}
                />
                <ImageListItem key={idx}>
                  <img
                    onClick={() => handleOpen(album.id)}
                    src={`${album.url}`}
                    srcSet={`${album.url}`}
                    alt=""
                    loading="lazy"
                    style={{ height: "200px", width: "300px" }}
                  />
                  <ImageListItemBar
                    title={album.title}
                    subtitle={`Photos: ${album.photos}`}
                  />
                </ImageListItem>
              </div>
            );
          })}
        </ImageList>
      ) : (
        <div>Create a new Album</div>
      )}
    </>
  );
};

export default Album;
