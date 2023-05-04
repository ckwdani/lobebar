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


    // CRUD SHIFFTTYPE
    static readonly app_shift_type_addshifttype =          this.baseApiUrl +    "/mod_api/shift/addtype"
    static readonly app_shift_type_deleteshifttype =      this.baseApiUrl +    "/mod_api/shift/deletetype/"
    static readonly app_shift_type_getshifttypes =          this.baseApiUrl +    "/api/getShiftTypes"

    //SHIFT
    static readonly shift_user_shifts = this.baseApiUrl + "/api/getUserShifts" ///{userId}/{start}/{end}
    static readonly shift_outstanding_shifts = this.baseApiUrl + "/api/getOutstandingShifts" // /{start}/{end}/{user_id}
    //ASSIGN
    static readonly shift_assign = this.baseApiUrl + "/api/assignShift" // /shift id
    // CRUD EW_Types
    static readonly app_doneEwtrawork_addshifttype =          this.baseApiUrl +   "/mod_api/ew_types/addtype"
    static readonly app_doneEwtrawork_deleteshifttype =      this.baseApiUrl +    "/mod_api/ew_types/deletetype/"
    static readonly app_doneEwtrawork_getshifttypes =          this.baseApiUrl +"/api/getewtypes"





}
