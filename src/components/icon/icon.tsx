import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IconName,
  IconPrefix,
  library,
} from "@fortawesome/fontawesome-svg-core";
import { faUser, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {
  faHouse,
  faLocationDot,
  faPhone,
  faEarthAsia,
  faDatabase,
  faUser as faUserSolid,
  faCameraRetro,
  faGear,
  faPlus,
  faAsterisk,
  faXmark
} from "@fortawesome/free-solid-svg-icons";

const iconsDeclaration = [
  faUser,
  faUserSolid,
  faHouse,
  faLocationDot,
  faPhone,
  faEnvelope,
  faEarthAsia,
  faDatabase,
  faCameraRetro,
  faGear,
  faPlus,
  faAsterisk,
  faXmark
];

library.add(...iconsDeclaration);

interface IconProps {
  type?: string;
  name: string;
}

function Icon({ type, name }: IconProps) {
  const iconType = (type || "far") as IconPrefix;
  const iconName = name as IconName;
  return <FontAwesomeIcon icon={[iconType, iconName]} />;
}

export default Icon;
