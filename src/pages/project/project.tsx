import TrelloGrid from "./components/trello-grid/trello-grid";
import TrelloMenu from "./components/trello-menu/trello-menu";
import "./project.scss";

function Project() {
  return (
    <>
      <TrelloGrid />
      <TrelloMenu />
    </>
  );
}

export default Project;
