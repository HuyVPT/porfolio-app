import { useState } from "react";
import TrelloItem from "../../../../models/trello-item";
import TrelloBar from "../trello-bar/trello-bar";
import "./trello-grid.scss";

const barItems: TrelloItem[] = [
  {
    id: "1",
    header: "Title",
    discription:
      "item discription, item discription, item discription, item discription, item discription, item discription,",
  },
  {
    id: "2",
    header: "Title",
    discription:
      "item discription, item discription, item discription, item discription, item discription, item discription,",
  },
  {
    id: "3",
    header: "Title",
    discription:
      "item discription, item discription, item discription, item discription, item discription, item discription,",
  },
  {
    id: "4",
    header: "Title",
    discription:
      "item discription, item discription, item discription, item discription, item discription, item discription,",
  },
  {
    id: "5",
    header: "Title",
    discription:
      "item discription, item discription, item discription, item discription, item discription, item discription,",
  },
];

function TrelloGrid() {
  const [items, setItems] = useState(barItems);
  const [draggedItem, setDraggedItem] = useState<TrelloItem | null>(null);

  return (
    <>
      <div className="trello-grid-container">
        <TrelloBar
          title="Todo"
          items={items}
          draggedItem={draggedItem as TrelloItem}
          setBarItems={setItems}
          setDraggedItem={(item: TrelloItem | null) => setDraggedItem(item)}
        />
      </div>
    </>
  );
}

export default TrelloGrid;
