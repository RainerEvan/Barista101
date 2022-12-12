import { Accounts } from "./accounts";
import { Recipes } from "./recipes";

export type RecipeComments = {
    id:string;
    recipe:Recipes;
    author:Accounts;
    body:string;
    createdAt:Date;
}