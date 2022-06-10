import { useEffect, useRef, useState } from "react";
import Icon from "../../../../components/icon/icon";
import InputField from "../../../../components/input-field/input-field";
import { ITrelloBar, ITrelloItem } from "../../../../models/trello";
import TrelloBar from "../trello-bar/trello-bar";
import "./trello-grid.scss";

function TrelloGrid() {
  const [listBar, setListBar] = useState<ITrelloBar[]>([]);
  const [newBar, setNewBar] = useState<boolean>(false);
  const [draggedItem, setDraggedItem] = useState<ITrelloItem | null>(null);

  const barTitleRef = useRef<any>(null);

  useEffect(() => {
    const listBar: ITrelloBar[] = JSON.parse(
      localStorage.getItem("LIST_BAR") || "[]"
    );
    setListBar(listBar);
  }, []);
  useEffect(() => {
    barTitleRef.current.reset();
  }, [newBar]);

  const createNewBarHanlder = () => {
    const listBar: ITrelloBar[] = JSON.parse(
      localStorage.getItem("LIST_BAR") || "[]"
    );
    const newBar: ITrelloBar = {
      id: getLastestBarID(listBar),
      title: barTitleRef.current.getInputValue(),
      items: [],
    };
    localStorage.setItem("LIST_BAR", JSON.stringify([...listBar, newBar]));
    setListBar([...listBar, newBar]);
    setNewBar(false);
  };

  const getLastestBarID = (listBar: ITrelloBar[]): string => {
    if (!listBar.length) return "1";
    listBar.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
    return (parseFloat(listBar[listBar.length - 1].id) + 1).toString();
  };
  return (
    <>
      <div className="trello-grid-container">
        {listBar &&
          listBar.map((bar, index) => (
            <TrelloBar
              key={`trelloBar${index}`}
              data={bar}
              draggedItem={draggedItem as ITrelloItem}
              setDraggedItem={(item: ITrelloItem | null) =>
                setDraggedItem(item)
              }
            />
          ))}

        <div className="trello-column">
          <div className="new-bar">
            <div
              className="placeholder"
              style={{ display: newBar ? "none" : "block" }}
              onClick={() => {
                setNewBar(true);
                barTitleRef.current.focus();
              }}
            >
              <Icon type="fas" name="plus" /> New bar
            </div>
            <form id="new-bar-form">
              <div
                className="new-bar-form"
                style={{ display: newBar ? "flex" : "none" }}
              >
                <InputField
                  ref={barTitleRef}
                  className="bar-title-txt"
                  id="bar-title"
                  name="barTitle"
                  value=""
                  formId="new-bar-form"
                  placeholder="Input bar title..."
                />
                <div id="new-bar-btns">
                  <button
                    className="btn-add-bar"
                    type="button"
                    onClick={createNewBarHanlder}
                  >
                    Add Bar
                  </button>
                  <button
                    className="btn-cancel"
                    type="button"
                    onClick={() => setNewBar(false)}
                  >
                    <Icon type="fas" name="xmark" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default TrelloGrid;
