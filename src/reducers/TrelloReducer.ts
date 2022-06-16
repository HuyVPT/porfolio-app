import { IState, ITrelloBar } from "@/models/trello";
import * as Service from "@/utils/project-page";
import { ADD_BAR, DELETE_CARD_BY_BARID, EDIT_BAR_ITEM, PUT_CARD, SET_LIST_BAR, SET_LIST_CARD } from "./constants";


export const initialState: IState = {
  listBar: Service.getListBar(),
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
        id: (Service.getLatestBarID() + 1).toString(),
        title: barTitle,
        items: []
      }
      const result = Service.putBar(newBar)
      return { ...prevState, listBar: result };
    }

    case EDIT_BAR_ITEM:
      const result = Service.putBar(payload)
      return { ...prevState, listBar: result };

    case PUT_CARD: {
      const result = Service.putCardItem(payload.barID, payload.dataItem)
      return { ...prevState, listBar: result };
    }

    case SET_LIST_CARD: {
      const result = Service.setBarItemsByBarID(payload.barID, payload.dataItems)
      return { ...prevState, listBar: result };
    }

    case DELETE_CARD_BY_BARID: {
      const result = Service.deleteCardByBarID(payload.barID, payload.cardID)
      return { ...prevState, listBar: result };
    }

    default:
      throw new Error("Invalid Action!");
  }
}


export default TrelloReducer;