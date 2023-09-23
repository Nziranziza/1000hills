import home from "./xml/home";
import profile from './xml/profile';
import bell from './xml/bell';
import search from "./xml/search";
import logo from "./xml/logo";
import settings from "./xml/settings";
import send from "./xml/send";
import chat from "./xml/chat";
import heart from "./xml/heart";
import phone from "./xml/phone";
import mail from "./xml/mail";
import plus from "./xml/plus";
import upload from "./xml/upload";
import x from './xml/x';
import refresh from "./xml/refresh";
import chevronBack from "./xml/chevron-back";

const icons = {
  home,
  profile,
  bell,
  search,
  logo,
  settings,
  send,
  chat,
  heart,
  phone,
  mail,
  plus,
  upload,
  x,
  refresh,
  chevronBack
};

export type IconNames = keyof typeof icons;

export default icons;
