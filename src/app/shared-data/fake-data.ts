import { Course, Group, Roles, Student, SystemTypes } from "../models";

export const STUDENTS_DATA: Student[] = [
  {
    id: 0,
    name: 'أحمد الأحمد',
    birth: "27/10/2003",
    level: 2,
    courseId: 1,
    groupId: 1,
    role: Roles.Student,
    points: 0
  }
]

export const GROUPS: Group[] = [
  {
    id: 0,
    name: "النور",
    image: "/assets/groups/primary/nour.jpg",
    courseId: 1,
    teacherId: 1
  },
  {
    id: 0,
    name: "الأبرار",
    image: "/assets/groups/primary/abrar.jpg",
    courseId: 1,
    teacherId: 1
  },
  {
    id: 0,
    name: "الفاروق",
    image: "/assets/groups/primary/farouq.jpg",
    courseId: 1,
    teacherId: 1
  },
  {
    id: 0,
    name: "الحكمة",
    image: "/assets/groups/primary/hekmah.jpg",
    courseId: 1,
    teacherId: 1
  },
  {
    id: 0,
    name: "النعيم",
    image: "/assets/groups/primary/naeem.jpg",
    courseId: 1,
    teacherId: 1
  },
  {
    id: 0,
    name: "الصديق",
    image: "/assets/groups/primary/seddeq.jpg",
    courseId: 1,
    teacherId: 1
  }
]

export const COURSES: Course[] = [
  {
    id: 0,
    name: "الإعدادي",
    systemType: SystemTypes.points,
    description: "الطلاب ما بين 12 إلى 16 سنة",
    image: "/assets/logo.png",
    mosqueId: 0
  },
  {
    id: 0,
    name: "الثانوي",
    systemType: SystemTypes.points,
    description: "الطلاب ما بين 16 إلى 18 سنة",
    image: "/assets/logo.png",
    mosqueId: 0
  },
  {
    id: 0,
    name: "البراعم",
    systemType: SystemTypes.points,
    description: "الطلاب ما بين 8 إلى 12 سنة",
    image: "/assets/logo.png",
    mosqueId: 0
  }
]
