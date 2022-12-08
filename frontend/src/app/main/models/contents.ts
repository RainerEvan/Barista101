import { Modules } from "./modules";

export type Contents = {
    id:string;
    module:Modules;
    title:string;
    body:string;
    createdAt:Date;
}