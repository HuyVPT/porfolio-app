import { useRef, useState } from "react";
import Icon from "../../../../components/icon/icon";
import InputField from "../../../../components/input-field/input-field";
import Modal from "../../../../components/modal/modal";
import TextAreaField from "../../../../components/textarea/text-area";
import TrelloItem from "../../../../models/trello-item";
import * as Validators from "../../../../validators";
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
  const [createModal, setCreateModal] = useState(false);
  const [cardTitle, setCardTitle] = useState("");

  const barItemsRef = useRef<HTMLUListElement | null>(null);
  const cardTitleRef = useRef<any>(null);

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

  const onSubmitHandler = () => {};

  return (
    <>
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
            <li
              className="open-item-container"
              onClick={() => {
                console.log("setCreateModal(true)");
                setCreateModal(true);
              }}
            >
              <div className="open-item">
                <Icon type="fas" name="plus" /> New card
              </div>
            </li>
          </ul>
        </div>
      </div>
      <Modal
        header="Create Card"
        display={createModal}
        onClose={() => {
          setCreateModal(false);
        }}
      >
        <form id="create-new-card-form" onSubmit={onSubmitHandler}>
          <InputField
            ref={cardTitleRef}
            id="card-title"
            label="Title"
            name="cardTitle"
            value={cardTitle}
            formId="create-new-card-form"
            required={true}
            validate={Validators.required}
            onChange={(e) => setCardTitle(e)}
            onError={(e) => {
              console.log(e);
            }}
          />
          <TextAreaField
            id="card-discription"
            label="Discription"
            name="cardDiscription"
            value=""
            required={true}
            formId="create-new-card-form"
            onChange={(e) => {
              console.log(e);
            }}
            onError={(e) => {
              console.log(e);
            }}
          />
          <div className="btn-group">
            <button>Cancel</button>
            <button
              disabled={cardTitleRef.current && cardTitleRef.current.inValid}
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default TrelloBar;
