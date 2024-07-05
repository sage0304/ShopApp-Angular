import { Role } from "src/app/models/role";

export interface UserResponse {
  id: number;
  fullname: string;
  address: string;
  phone_number: string;
  active: boolean;
  date_of_birth: Date;
  facebook_account_id: number;
  google_account_id: number;
  role: Role;
}
