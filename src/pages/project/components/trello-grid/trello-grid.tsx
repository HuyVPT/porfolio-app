import { useContext, useRef, useState } from 'react';

// Component
import Icon from '@/components/icon/icon';
import InputField from '@/components/input-field/input-field';
import TrelloBar from '../trello-bar/trello-bar';

// Context Reducer
import { TrelloContext } from '@/contexts/TrelloContext';
import { addBar } from '@/reducers/actions';
// Models
import { IState, ITrelloItem } from '@/models/trello';
// Style
import './trello-grid.scss';

function TrelloGrid() {
  const { state, dispatch } = useContext<{ state: IState; dispatch: any }>(TrelloContext);
  const [newBar, setNewBar] = useState<boolean>(false);
  const [draggedItem, setDraggedItem] = useState<{ barID: string; data: ITrelloItem; el: HTMLDivElement } | null>(null);

  const barTitleRef = useRef<any>(null);

  const createNewBarHanlder = () => {
    dispatch(addBar(barTitleRef.current.getInputValue()));
    setNewBar(false);
  };
  return (
    <>
      <div className="trello-grid-container">
        {state.listBar &&
          state.listBar.map((bar, index) => (
            <TrelloBar
              key={`trelloBar${index}`}
              data={bar}
              draggedItem={draggedItem}
              setDraggedItem={(e) => setDraggedItem(e)}
            />
          ))}
        <div className="trello-column">
          <div className="new-bar">
            <div
              className="placeholder"
              style={{ display: newBar ? 'none' : 'block' }}
              onClick={() => {
                setNewBar(true);
                barTitleRef.current.focus();
              }}
            >
              <Icon type="fas" name="plus" /> New bar
            </div>
            <form id="new-bar-form">
              <div className="new-bar-form" style={{ display: newBar ? 'flex' : 'none' }}>
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
                  <button className="btn-add-bar" type="button" onClick={createNewBarHanlder}>
                    Add Bar
                  </button>
                  <button className="btn-cancel" type="button" onClick={() => setNewBar(false)}>
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
