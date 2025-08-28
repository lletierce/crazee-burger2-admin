import type { DocumentData } from "firebase/firestore"

export const findObjectById = (id: number | string , array: DocumentData[]) => {
  return array.find((itemInArray) => itemInArray.id === id)
}