/*
UserInfo:
  - id: UserRepository's ID
  - school: School of UserRepository
  - first_name: UserRepository's first name
  - Last_name: UserRepository's last name
  - full_name: 'last_name, first_name'
  - nick_name: 'may not be set'
  - avi: 'Link to UserRepository's avatar picture
*/

export class UserInfo {
  id: number;
  school: any;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  nick_name: string;
  avi: string;
}
