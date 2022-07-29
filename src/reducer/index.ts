import { createSlice } from "@reduxjs/toolkit";
import { AlbumMock, APhoto } from "../types/album";

export const counterSlice = createSlice({
  name: "flicker",
  initialState: {
    loading: false,
    images: [],
    page: 1,
    id: null,
    imageInfo: {},
    isLoggedIn: false,
    comments: [],
    photos: [] as APhoto[],
    albumsInfo: [] as AlbumMock,
  },
  reducers: {
    initLogin: (state) => {
      return { ...state };
    },
    loginCheck: (state, action) => {
      return { ...state };
    },
    fetchImages: (state, action) => {
      return { ...state, loading: true, page: action.payload };
    },
    onSuccessImages: (state, action) => {
      return { ...state, loading: false, images: action.payload };
    },
    fetchImage: (state, action) => {
      return { ...state, loading: true, id: action.payload };
    },
    onSuccessImage: (state, action) => {
      return {
        ...state,
        loading: false,
        imageInfo: action.payload.photo,
        comments: action.payload.comments,
      };
    },
    onLoginSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        userInfo: action.payload,
      };
    },
    onLogoutSuccess: (state) => {
      return { ...state, loading: false, isLoggedIn: false, userInfo: null };
    },
    fetchAlbumDetails: (state) => {
      return { ...state, loading: true };
    },
    onSuccessAlbumDetails: (state, action) => {
      return { ...state, loading: false, albumsInfo: action.payload };
    },
    fetchPhotos: (state) => {
      return { ...state, loading: true };
    },
    onSuccessPhotos: (state, action) => {
      return { ...state, loading: false, photos: action.payload };
    },
    uploadImage: (state, action) => {
      return { ...state, loading: false };
    },
    addAlbum: (state, action) => {
      return { ...state, loading: false };
    },
    fetchAlbumPhotos: (state, action) => {
      return { ...state };
    },
    onSuccessAlbumPhotos: (state, action) => {
      return { ...state, albumPhotos: action.payload };
    },
  },
});

export const {
  initLogin,
  fetchImages,
  onSuccessImages,
  fetchImage,
  onSuccessImage,
  onLoginSuccess,
  onLogoutSuccess,
  fetchAlbumDetails,
  onSuccessAlbumDetails,
  fetchPhotos,
  onSuccessPhotos,
  uploadImage,
  addAlbum,
  onSuccessAlbumPhotos,
  fetchAlbumPhotos,
  loginCheck,
} = counterSlice.actions;
export default counterSlice.reducer;
