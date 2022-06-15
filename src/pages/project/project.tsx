import BookContextProvider from "@/contexts/TrelloContext";
import TrelloGrid from "./components/trello-grid/trello-grid";
import TrelloMenu from "./components/trello-menu/trello-menu";
import "./project.scss";

function Project() {
  return (
    <BookContextProvider>
      <TrelloGrid />
      <TrelloMenu />
    </BookContextProvider>
  );
}

export default Project;
