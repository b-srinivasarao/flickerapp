import { call, put, takeLatest, all, select } from "redux-saga/effects";
import { FLICKER_API_KEY, FLICKER_API_SECRET } from "../constant";
import {
  fetchImage,
  fetchImages,
  onSuccessImage,
  onSuccessImages,
  fetchAlbumDetails,
  uploadImage,
  onSuccessAlbumDetails,
  fetchPhotos,
  onSuccessPhotos,
  onSuccessAlbumPhotos,
  fetchAlbumPhotos,
  initLogin,
  loginCheck,
  onLoginSuccess,
  addAlbum,
} from "../reducer";
import { Album, APhoto, PhotosetEntity } from "../types/album";
import { Explore, FlickerList, Photos } from "../types/flicker";
import { State } from "../types/redux";
import { formBaseString, formQueryString, setAuthVals, sign } from "../util";

const callApi = (page: string): Promise<FlickerList> => {
  return fetch(
    `https://api.flickr.com/services/rest?extras=can_comment%2Ccan_print%2Ccount_comments%2Ccount_faves%2Cdescription%2Cisfavorite%2Clicense%2Cmedia%2Cneeds_interstitial%2Cowner_name%2Cpath_alias%2Crealname%2Crotation%2Curl_sq%2Curl_q%2Curl_t%2Curl_s%2Curl_n%2Curl_w%2Curl_m%2Curl_z%2Curl_c%2Curl_l&per_page=50&page=${page}&method=flickr.interestingness.getList&csrf=&api_key=${FLICKER_API_KEY}&format=json&nojsoncallback=1`
  )
    .then((res) => res.json())
    .then((json) => {
      return json;
    });
};

const resolveImgeBlob = (blobUrl: string): Promise<Blob> => {
  return fetch(blobUrl).then((r) => r.blob());
};

const upload = (
  photoOptions: Record<string, any>,
  photo: Blob,
  accessToken: string,
  accessSecret: string
): Promise<string | void> => {
  if (photoOptions.title) {
    photoOptions.title = photoOptions.title
      .replace(/'/g, "%27")
      .replace(/"/g, "%22");
  }

  const flickrOptions = setAuthVals({
    api_key: FLICKER_API_KEY,
    secret: FLICKER_API_SECRET,
    access_token: accessToken,
    access_token_secret: accessSecret,
  });
  photoOptions.oauth_signature_method = "HMAC-SHA1";
  photoOptions.oauth_consumer_key = flickrOptions.api_key;
  photoOptions.oauth_token = flickrOptions.access_token;
  photoOptions.oauth_nonce = flickrOptions.oauth_nonce;
  photoOptions.oauth_timestamp = flickrOptions.oauth_timestamp;

  var url = "https://up.flickr.com/services/upload/";
  var queryString = formQueryString(photoOptions);
  var data = formBaseString("POST", url, queryString);
  photoOptions.oauth_signature = sign(
    data,
    flickrOptions.secret,
    flickrOptions.access_token_secret
  );

  photoOptions.photo = photo;

  if (photoOptions.tags) {
    photoOptions.tags = photoOptions.tags.replace(/%27/g, "'");
  }
  if (photoOptions.title) {
    photoOptions.title = photoOptions.title
      .replace(/%27/g, "'")
      .replace(/%22/g, '"');
  }

  var signature = "&oauth_signature=" + photoOptions.oauth_signature;
  var flickrURL = url + "?" + queryString + signature;

  const formData = new FormData();

  for (const name in photoOptions) {
    formData.append(name, photoOptions[name]);
  }

  return fetch(flickrURL, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((error) => console.log("error", error));
};
const createAlbum = (
  title: string,
  photoids: string
): Promise<string | void> => {
  var myHeaders = new Headers();

  var requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const options = setAuthVals({
    api_key: FLICKER_API_KEY,
    secret: FLICKER_API_SECRET,
    oauth_token: localStorage.getItem("token"),
    oauth_verifier: localStorage.getItem("verify"),
    oauth_token_secret: localStorage.getItem("secretToken"),
  });

  var queryArguments = {
    oauth_consumer_key: options.api_key,
    oauth_nonce: options.oauth_nonce,
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: options.oauth_timestamp,
    format: "json",
    nojsoncallback: 1,
    oauth_token: options.oauth_token,
    oauth_verifier: options.oauth_verifier,
    method: "flickr.photosets.create",
    title: title,
    primary_photo_id: photoids,
  };

  const url = "https://www.flickr.com/services/rest";
  var queryString = formQueryString(queryArguments);
  var data = formBaseString("GET", url, queryString);
  var signature = sign(data, options.secret, options.oauth_token_secret);
  var flickrURL = url + "?" + queryString + "&oauth_signature=" + signature;

  return fetch(flickrURL, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((error) => console.log("error", error));
};

const getTokenUser = (verify: string): Promise<string | void> => {
  var myHeaders = new Headers();

  var requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  localStorage.setItem("verify", verify);
  const options = setAuthVals({
    api_key: FLICKER_API_KEY,
    secret: FLICKER_API_SECRET,
    oauth_token: localStorage.getItem("token"),
    oauth_verifier: verify,
    oauth_token_secret: localStorage.getItem("secretToken"),
  });

  var queryArguments = {
    oauth_consumer_key: options.api_key,
    oauth_nonce: options.oauth_nonce,
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: options.oauth_timestamp,
    oauth_callback: "http://localhost:3000",
    oauth_token: options.oauth_token,
    oauth_verifier: options.oauth_verifier,
  };

  const url = "https://www.flickr.com/services/oauth/access_token";
  var queryString = formQueryString(queryArguments);
  var data = formBaseString("GET", url, queryString);
  var signature = sign(data, options.secret, options.oauth_token_secret);
  var flickrURL = url + "?" + queryString + "&oauth_signature=" + signature;

  return fetch(flickrURL, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      return result;
    })
    .catch((error) => console.log("error", error));
};

const loginApi = () => {
  var myHeaders = new Headers();

  var requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
  };

  const options = setAuthVals({
    api_key: FLICKER_API_KEY,
    secret: FLICKER_API_SECRET,
  });

  var queryArguments = {
    oauth_consumer_key: options.api_key,
    oauth_nonce: options.oauth_nonce,
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: options.oauth_timestamp,
    oauth_callback: "http://localhost:3000",
  };

  const url = "https://www.flickr.com/services/oauth/request_token";
  var queryString = formQueryString(queryArguments);
  var data = formBaseString("GET", url, queryString);
  var signature = sign(data, options.secret, options.oauth_token_secret);
  var flickrURL = url + "?" + queryString + "&oauth_signature=" + signature;

  fetch(flickrURL, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      const res = result.split("&");
      const token = res[1].split("=")[1];
      const secretToken = res[2].split("=")[1];
      localStorage.setItem("token", token);
      localStorage.setItem("secretToken", secretToken);
      window.open(
        `https://www.flickr.com/services/oauth/authorize?oauth_token=${token}`,
        "_blank"
      );
    })
    .catch((error) => console.log("error", error));
};
const callImageApi = (id: string): Promise<Photos> => {
  return fetch(
    `https://api.flickr.com/services/rest?datecreate=1&extras=sizes%2Cicon_urls%2Cignored%2Crev_ignored%2Crev_contacts%2Cvenue%2Cdatecreate%2Ccan_addmeta%2Ccan_comment%2Ccan_download%2Ccan_print%2Ccan_share%2Ccontact%2Ccount_comments%2Ccount_faves%2Ccount_views%2Cdate_taken%2Cdate_upload%2Cdescription%2Cicon_urls_deep%2Cisfavorite%2Cispro%2Clicense%2Cmedia%2Cneeds_interstitial%2Cowner_name%2Cowner_datecreate%2Cpath_alias%2Cperm_print%2Crealname%2Crotation%2Csafety_level%2Csecret_k%2Csecret_h%2Curl_sq%2Curl_q%2Curl_t%2Curl_s%2Curl_n%2Curl_w%2Curl_m%2Curl_z%2Curl_c%2Curl_l%2Curl_h%2Curl_k%2Curl_3k%2Curl_4k%2Curl_f%2Curl_5k%2Curl_6k%2Curl_o%2Cvisibility%2Cvisibility_source%2Co_dims%2Cpubliceditability%2Csystem_moderation%2Cstatic_maps&photo_id=${id}&static_map_zoom=3%2C6%2C14&static_map_width=245&static_map_height=100&viewerNSID=&method=flickr.photos.getInfo&csrf=&api_key=${FLICKER_API_KEY}&format=json&hermes=1&hermesClient=1&reqId=3ad917d3-2f9f-4164-90c6-70e4db553875&nojsoncallback=1`
  )
    .then((res) => res.json())
    .then((json) => {
      return json;
    });
};
const callCommentApi = (id: string): Promise<Photos> => {
  return fetch(
    `https://api.flickr.com/services/rest?photo_id=${id}&sort=date-posted-desc&extras=icon_urls&expand_bbml=1&use_text_for_links=1&secure_image_embeds=1&bbml_need_all_photo_sizes=1&primary_photo_longest_dimension=405&offset=0&limit=20&viewerNSID=&method=flickr.photos.comments.getList&csrf=&api_key=${FLICKER_API_KEY}&format=json&nojsoncallback=1`
  )
    .then((res) => res.json())
    .then((json) => {
      return json;
    });
};

const fetchAlbums = (userId: string): Promise<Album> => {
  return fetch(
    `https://www.flickr.com/services/rest?get_user_info=1&jump_to=&primary_photo_extras=url_o&user_id=${userId}&method=flickr.photosets.getList&csrf=1658835091%3A5enjyidx5m%3A736591fb88a0dede1329dbb3f09ccd40&api_key=${FLICKER_API_KEY}&format=json&hermes=1&hermesClient=1&nojsoncallback=1`
  )
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json?.photosets?.photoset;
    });
};

const fetchAlbumsPhoto = (id: string): Promise<APhoto[]> => {
  return fetch(
    `https://www.flickr.com/services/rest?photoset_id=${id}&extras=url_o&method=flickr.photosets.getPhotos&csrf=1658835091%3A5enjyidx5m%3A736591fb88a0dede1329dbb3f09ccd40&api_key=${FLICKER_API_KEY}&format=json&hermes=1&hermesClient=1&nojsoncallback=1`
  )
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json?.photoset?.photo;
    });
};

const fetchPhotosApi = (userId: string): Promise<APhoto> => {
  return fetch(
    `https://www.flickr.com/services/rest?extras=url_l&get_user_info=1&jump_to=&user_id=${userId}&view_as=use_pref&sort=use_pref&method=flickr.people.getPhotos&csrf=1658844848%3Awfh4890fpaj%3A79f83d23d3e8ebcafe5938145fd122dd&api_key=${FLICKER_API_KEY}&format=json&hermes=1&hermesClient=1&nojsoncallback=1`
  )
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json?.photos?.photo;
    });
};

function* fetchImagesSaga(action: Explore) {
  try {
    const user: FlickerList = yield call(callApi, action.payload);
    yield put(onSuccessImages(user));
  } catch (e) {
    console.log(e);
  }
}
function* fetchImageSaga(action: Explore) {
  try {
    const photo: Photos = yield call(callImageApi, action.payload);
    const comments: Photos = yield call(callCommentApi, action.payload);
    yield put(onSuccessImage({ photo: photo, comments: comments }));
  } catch (e) {
    console.log(e);
  }
}
function* fetchAlbumSaga(action: Explore) {
  try {
    const state: State = yield select((state: State) => state);
    const {
      flicker: { userInfo },
    } = state;
    const result: PhotosetEntity[] = yield call(
      fetchAlbums,
      userInfo.get("user_nsid")
    );
    const mapped = result?.map((r) => ({
      id: r.id,
      title: r.title._content,
      desc: r.description._content,
      photos: r.photos,
      url: r?.primary_photo_extras?.url_o,
    }));
    yield put(onSuccessAlbumDetails(mapped));
  } catch (e) {
    console.log(e);
  }
}

function* fetchAlbumphotoSaga(action: Explore) {
  try {
    const result: APhoto[] = yield call(fetchAlbumsPhoto, action.payload);
    yield put(onSuccessAlbumPhotos(result));
  } catch (e) {
    console.log(e);
  }
}
function* fetchPhotoSaga(action: Explore) {
  try {
    const state: State = yield select((state: State) => state);
    const {
      flicker: { userInfo },
    } = state;
    const result: APhoto[] = yield call(
      fetchPhotosApi,
      userInfo.get("user_nsid")
    );
    yield put(onSuccessPhotos(result));
  } catch (e) {
    console.log(e);
  }
}

function* loginSaga() {
  try {
    yield call(loginApi);
  } catch (e) {
    console.log(e);
  }
}

function* loginVerifySaga(action: any) {
  try {
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn) {
      const q = new URLSearchParams(loggedIn || "");
      yield put(onLoginSuccess(q));
      return;
    }
    const res: string = yield call(getTokenUser, action.payload);

    if (res && res.indexOf("oauth_problem") === -1) {
      localStorage.setItem("loggedIn", res);
      const q = new URLSearchParams(res);
      yield put(onLoginSuccess(q));
    }
  } catch (e) {
    console.log(e);
  }
}

function* addAlbumSaga(action: any) {
  try {
    const { name, photos, onCloseHandler } = action.payload;
    yield call(createAlbum, name, photos);

    yield put(fetchAlbumDetails());
    onCloseHandler();
  } catch (e) {
    console.log(e);
  }
}

function* uploadSaga(action: any) {
  try {
    const blobUrl = action.payload;

    const state: State = yield select((state: State) => state);
    const {
      flicker: { userInfo },
    } = state;
    const blob: Blob = yield call(resolveImgeBlob, blobUrl);
    yield call(
      upload,
      { title: "some" },
      blob,
      userInfo.get("oauth_token"),
      userInfo.get("oauth_token_secret")
    );
    yield put(fetchPhotos());
  } catch (e) {
    console.log(e);
  }
}
function* mySaga() {
  yield all([
    takeLatest(fetchImages.type, fetchImagesSaga),
    takeLatest(fetchImage.type, fetchImageSaga),
    takeLatest(fetchAlbumDetails.type, fetchAlbumSaga),
    takeLatest(fetchPhotos.type, fetchPhotoSaga),
    takeLatest(fetchAlbumPhotos.type, fetchAlbumphotoSaga),
    takeLatest(initLogin.type, loginSaga),
    takeLatest(loginCheck.type, loginVerifySaga),
    takeLatest(addAlbum.type, addAlbumSaga),
    takeLatest(uploadImage.type, uploadSaga),
  ]);
}

export default mySaga;
