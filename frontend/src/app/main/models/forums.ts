import { Accounts } from "./accounts";

export type Forums = {
    id:string;
    author:Accounts;
    body:string;
    createdAt:Date;
}