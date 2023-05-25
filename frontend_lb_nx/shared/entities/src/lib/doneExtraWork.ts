import {DoneExtraWorkTypes, SnackType, User} from "@frontend-lb-nx/shared/entities";

    export interface DoneExtraWork{
    id?: string,
    user?: User,
    extraWorkType: DoneExtraWorkTypes,
    date: Date,
}
