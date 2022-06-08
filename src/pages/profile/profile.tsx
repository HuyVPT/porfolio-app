import { useEffect, useRef, useState } from "react";
import { PersonOutline, Location, Call, Mail, Earth } from "react-ionicons";
import "./profile.scss";

const contactInfo = [
  {
    title: "address",
    icon: <Location title="address" />,
    text: "00 Street District State",
  },
  {
    title: "Phone",
    icon: <Call title="Phone" />,
    text: "(+xx)xx xxxx xxx",
  },
  {
    title: "Mail",
    icon: <Mail title="Mail" />,
    text: "your-email@example.com",
  },
  {
    title: "Earth",
    icon: <Earth title="Earth" />,
    text: "https//:yourwebsite.com.vn",
  },
];

function Profile() {
  const [avatarSrc] = useState("");
  const avatarRef = useRef();
  useEffect(() => {
    (
      avatarRef.current as HTMLElement
    ).style.backgroundImage = `url(${avatarSrc})`;
  }, [avatarSrc]);
  return (
    <div className="profile-container">
      <div className="profile-content">
        <div className="left-content">
          <div className="wrapper-avatar">
            <div className="avatar" ref={avatarRef}>
              {!avatarSrc && <PersonOutline color={"#00000066"} title={""} />}
            </div>
          </div>
          <div className="section wrapper-contact">
            <span className="title">Contact</span>
            <ul className="contact">
              {contactInfo.map((item, index) => (
                <li key={`contact-${index}`} className="contact-item">
                  <span className="contact-item-icon">{item.icon}</span>
                  <span className="contact-item-text">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="section wrapper-skill">
            <span className="title">Skill</span>
          </div>
        </div>
        <div className="right-content"></div>
      </div>
      <button type="button" className="export-cv-btn">
        Export CV
      </button>
    </div>
  );
}

export default Profile;
