import { useState } from "react";
import TrelloBar from "../trello-bar/trello-bar";
import "./trello-grid.scss";

const barItems = [
  {
    id: 1,
    header: "Title",
    discription:
      "item discription, item discription, item discription, item discription, item discription, item discription,",
  },
  {
    id: 2,
    header: "Title",
    discription:
      "item discription, item discription, item discription, item discription, item discription, item discription,",
  },
  {
    id: 3,
    header: "Title",
    discription:
      "item discription, item discription, item discription, item discription, item discription, item discription,",
  },
  {
    id: 4,
    header: "Title",
    discription:
      "item discription, item discription, item discription, item discription, item discription, item discription,",
  },
  {
    id: 5,
    header: "Title",
    discription:
      "item discription, item discription, item discription, item discription, item discription, item discription,",
  },
];
const doingItems = [
  {
    id: 6,
    header: "Title",
    discription:
      "item discription, item discription, item discription, item discription, item discription, item discription,",
  },
  {
    id: 7,
    header: "Title",
    discription:
      "item discription, item discription, item discription, item discription, item discription, item discription,",
  },
  {
    id: 8,
    header: "Title",
    discription:
      "item discription, item discription, item discription, item discription, item discription, item discription,",
  },
  {
    id: 9,
    header: "Title",
    discription:
      "item discription, item discription, item discription, item discription, item discription, item discription,",
  },
  {
    id: 10,
    header: "Title",
    discription:
      "item discription, item discription, item discription, item discription, item discription, item discription,",
  },
];

function TrelloGrid() {
  const [items, setItems] = useState(barItems);
  const [draggedItem, setDraggedItem] = useState(null);

  return (
    <>
      <div className="trello-grid-container">
        <TrelloBar
          title="Todo"
          items={items}
          draggedItem={draggedItem}
          setBarItems={setItems}
          setDraggedItem={(item) => setDraggedItem(item)}
        />
        {/* <TrelloBar
          title="Doing"
          items={item1s}
          draggedItem={draggedItem}
          setBarItems={setItem1s}
          setDraggedItem={(item) => setDraggedItem(item)}
        /> */}
      </div>
    </>
  );
}

export default TrelloGrid;
