import { useRef } from "react";
import TrelloItem from "../../../../models/trello-item";
import "./trello-bar.scss";

interface TrelloBarProps {
  title: string;
  items: TrelloItem[];
  draggedItem: TrelloItem;
  setBarItems: (arr: TrelloItem[]) => void;
  setDraggedItem: (item: TrelloItem | null) => void;
}

function TrelloBar({
  title,
  items,
  setBarItems,
  draggedItem,
  setDraggedItem,
}: TrelloBarProps) {
  const barItemsRef = useRef<HTMLUListElement | null>(null);
  const onDrop = (e: any) => {
    console.log(e);
    const orgIndex = (items as any[]).findIndex(
      (item) => item.id === draggedItem.id
    );
    const closestLi: HTMLLIElement = (e.target as HTMLElement).closest(
      "li"
    ) as HTMLLIElement;
    const dropIndex = getDropIndex(closestLi);
    console.log("orgIndex", orgIndex);
    console.log("dropIndex", dropIndex);
    const newArray = [...items];
    orgIndex >= 0 && newArray.splice(orgIndex, 1);
    if (orgIndex >= 0) {
      newArray.splice(dropIndex, 0, draggedItem);
    } else {
    }
    setBarItems(newArray);
  };

  const getDropIndex = (dropAtItem: HTMLLIElement) => {
    let lastDropIndex: number = -1;
    if (!dropAtItem) {
      return lastDropIndex;
    }
    (barItemsRef.current as HTMLElement).childNodes.forEach((item, index) => {
      if (item.contains(dropAtItem)) {
        lastDropIndex = index;
      }
    });
    return lastDropIndex;
  };

  return (
    <div className="trello-column">
      <div className="trello-bar">
        <div className="bar-title">
          {title}
          <button className="btn-bar-menu" type="button">
            <span>...</span>
          </button>
        </div>
        <ul
          ref={barItemsRef}
          className="bar-items"
          onDrop={(e) => onDrop(e)}
          onDragOver={(e) => e.preventDefault()}
        >
          {items &&
            items.map((item: TrelloItem, index: number) => (
              <li key={"bar-item-" + index}>
                <div
                  className="item-content"
                  draggable="true"
                  onDragStart={() => setDraggedItem(item)}
                  onDragEnd={() => setDraggedItem(null)}
                >
                  <div className="item-header">{item.header + item.id}</div>
                  <div className="item-discription">{item.discription}</div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default TrelloBar;
