import Stock from "./Stock";

export default interface UserProfile {
  _id?: string;
  name: string | null;
  photo: string | null;
  email: string | null;
  uid: string;
  stocks: Stock[];
}
