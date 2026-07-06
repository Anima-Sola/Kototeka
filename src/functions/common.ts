import { favouritePetType } from "../constants/types";

export const isElementInArray = (
  element: string,
  array: Array<favouritePetType>,
): favouritePetType | undefined => {
  return array.find((item) => element === item.image.id);
};


