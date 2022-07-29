/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchImage } from "../reducer";
import { State } from "../types/redux";
import { useParams } from "react-router-dom";
import Comment from "./Comment";
import Loading from "./Loading";
export default function ImageInfo() {
  const itemData = useSelector((state: State) => state.flicker.imageInfo).photo;
  const loading = useSelector((state: State) => state.flicker.loading);
  const params = useParams();
  const dispatch = useDispatch();
  const id = params.id;
  useEffect(() => {
    dispatch(fetchImage(id));
  }, []);
  if (loading) return <Loading />;
  if (!itemData || !Object.keys(itemData).length)
    return (
      <>
        <h1>no Data</h1>
      </>
    );
  return (
    <>
      <section className="slider">
        <div className="slide active">
          <img
            src={itemData?.sizes.size[itemData?.sizes.size.length - 1].source}
            alt="travel"
            className="image"
          />
        </div>
      </section>
      <section>
        <div className="user">
          <div className="userdetails">
            <div className="profile">
              <img
                src={itemData.owner.iconurls.retina}
                height={40}
                width={40}
                className="profile_img"
                alt=""
              />
            </div>
            <div className="user_title">
              <div>{itemData.owner.username}</div>
              <div>{itemData.title._content}</div>
              <div className="description">{itemData.description._content}</div>
            </div>
          </div>
          <Comment />
        </div>
      </section>
    </>
  );
}
