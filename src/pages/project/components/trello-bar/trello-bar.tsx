import { useContext, useRef, useState } from 'react';

// Component
import Icon from '@/components/icon/icon';
import InputField from '@/components/input-field/input-field';
import Modal from '@/components/modal/modal';
import TextAreaField from '@/components/textarea/text-area';
import InputFieldHiddenBorder from '@/components/input-field-hidden-border/input-field-hidden-border';

// Models
import { IDraggedItem, ITrelloBar, ITrelloItem } from '@/models/trello';

// Validators
import * as Validators from '@/validators';

// Service
import { TrelloContext } from '@/contexts/TrelloContext';
import { getLatestItemIDByBarID } from '@/utils/project-page';

// Style
import './trello-bar.scss';
import { deleteCardByBarID, editBarItem, putCard, setListCard } from '@/reducers/actions';

interface TrelloBarProps {
  data: ITrelloBar;
  draggedItem: IDraggedItem | null;
  setDraggedItem: (item: IDraggedItem | null) => void;
}
function TrelloBar({ data, draggedItem, setDraggedItem }: TrelloBarProps) {
  const { dispatch } = useContext(TrelloContext);
  const [barTitle] = useState(data.title);
  const [createModal, setCreateModal] = useState(false);
  const [cardTitle, setCardTitle] = useState('');
  const [cardDescription, setCardDescription] = useState('');
  const [selectedCard, setSelectedCard] = useState<ITrelloItem | null>();

  const barItemsRef = useRef<HTMLUListElement | null>(null);
  const barTitleRef = useRef<any>(null);
  const cardTitleRef = useRef<any>(null);
  const cardDescriptionRef = useRef<any>(null);

  const onDrop = (e: any, barID: string) => {
    if (!draggedItem) return;
    console.log('draggedItem.barID', draggedItem.barID);
    console.log('barID', barID);
    const dropIndex = getDropIndex(e.target as HTMLElement);
    if (draggedItem.barID === barID) {
      dragOnSameBar(dropIndex);
    } else {
      dragToOtherBar(barID, dropIndex);
    }
  };

  const getDropIndex = (dropAtItem: HTMLElement) => {
    let lastDropIndex: number = -1;
    const closestLi: HTMLLIElement = dropAtItem.closest('li') as HTMLLIElement;
    if (!closestLi) {
      return lastDropIndex;
    }
    (barItemsRef.current as HTMLElement).childNodes.forEach((item, index) => {
      if (item.contains(closestLi)) {
        lastDropIndex = index;
      }
    });
    return lastDropIndex;
  };

  const onSubmitHandler = () => {
    let cardItem: ITrelloItem | null = null;
    if (selectedCard) {
      cardItem = {
        ...selectedCard,
        header: cardTitleRef.current.getInputValue(),
        description: cardDescriptionRef.current.getInputValue(),
      };
    } else {
      cardItem = {
        id: (getLatestItemIDByBarID(data.id) + 1).toString(),
        barID: data.id,
        header: cardTitleRef.current.getInputValue(),
        description: cardDescriptionRef.current.getInputValue(),
      };
    }
    dispatch(putCard({ barID: data.id, dataItem: cardItem }));
    setCreateModal(false);
    resetFormModal();
  };

  const dragOnSameBar = (dropIndex: number) => {
    if (!draggedItem) return;
    const newArray: ITrelloItem[] = [...data.items];
    const orgIndex = data.items.findIndex((item) => item.id === draggedItem.data.id);
    if (orgIndex === dropIndex) return;
    newArray.splice(orgIndex, 1);
    if (orgIndex > dropIndex) {
      newArray.splice(dropIndex, 0, draggedItem.data);
    } else if (orgIndex < dropIndex) {
      if (dropIndex === 0) {
        newArray.unshift(draggedItem.data);
      } else {
        newArray.splice(dropIndex, 0, draggedItem.data);
      }
    }

    dispatch(setListCard({ barID: draggedItem.barID, dataItems: newArray }));
  };

  const dragToOtherBar = (otherBarID: string, dropIndex: number) => {
    if (!draggedItem) return;
    const draggedItemBarID: string = draggedItem.barID;
    if (!data.items.length) {
      dispatch(setListCard({ barID: otherBarID, dataItems: [draggedItem.data] }));
    } else {
      const newArray: ITrelloItem[] = [...data.items];
      newArray.splice(dropIndex, 0, draggedItem.data);
      dispatch(setListCard({ barID: otherBarID, dataItems: newArray }));
    }
    dispatch(deleteCardByBarID({ barID: draggedItemBarID, cardID: draggedItem.data.id }));
  };

  const doubleClickHandler = (card: ITrelloItem) => {
    setSelectedCard(card);
    setCardTitle(card.header);
    setCardDescription(card.description || '');
    setCreateModal(true);
  };

  const resetFormModal = () => {
    setSelectedCard(null);
    setCardTitle('');
    setCardDescription('');
  };

  return (
    <>
      <div className="trello-column">
        <div className="trello-bar">
          <div className="bar-title">
            <InputFieldHiddenBorder
              ref={barTitleRef}
              id="bar-title"
              className="bar-title-input"
              name="barTitle"
              value={barTitle}
              onChange={(titleValue) => dispatch(editBarItem({ ...data, title: titleValue }))}
            />
            <button className="btn-bar-menu" type="button">
              <span>...</span>
            </button>
          </div>
          <ul
            ref={barItemsRef}
            className="bar-items"
            onDrop={(e) => onDrop(e, data.id)}
            onDragOver={(e) => e.preventDefault()}
          >
            {data.items &&
              data.items.map((item: ITrelloItem, index: number) => (
                <li key={'bar-item-' + index}>
                  <div
                    className="item-content"
                    draggable="true"
                    onDragStart={(e) => {
                      setDraggedItem({ barID: data.id, el: e.currentTarget, data: item });
                    }}
                    onDragEnd={() => setDraggedItem(null)}
                    onDoubleClick={() => doubleClickHandler(item)}
                  >
                    <div className="item-header">{item.header}</div>
                    {item.description && <div className="item-description">{item.description}</div>}
                  </div>
                </li>
              ))}
            <li
              className="open-item-container"
              onClick={() => {
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
            onError={(e) => {}}
          />
          <TextAreaField
            ref={cardDescriptionRef}
            id="card-description"
            label="Description"
            name="cardDescription"
            value={cardDescription}
            required={false}
            formId="create-new-card-form"
            onError={(e) => {}}
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
