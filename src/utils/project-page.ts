import { ITrelloBar, ITrelloItem } from "@/models/trello";

// Trello Bar
export const getListBar = (): ITrelloBar[] => {
  return JSON.parse(localStorage.getItem('LIST_BAR') || '[]');
};

export const setListBarData = (listBar: ITrelloBar[]) => {
  return localStorage.setItem('LIST_BAR', JSON.stringify([...listBar]));
};

export const getLatestBarID = (): number => {
  const listBar: ITrelloBar[] = getListBar();
  if (!listBar.length) return 0;
  listBar.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
  return (parseFloat(listBar[listBar.length - 1].id));
};

export const getBarByID = (id: string): ITrelloBar | undefined => {
  const listBar: ITrelloBar[] = getListBar();
  if (!listBar.length) return;
  return listBar.find((bar) => bar.id === id);
};

export const putBar = (bar: ITrelloBar): ITrelloBar[] => {
  let listBar: ITrelloBar[] = getListBar();
  const isBarExisted: boolean = listBar.some(item => bar.id === item.id);
  if (isBarExisted) {
    listBar = listBar.map(item => {
      if (item.id === bar.id) {
        return bar;
      }
      return item;
    })
  } else {
    listBar.push(bar);
  }

  setListBarData(listBar);
  return [...listBar];
};
// Trello Bar Item
export const getLatestItemIDByBarID = (barID: string): number => {
  const bar = getListBar().find(bar => bar.id === barID);
  if (!bar) throw new Error("Bar is not exist!");
  const items = bar.items;
  if (!items.length) return 0;
  items.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
  return (parseFloat(items[items.length - 1].id));
};

export const putCardItem = (barID: string, card: ITrelloItem): ITrelloBar[] => {
  let bar: ITrelloBar = getBarByID(barID) as ITrelloBar;
  if (!bar) throw new Error("Bar is not exist!");
  let barCards: ITrelloItem[] = bar.items;
  const isCardExisted: boolean = barCards.some(item => card.id === item.id);
  if (isCardExisted) {
    barCards = barCards.map(item => {
      if (item.id === card.id) {
        return card;
      }
      return item;
    })
  } else {
    barCards.push(card);
  }
  const result = putBar({ ...bar, items: [...barCards] });
  return [...result];
};

export const setBarItemsByBarID = (barID: string, cards: ITrelloItem[]): ITrelloBar[] => {
  let bar: ITrelloBar = getBarByID(barID) as ITrelloBar;
  if (!bar) throw new Error("Bar is not exist!");
  let barCards: ITrelloItem[] = cards;
  const result = putBar({ ...bar, items: [...barCards] });
  return [...result];
};

export const deleteCardByBarID = (barID: string, cardID: string): ITrelloBar[] => {
  let bar: ITrelloBar = getBarByID(barID) as ITrelloBar;
  if (!bar) throw new Error("Bar is not exist!");
  const barCards = bar.items.filter(card => card.id !== cardID)
  const result = putBar({ ...bar, items: [...barCards] });
  return [...result];
};