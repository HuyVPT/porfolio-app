import { ITrelloBar, ITrelloItem } from "@/models/trello";
import { ADD_BAR, DELETE_CARD_BY_BARID, EDIT_BAR_ITEM, PUT_CARD, SET_LIST_BAR, SET_LIST_CARD } from "./constants";

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

export const setListCard = (payload: { barID: string, dataItems: ITrelloItem[] }): any => {
  return {
    type: SET_LIST_CARD,
    payload
  }
}

export const deleteCardByBarID = (payload: { barID: string, cardID: string }): any => {
  return {
    type: DELETE_CARD_BY_BARID,
    payload
  }
}