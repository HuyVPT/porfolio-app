export interface ITrelloItem {
  id: string;
  header: string;
  discription: string;
}
export interface ITrelloBar {
  id: string;
  title: string;
  items: ITrelloItem[];
}