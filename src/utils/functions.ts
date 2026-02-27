import { favouriteCatType } from "../constants/types";

export const isElementInArray = (
  element: string,
  array: Array<favouriteCatType>,
): favouriteCatType | undefined => {
  return array.find((item) => element === item.image.id);
};
