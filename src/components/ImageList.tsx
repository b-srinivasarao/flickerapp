/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import CommentIcon from "@mui/icons-material/Comment";
import { Box, Skeleton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { fetchImages } from "../reducer";
import { State } from "../types/redux";
import { Link } from "react-router-dom";
import Loading from "./Loading";

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function QuiltedImageList() {
  const itemData = useSelector((state: State) => state.flicker.images);
  const loading = useSelector((state: State) => state.flicker.loading);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchImages("1"));
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!itemData || !itemData.photos?.photo?.length)
    return (
      <>
        <h1>no Data</h1>
      </>
    );
  return (
    <>
      <ImageList
        sx={{ width: "80%", height: "100%" }}
        variant="quilted"
        cols={matches ? 4 : 2}
        rowHeight={121}
      >
        {(loading ? Array.from(Array(50)) : itemData.photos.photo)?.map(
          (item, index) => (
            <ImageListItem
              key={item + index.toString()}
              cols={1}
              rows={1}
              className="containerImg"
            >
              {item ? (
                <Link key={item.id} to={`/photos/${item.id}/${item.secret}`}>
                  <img
                    {...srcset(item.url_w, 121)}
                    alt={item.title}
                    loading="lazy"
                  />{" "}
                </Link>
              ) : (
                <Skeleton variant="rectangular" width={265} height={121} />
              )}
              {item ? (
                <div className="middle flexCenter">
                  <div className="TitleDetails">
                    <p>{item.title}</p>
                    <p>{item.ownername}</p>
                  </div>
                  <div className="text">
                    <Box display={"flex"} alignItems="center" color={"#fff"}>
                      <StarBorderIcon htmlColor="#fff" />
                      <div>{item.count_faves}</div>
                    </Box>
                    <Box
                      display={"flex"}
                      alignItems="center"
                      color={"#fff"}
                      marginLeft="5px"
                    >
                      <CommentIcon htmlColor="#fff" />
                      <div>{item.count_comments}</div>
                    </Box>
                  </div>
                </div>
              ) : null}
            </ImageListItem>
          )
        )}
      </ImageList>
    </>
  );
}
