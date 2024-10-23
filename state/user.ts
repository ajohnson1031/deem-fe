import { atom } from "jotai";

interface User {
  color?: string;
  name?: string;
  email: string;
  profileImage?: string;
}

const userState = atom<User>({ email: "aaron@mymail.net" });

export { userState };
