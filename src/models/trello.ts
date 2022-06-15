export interface ITrelloItem {
  id: string;
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