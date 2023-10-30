import { atom } from "recoil";

export const isLoggedInState = atom({
  key: "isLoggedIn",
  default: false,
});

export const userRoleState = atom({
  key: "userRole",
  default: "USER",
});

export const loggingInErrorsState = atom({
  key: "loggingInErrors",
  default: {
    hasErrors: false,
    message: "",
  },
});
