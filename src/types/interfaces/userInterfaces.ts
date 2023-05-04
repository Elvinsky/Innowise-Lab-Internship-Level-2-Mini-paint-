export interface UserInput {
  email: string;
  password: string;
}
export interface UserDataToSet extends UserInput {
  name: string;
}
export interface UserData extends UserDataToSet {
  repPassword: string;
}
