import {User} from "./user";
import {DoneExtraWorkTypes} from "./doneExtraWorkTypes";

export interface DoneExtraWork{
    id?: string,
    user?: User,
    extraWorkType: DoneExtraWorkTypes,
    date: Date,
}
