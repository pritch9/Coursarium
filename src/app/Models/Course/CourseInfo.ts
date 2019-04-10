import {UserInfo} from '../User/userinfo';

export enum Term {
  FALL = 'Fall',
  SPRING = 'Spring',
  WINTER = 'Winter',
  SUMMER = 'Summer'
}

export class CourseInfo {
  id: number;
  subject: string;
  number: number;
  professor: UserInfo;
  semester: Term;
  year: number;
  name: string;
  description: string;
  seats_available?: number;
}
