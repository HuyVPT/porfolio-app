export interface ITrelloItem {
  id: string;
  barID: string;
  header: string;
  description: string;
}
export interface ITrelloBar {
  id: string;
  title: string;
  items: ITrelloItem[];
}

export interface IState {
  listBar: ITrelloBar[],
  barItems: ITrelloItem[],
}

export interface IDraggedItem {
  barID: string;
  data: ITrelloItem;
  el: HTMLDivElement;
}