import { Ref } from "vue";
import { User } from "firebase/auth";
import { UserData } from "./userInterfaces";

export interface UserDataCompos {
  user: Ref<User | null>;
  setUser: (input: Ref<UserData>) => void;
  authError: Ref<boolean>;
  regUser: (input: Ref<UserData>) => void;
  logOut: () => void;
  userInput: Ref<UserData>;
  setUserInput: (
    email: string,
    password: string,
    name: string,
    passwordConfirm: string
  ) => void;
}
