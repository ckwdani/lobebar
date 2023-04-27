export class BACKENDPATHS{
    static readonly baseApiUrl = 'http://192.168.3.11:8000';
    static readonly login = this.baseApiUrl + '/login_check';
    static readonly register = this.baseApiUrl + '/register';
    static readonly getUser = this.baseApiUrl + '/user';

    // CRUD ORGEVENT
    static readonly addOrgEvent= this.baseApiUrl + '/mod_api/event/add';
    static readonly deleteOrgEvent= this.baseApiUrl + '/mod_api/event/deleteEvent'; // /eventId
    static readonly updateOrgEvent= this.baseApiUrl + '/mod_api/event/updateEvent'; // /eventId
    static readonly getSingleOrgEvent= this.baseApiUrl + '/mod_api/event/getSingle'; // /eventId
    static readonly getOrgEventTimed= this.baseApiUrl + '/mod_api/event/getTimed'; // /start/end



    static readonly app_shift_type_addshifttype =          this.baseApiUrl +    "/mod_api/shift/addtype"
    static readonly app_shift_type_deleteshifttype =      this.baseApiUrl +    "/mod_api/shift/deletetype/"
    static readonly app_shift_type_getshifttypes =          this.baseApiUrl +    "/api/getShiftTypes"

}
