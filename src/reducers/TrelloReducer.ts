import { IState, ITrelloBar } from "@/models/trello";
import { getLatestBarID, getListBar, putBar, putCardItem } from "@/utils/project-page";
import { ADD_BAR, EDIT_BAR_ITEM, PUT_CARD, SET_LIST_BAR } from "./constants";


export const initialState: IState = {
  listBar: getListBar(),
  barItems: [],
}

const TrelloReducer = (prevState: IState, action: { type: string, payload: any }): IState => {
  const payload = action.payload;
  switch (action.type) {

    case SET_LIST_BAR:
      return {
        ...prevState, listBar: payload
      }

    case ADD_BAR: {
      const barTitle: string = payload;
      const newBar: ITrelloBar = {
        id: (getLatestBarID() + 1).toString(),
        title: barTitle,
        items: []
      }
      const result = putBar(newBar)
      return { ...prevState, listBar: result };
    }

    case EDIT_BAR_ITEM:
      const result = putBar(payload)
      return { ...prevState, listBar: result };

    case PUT_CARD: {
      const result = putCardItem(payload.barID, payload.dataItem)
      return { ...prevState, listBar: result };
    }

    default:
      throw new Error("Invalid Action!");
  }
}


export default TrelloReducer;