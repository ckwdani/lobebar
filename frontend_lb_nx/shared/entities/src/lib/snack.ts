import {SnackType} from "./snackType";
import {User} from "./user";

export interface Snack{
    id?: string,
    user?: User,
    snackType: SnackType,
    date: Date,

}
