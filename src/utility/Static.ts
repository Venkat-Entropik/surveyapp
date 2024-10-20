import {
  FiHome,
  FiVideo,
  FiCamera,
  FiBarChart,
  FiDatabase,
} from "react-icons/fi";
import { RiSurveyFill } from "react-icons/ri";

export const Static = {
  SIDEBARLIST: [
    { name: "Home", icon: FiHome },
    { name: "Videos", icon: FiVideo },
    { name: "Images", icon: FiCamera },
    { name: "Survey", icon: RiSurveyFill },
    { name: "Database", icon: FiDatabase },
    { name: "Analytics", icon: FiBarChart },
  ],

  IMAGE_ACCEPT_FILES: "image/jpeg, image/png, image/gif",
  VIDEO_ACCEPT_FILES: "video/mp4,video/x-m4v,video/*",
  ALLOWEDTYPES: ["video/mp4", "video/x-m4v", "video/webm", "video/*"],
};
