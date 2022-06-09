import { useEffect, useRef, useState } from "react";
import Icon from "../../components/icon/icon";
import "./profile.scss";

const contactInfo = [
  {
    title: "address",
    icon: <Icon type="fas" name="location-dot" />,
    text: "00 Street District State",
  },
  {
    title: "Phone",
    icon: <Icon type="fas" name="phone" />,
    text: "(+xx)xx xxxx xxx",
  },
  {
    title: "Mail",
    icon: <Icon name="envelope" />,
    text: "your-email@example.com",
  },
  {
    title: "Earth",
    icon: <Icon type="fas" name="earth-asia" />,
    text: "https//:yourwebsite.com.vn",
  },
];

function Profile() {
  const [avatarSrc] = useState("");
  const avatarRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!avatarRef.current) return;
    const avatarEl: HTMLElement = avatarRef.current as HTMLElement;
    avatarEl.style.backgroundImage = `url(${avatarSrc})`;
  }, [avatarSrc]);
  return (
    <div className="profile-container">
      <div className="profile-content">
        <div className="left-content">
          <div className="wrapper-avatar">
            <div className="avatar" ref={avatarRef}>
              {!avatarSrc && <Icon name="user" />}
            </div>
          </div>
          <div className="section wrapper-contact">
            <span className="title">Contact</span>
            <ul className="contact">
              {contactInfo.map((item, index) => (
                <li key={`contact-${index}`} className="contact-item">
                  <span className="contact-item-icon">
                    <span>{item.icon}</span>
                  </span>
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
