export interface FlickerList {
  photos: Photos;
  extra: Extra;
  stat: string;
}
export interface Photos {
  page: number;
  pages: number;
  perpage: number;
  total: number;
  photo?: PhotoEntity[] | null;
}
export interface PhotoEntity {
  id: string;
  owner: string;
  secret: string;
  server: string;
  farm: number;
  title: string;
  ispublic: number;
  isfriend: number;
  isfamily: number;
  license: string;
  needs_interstitial: number;
  description: Description;
  rotation: number;
  ownername: string;
  count_faves: string;
  count_comments: string;
  can_comment: number;
  permissions: Permissions;
  can_print: number;
  media: string;
  media_status: string;
  url_sq: string;
  height_sq: number;
  width_sq: number;
  url_q: string;
  height_q: number;
  width_q: number;
  url_t: string;
  height_t: number;
  width_t: number;
  url_s: string;
  height_s: number;
  width_s: number;
  url_n: string;
  height_n: number;
  width_n: number;
  url_w: string;
  height_w: number;
  width_w: number;
  url_m: string;
  height_m: number;
  width_m: number;
  url_z: string;
  height_z: number;
  width_z: number;
  url_c: string;
  height_c: number;
  width_c: number;
  url_l?: string;
  height_l?: number | null;
  width_l?: number | null;
  pathalias?: string | null;
  realname?: string | null;
}
export interface Description {
  _content: string;
}
export interface Permissions {
  permcomment: number;
  permprint: number;
}
export interface Extra {
  explore_date: string;
  next_prelude_interval: number;
}
export type Explore = {
  type: string;
  payload: string;
};
export interface ImageDetails {
  id: string;
  secret: string;
  server: string;
  farm: number;
  dateuploaded: string;
  isfavorite: number;
  license: string;
  safety_level: string;
  rotation: number;
  nsid: string;
  username: string;
  realname: string;
  location: string;
  iconserver: string;
  iconfarm: number;
  path_alias: string;
  noindexfollow: number;

  iconurls: {
    retina: string;
    large: string;
    medium: string;
    small: string;
    default: string;
  };
}
