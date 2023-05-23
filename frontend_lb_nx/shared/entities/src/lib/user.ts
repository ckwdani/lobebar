import {Achievement, AchievementBackend} from "./achievement";

export interface User{
    id?: string,
    username: string,
    roles: string[],
    password: string,
    email: string,
    firstname: string,
    isApproved: boolean,
    lastname: string,
    titel: string,
    hygienepass: boolean,
    telephone: string,
    achievements?: AchievementBackend,
    selectedAchievement?: Partial<Achievement>
    xPScore?: number,
    balance?: number,
}

export enum UserRoles {
    ADMIN = 3,
    MODERATOR = 2,
    ORGANIZER = 1,
    USER = 0,
    UNCONFIREMD = -1,
}

export const userRolesMap: Map<UserRoles, string> = new Map<UserRoles, string>([[UserRoles.ADMIN, "Admin"], [UserRoles.MODERATOR, "Mod"], [UserRoles.ORGANIZER, "Organizer"], [UserRoles.USER, "User"]]);

export abstract class UserFunctions {

    static getRole(user: User): UserRoles {
        if ((user.roles as string[]).includes("ROLE_ADMIN")) {
            return UserRoles.ADMIN;
        } else if ((user.roles as string[]).includes("ROLE_MOD")) {
            return UserRoles.MODERATOR;
        } else if ((user.roles as string[]).includes("ROLE_ORGANIZER")) {
            return UserRoles.ORGANIZER;
        } else if ((user.roles as string[]).includes("ROLE_USER")){
            return UserRoles.USER;
        }
        else {
            return UserRoles.UNCONFIREMD;
        }
    }
}
