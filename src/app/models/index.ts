export class Mosque {
  id: number;
  name: string;
  image: string;
}

export enum SystemTypes {
  points = 1,
  awards = 2,
  recite = 3
}

export class Course {
  id: number;
  name: string;
  description: string;
  image: string;
  systemType: SystemTypes
  mosqueId: number;
}

export class Group {
  id: number;
  name: string;
  image: string;
  courseId: number;
  teacherId: number;
  points?: number;
}


export enum Roles {
  Admin = 1,
  Teacher = 2,
  Student = 3
}

export abstract class User {
  id: number;
  name: string;
  groupId: number;
  birth: string;
  courseId: number;
  role: Roles
}

export class Student extends User {
  level: number;
  points: number;
}

// export class Admin extends User {

// }

// export class Teacher extends User {

// }

export abstract class AttDay {
  id: number;
  studentIds: number[];
  date: string;
  notes?: string;
  points?: number; // to give points for attendance
  absencePoints?: number; // to delete points for absence
}

export class ReciteDay extends AttDay {
  pages: number;
}

// export class LessonDay extends AttDay {

// }
