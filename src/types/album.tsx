export interface Album {
  photosets: Photosets;
  stat: string;
}
export interface Photosets {
  cancreate: number;
  page: number;
  pages: number;
  perpage: number;
  total: number;
  photoset?: PhotosetEntity[] | null;
}
export interface PhotosetEntity {
  id: string;
  owner: string;
  username: string;
  primary: string;
  secret: string;
  server: string;
  farm: number;
  count_views: string;
  count_comments: string;
  count_photos: number;
  count_videos: number;
  title: TitleOrDescription;
  description: TitleOrDescription;
  can_comment: number;
  date_create: string;
  date_update: string;
  photos: number;
  videos: number;
  public_primary: string;
  coverphoto_server: string;
  coverphoto_farm: number;
  auto_upload: string;
  visibility_can_see_set: number;
  needs_interstitial: number;
  primary_photo_extras: PrimaryPhotoExtras;
  coverphoto_url: CoverphotoUrl;
  count_photos_public: number;
  count_photos_friend: number;
  count_photos_family: number;
  count_photos_all: number;
}
export interface TitleOrDescription {
  _content: string;
}
export interface PrimaryPhotoExtras {
  ownername: string;
  url_o: string;
}
export interface CoverphotoUrl {
  h: string;
  l: string;
  s: string;
  t: string;
}
export type AlbumPhoto = {
  url: string;
  author: string;
}[];
export type AlbumMock = {
  id: string;
  title: string;
  desc: string;
  photos: number;
  url: string;
}[];

export type APhoto = {
  id: string;
  secret: string;
  server: string;
  farm: number;
  title: string;
  isprimary: string;
  ispublic: number;
  isfriend: number;
  isfamily: number;
  url_o: string;
  height_o: number;
  width_o: number;
  url_l: string;
};
