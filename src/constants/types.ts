import {
  IAuthSlice,
  IPetsSlice,
  IFavouritePetsSlice,
  IUploadedPetsSlice,
  ISettingsSlice,
  IToastSlice,
  IApiSlice,
  IBreedsSlice,
} from "./interfaces";

export type IconType = {
  size: number;
  color: string;
};

export type PetType = {
  breeds: any;
  height: number;
  id: string;
  url: string;
  width: number;
  favourite?: {
    id: string;
  };
};

export type favouritePetType = {
  created_at: string;
  id: string;
  breeds: any;
  image: {
    id: string;
    url: string;
    image_id: string;
    sub_id: boolean;
    user_id: string;
    width: number;
    height: number;
  };
};

export type BreedType = {
  name: string;
};

export type BreedTypeFromBack = {
  id: string;
  name: string;
  species_id: string;
  life_span: string;
  temperament: string;
  origin: string;
  country_codes: string;
  country_code: string;
  description: string;
  bred_for: string | null;
  perfect_for: string | null;
  breed_group: string;
  history: string;
  reference_image_id: string;
  weight: {
    imperial: string;
    metric: string;
  };
  height: {
    imperial: string;
    metric: string;
  };
  image: {
    id: string;
    url: string;
    width: number;
    height: number;
  };
};

export type StoreState = IAuthSlice &
  IPetsSlice &
  IFavouritePetsSlice &
  IUploadedPetsSlice &
  ISettingsSlice &
  IToastSlice &
  IApiSlice &
  IBreedsSlice;
