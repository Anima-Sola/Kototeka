export type IconType = {
  size: number;
  color: string;
};

export type CatType = {
  breeds: any[];
  height: number;
  id: string;
  url: string;
  width: number;
};

export type favouriteCatType = {
  created_at: string,
  id: string,
  image: {
    id: string,
    url: string,
    image_id: string,
    sub_id: boolean,
    user_id: string,
  }
}
