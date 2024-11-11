import { atom } from "jotai";

interface User {
  color?: string;
  name?: string;
  email: string;
  profileImage?: string | null;
}

const userState = atom<User>({
  email: "aaron@mymail.net",
  profileImage: "https://cdn.pixabay.com/photo/2016/03/23/15/00/ice-cream-1274894_1280.jpg",
});

export { userState };
