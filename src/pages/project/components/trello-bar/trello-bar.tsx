import { useRef, useState } from "react";
import Icon from "../../../../components/icon/icon";
import InputField from "../../../../components/input-field/input-field";
import Modal from "../../../../components/modal/modal";
import TextAreaField from "../../../../components/textarea/text-area";
import { ITrelloBar, ITrelloItem } from "../../../../models/trello";
import * as Validators from "../../../../validators";
import "./trello-bar.scss";

interface TrelloBarProps {
  data: ITrelloBar;
  draggedItem: ITrelloItem;
  setDraggedItem: (item: ITrelloItem | null) => void;
}
function TrelloBar({ data, draggedItem, setDraggedItem }: TrelloBarProps) {
  const [cardList, setCardList] = useState<ITrelloItem[]>(data.items);
  const [createModal, setCreateModal] = useState(false);
  const [cardTitle] = useState("");
  const [cardDiscription] = useState("");

  const barItemsRef = useRef<HTMLUListElement | null>(null);
  const cardTitleRef = useRef<any>(null);
  const cardDiscriptionRef = useRef<any>(null);

  const onDrop = (e: any) => {
    console.log(e);
    const orgIndex = cardList.findIndex((item) => item.id === draggedItem.id);
    const closestLi: HTMLLIElement = (e.target as HTMLElement).closest(
      "li"
    ) as HTMLLIElement;
    const dropIndex = getDropIndex(closestLi);
    console.log("orgIndex", orgIndex);
    console.log("dropIndex", dropIndex);
    const newArray = [...cardList];
    orgIndex >= 0 && newArray.splice(orgIndex, 1);
    if (orgIndex >= 0) {
      newArray.splice(dropIndex, 0, draggedItem);
    } else {
    }
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

  const onSubmitHandler = () => {
    const newCard: ITrelloItem = {
      id: getLastestItemID(cardList),
      header: cardTitleRef.current.getInputValue(),
      discription: cardDiscriptionRef.current.getInputValue(),
    };
    setCardList([...cardList, newCard]);
    setCreateModal(false);
  };

  const getLastestItemID = (list: ITrelloItem[]): string => {
    if (!list.length) return "1";
    list.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
    return (parseFloat(list[list.length].id) + 1).toString();
  };
  return (
    <>
      <div className="trello-column">
        <div className="trello-bar">
          <div className="bar-title">
            {data.title}
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
            {cardList &&
              cardList.map((item: ITrelloItem, index: number) => (
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
        <form id="create-new-card-form">
          <InputField
            ref={cardTitleRef}
            id="card-title"
            label="Title"
            name="cardTitle"
            value={cardTitle}
            formId="create-new-card-form"
            required={true}
            validate={Validators.required}
            onError={(e) => {
              console.log(e);
            }}
          />
          <TextAreaField
            ref={cardDiscriptionRef}
            id="card-discription"
            label="Discription"
            name="cardDiscription"
            value={cardDiscription}
            required={false}
            formId="create-new-card-form"
            onError={(e) => {
              console.log(e);
            }}
          />
          <div className="btn-group">
            <button type="button" onClick={() => setCreateModal(false)}>
              Cancel
            </button>
            <button
              type="button"
              disabled={cardTitleRef.current && cardTitleRef.current.isValid()}
              onClick={onSubmitHandler}
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
