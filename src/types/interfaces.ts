export interface UserData {
  name: string;
  email: string;
  password: string;
  repPassword: string;
}
export interface UserDataToSet {
  name: string;
  email: string;
  password: string;
}
export interface UserInput {
  email: string;
  password: string;
}
export interface UserWithId {
  name?: string;
  email?: string;
  password?: string;
  id?: string;
}
export interface CanvasSizes {
  width: number;
  height: number;
}
export interface DrawStyle {
  width: number;
  color: string;
}
