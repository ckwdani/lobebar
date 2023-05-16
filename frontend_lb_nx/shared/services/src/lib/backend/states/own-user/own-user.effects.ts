import {Injectable} from "@angular/core";
import {Actions} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {UserBackendService} from "../../entity-backend-services/user-backend.service";

@Injectable()
export class OwnUserEffects {
    constructor(private actions$: Actions, private userService: UserBackendService, private store: Store) {}

}