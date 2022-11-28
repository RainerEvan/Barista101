import { Modules } from "./modules";

export type Courses = {
    id:string;
    title:string;
    description:string;
    modules:[Modules];
}