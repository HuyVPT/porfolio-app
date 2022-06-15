import { ITrelloBar, ITrelloItem } from "@/models/trello";
import { ADD_BAR, EDIT_BAR_ITEM, PUT_CARD, SET_LIST_BAR } from "./constants";

// Trello Bar
export const setListBar = (payload: ITrelloBar[]): any => {
  return {
    type: SET_LIST_BAR,
    payload
  }
}
export const addBar = (payload: string): any => {
  return {
    type: ADD_BAR,
    payload
  }
}
export const editBarItem = (payload: ITrelloBar): any => {
  return {
    type: EDIT_BAR_ITEM,
    payload
  }
}

// Trello Card
export const putCard = (payload: { barID: string, dataItem: ITrelloItem }): any => {
  return {
    type: PUT_CARD,
    payload
  }
}