import "./nav-bar.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ThemeContext from "../../theme/theme";
import Icon from "../icon/icon";
const activeColor: { [key: string]: string } = {
  home: "#f44336",
  profile: "#ffa117",
  contact: "#0fc70f",
  photo: "#2196f3",
  setting: "#b145e9",
};
const navBarProvider = [
  {
    id: 0,
    icon: <Icon type="fas" name="house" />,
    isActive: true,
    activeColor: activeColor.home,
    path: "/home",
    label: "Home",
  },
  {
    id: 1,
    icon: <Icon type="fas" name="user" />,
    isActive: false,
    activeColor: activeColor.profile,
    path: "/profile",
    label: "Profile",
  },
  {
    id: 2,
    icon: <Icon type="fas" name="database" />,
    isActive: false,
    activeColor: activeColor.contact,
    path: "project",
    label: "Project",
  },
  {
    id: 3,
    icon: <Icon type="fas" name="camera-retro" />,
    isActive: false,
    activeColor: activeColor.photo,
    path: "photo",
    label: "Photo",
  },
  {
    id: 4,
    icon: <Icon type="fas" name="gear" />,
    isActive: false,
    activeColor: activeColor.setting,
    path: "setting",
    label: "Setting",
  },
];
function FitNavBar() {
  const [activeItem, setActiveItem] = useState(navBarProvider[0]);

  useEffect(() => {
    const currentUrl: string = window.location.pathname;
    const itemWithUrl = navBarProvider.find((item) =>
      currentUrl.includes(item.path)
    );
    setActiveItem(itemWithUrl || navBarProvider[0]);
  }, []);

  useEffect(() => {
    if (!activeItem) return;
    document.documentElement.style.setProperty(
      "--nav-active-clr",
      activeItem.activeColor
    );
    document.documentElement.style.setProperty(
      "--indicator-pos",
      `${activeItem.id * 70}px`
    );
  }, [activeItem]);

  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) => (
        <div className={"nav-bar-container " + theme.name}>
          <ul className="nav-bar">
            {navBarProvider &&
              navBarProvider.map((item) => (
                <li
                  key={item.id}
                  className={
                    "nav-bar-item " +
                    (activeItem && item.id === activeItem.id ? "active" : "")
                  }
                  onClick={() => setActiveItem(item)}
                >
                  <Link to={item.path}>
                    <span className="icon">{item.icon}</span>
                    <span className="label">{item.label}</span>
                  </Link>
                </li>
              ))}
            <div className="indicator"></div>
          </ul>
        </div>
      )}
    </ThemeContext.Consumer>
  );
}

export default FitNavBar;
