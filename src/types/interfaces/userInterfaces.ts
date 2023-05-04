export interface UserDataToSet {
  name: string;
  email: string;
  password: string;
}
export interface UserData extends UserDataToSet {
  repPassword: string;
}
export interface UserWithId extends UserDataToSet {
  id: string;
}
export interface UserInput {
  email: string;
  password: string;
}
