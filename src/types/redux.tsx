import { Album, AlbumMock, APhoto } from "./album";
import { FlickerList } from "./flicker";

export type Photo = {
  url: string;
}[];
export type State = {
  flicker: {
    loading: boolean;
    images: FlickerList;
    imageInfo: any;
    isLoggedIn: boolean;
    comments: any;
    albumsInfo: AlbumMock | undefined;
    photos: APhoto[];
    albumPhotos: APhoto[];
    userInfo: any;
  };
};
