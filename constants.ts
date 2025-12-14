import { NavItem, MapLocation, CoupleProfile } from './types';

// --- CONFIGURATION START ---

// 1. Google Sheets Script URL
// How to set up:
// a. Create a Google Sheet.
// b. Extensions > Apps Script.
// c. Paste code to handle POST request and append row.
// d. Deploy > New Deployment > Web App > Who has access: Anyone.
// e. Paste the URL below.
export const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwhHv34Pf9tyCqeoLbrVBhiuELbWhwtc7niQemRtd0PkvbZPOGl5SWcGJIo53TGf4dgVg/exec";

// 2. Music
// 2. Music (load from local `asset/mp3`)
export const BACKGROUND_MUSIC_URL = new URL('./asset/mp3/music_weding.mp3', import.meta.url).href;

// 3. General Info
export const WEDDING_DATE = "28.12.2025";
export const WEDDING_TIME = "16:00";
export const LUNAR_DATE = "Ngày 09 tháng 11 năm Ất Tỵ";
export const SAVE_THE_DATE_TEXT = "Save The Date";

// 4. Images (Replace with your actual hosted image URLs)
export const HERO_IMAGE = new URL('./asset/Photo/KIN06148ok.jpg', import.meta.url).href;
export const GROOM_IMAGE = new URL('./asset/Photo/KIN06373okk.jpg', import.meta.url).href;
export const BRIDE_IMAGE = new URL('./asset/Photo/KIN05950ok.jpg', import.meta.url).href;
export const ENVELOP_IMAGE = new URL('./asset/Photo/KIN06653ok.jpg', import.meta.url).href;

export const GALLERY_IMAGES = [
  new URL('./asset/Photo/KIN06053okkk.jpg', import.meta.url).href,
  new URL('./asset/Photo/KIN06060okk.jpg', import.meta.url).href,
  new URL('./asset/Photo/KIN06067okk.jpg', import.meta.url).href,
  new URL('./asset/Photo/KIN06195okk.jpg', import.meta.url).href,
  new URL('./asset/Photo/KIN06275okk.jpg', import.meta.url).href,
  new URL('./asset/Photo/KIN06423okk.jpg', import.meta.url).href,
  new URL('./asset/Photo/KIN06495okk.jpg', import.meta.url).href,
  new URL('./asset/Photo/KIN06539okk.jpg', import.meta.url).href,
  new URL('./asset/Photo/KIN06546ok.jpg', import.meta.url).href,
  new URL('./asset/Photo/KIN06576okk.jpg', import.meta.url).href,
];

// 5. Navigation
export const NAV_ITEMS: NavItem[] = [
  { label: "Couple", to: "couple" },
  { label: "Album", to: "gallery" },
  { label: "Sự Kiện", to: "events" },
  { label: "RSVP", to: "rsvp" },
];

// 6. Couple Info
export const GROOM: CoupleProfile = {
  name: "Công Tuyền",
  role: "Chú Rể",
  image: GROOM_IMAGE
};

export const BRIDE: CoupleProfile = {
  name: "Thảo Anh",
  role: "Cô Dâu",
  image: BRIDE_IMAGE
};


