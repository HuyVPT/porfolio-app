import ThemeContext, { initialTheme } from "../../theme/theme";
import "./setting.scss";

function Setting() {
  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) => (
        <div className="setting-container">
          <p className="title">Setting</p>
          <div className="setting-content">
            <div className="setting-item">
              <input
                type="checkbox"
                name="theme"
                id="themechx"
                checked={theme.name === initialTheme.light.name}
                onChange={() => toggleTheme()}
                hidden
              />
              <label className="lbl" htmlFor="">
                Theme
              </label>
              <div className="input">
                <div className={"theme-checkbox-container"}>
                  <div className="theme-checkbox-start"></div>
                  <label
                    className={"switch-container " + theme.name}
                    htmlFor="themechx"
                  >
                    <div className="dot"></div>
                  </label>
                  <div className="theme-checkbox-body"></div>
                  <div className="theme-checkbox-end"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </ThemeContext.Consumer>
  );
}

export default Setting;
