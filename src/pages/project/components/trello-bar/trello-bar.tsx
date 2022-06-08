import { useRef, useState } from "react";
import "./trello-bar.scss";

function TrelloBar({ title, items, setBarItems, draggedItem, setDraggedItem }) {
  const barItemsRef = useRef();
  const onDrop = ({ target }) => {
    const orgIndex = (items as any[]).findIndex(
      (item) => item.id === draggedItem.id
    );
    const dropIndex = getDropIndex((target as HTMLElement).closest("li"));
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

  const getDropIndex = (dropAtItem: HTMLElement) => {
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
          <button className="btn-bar-menu" type="button"><span>...</span></button>
        </div>
        <ul
          ref={barItemsRef}
          className="bar-items"
          onDrop={(e) => onDrop(e)}
          onDragOver={(e) => e.preventDefault()}
        >
          {items &&
            items.map((item: any, index: number) => (
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
