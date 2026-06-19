export type IconType = {
  size: number;
  color: string;
};

export type PetType = {
  breeds: any[];
  height: number;
  id: string;
  url: string;
  width: number;
  favourite?: {
    id: string;
  }
};

export type favouritePetType = {
  created_at: string,
  id: string,
  breeds: any;
  image: {
    id: string,
    url: string,
    image_id: string,
    sub_id: boolean,
    user_id: string,
  }
}
