import { useState } from "react";
import "./trello-menu.scss";

function TrelloMenu() {
  const [menuState, setMenuState] = useState(false);
  return (
    <>
      <button
        type="button"
        className={"btn toggle-btn " + (menuState && "toggled")}
        onClick={() => setMenuState(!menuState)}
      >
        <span className="icon-wrapper">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>
      <div className={"trello-menu-container " + (menuState && "opened")}></div>
    </>
  );
}

export default TrelloMenu;
