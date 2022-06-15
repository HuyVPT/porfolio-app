import { IState } from '@/models/trello';
import { TrelloReducer } from '@/reducers';
import { initialState } from '@/reducers/TrelloReducer';
import { createContext, useReducer } from 'react';

export const TrelloContext = createContext<any>(null);

function BookContextProvider(props: any) {
  const [state, dispatch] = useReducer(TrelloReducer, initialState);
  return (
    <TrelloContext.Provider value={{ state, dispatch } as { state: IState; dispatch: any }}>
      {props.children}
    </TrelloContext.Provider>
  );
}
export default BookContextProvider;
