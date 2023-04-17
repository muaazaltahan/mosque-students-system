export enum SystemTypes {
  points = 1,
  awards = 2,
  recite = 3
}

export enum Roles {
  Admin = 1,
  Teacher = 2,
  Student = 3
}

export enum AdminTypes {
  Helper = 1,
  Responsible = 2
}

export enum AttStatus {
  Recite = 1,
  Lesson = 2
}

export class Mosque {
  id: number;
  ownerId: number;
  name: string;
  image: string;
}

export class Course {
  id: number;
  mosqueId: number;
  name: string;
  description: string;
  image: string;
  systemType: SystemTypes
}

export class Group {
  id: number;
  courseId: number;
  mousqueId: number;
  teacherId: number;
  name: string;
  image: string;
  totalPoints?: number;
}

export abstract class User {
  id: number;
  courseId: number;
  mousqueId: number;
  name: string;
  role: Roles
}

export class Teacher extends User {
  groupId: number;
}

export class Student extends User {
  groupId: number;
  level: number;
  points: number;
  birth: string;
}

export class Admin extends User {
  adminType: AdminTypes;
}

export class Attendance {
  id: number;
  studentId: number;
  date: string;
  status: AttStatus;
}

export class Page {
  id: number;
  studentId: number;
  partNumber: number;
  pageNumber: number;
  date: string;
}
