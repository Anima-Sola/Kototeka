import { favouriteCatType } from "../constants/types"

export const isElementInArray = (element: string, array: Array<favouriteCatType>): boolean => {
    return array.find(item => element === item.image.id) !== undefined;
}