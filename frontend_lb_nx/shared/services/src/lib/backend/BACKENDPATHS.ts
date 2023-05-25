export class BACKENDPATHS{
    static readonly baseApiUrl = 'http://192.168.3.11:8000';
    static readonly login = this.baseApiUrl + '/login_check';
    static readonly register = this.baseApiUrl + '/register';
    static readonly getUser = this.baseApiUrl + '/user';
    static readonly deleteUser = this.baseApiUrl+ '/admin_api/user' // userId
    static readonly updateUser = this.baseApiUrl + '/api/user/update'
    static readonly approveUser = this.baseApiUrl+ '/mod_api/approve' //userId
    static readonly updateUserRole = this.baseApiUrl + '/admin_api/user/updateRole' // /{userId}/{ROLE}

    static readonly getAllUser = this.baseApiUrl + '/admin_api/users';

    // CRUD ORGEVENT
    static readonly addOrgEvent= this.baseApiUrl + '/org_api/event/add';
    static readonly deleteOrgEvent= this.baseApiUrl + '/mod_api/event/deleteEvent'; // /eventId
    static readonly updateOrgEvent= this.baseApiUrl + '/org_api/event/updateEvent'; // /eventId
    static readonly getSingleOrgEvent= this.baseApiUrl + '/api/event/getSingle'; // /eventId
    static readonly getOrgEventTimed= this.baseApiUrl + '/api/event/getTimed'; // /start/end


    // CRUD SHIFFTTYPE
    static readonly app_shift_type_addshifttype =          this.baseApiUrl +    "/mod_api/shift/addtype"
    static readonly app_shift_type_deleteshifttype =      this.baseApiUrl +    "/mod_api/shift/deletetype/"
    static readonly app_shift_type_getshifttypes =          this.baseApiUrl +    "/api/getShiftTypes"
    static readonly app_shift_type_updateshifttype =          this.baseApiUrl +     "/mod_api/shift/updatetype/"

    //SHIFT
    static readonly shift_user_shifts = this.baseApiUrl + "/api/getUserShifts" ///{userId}/{start}/{end}
    static readonly shift_event_add = this.baseApiUrl + "/org_api/shift/add" ///{eventId}
    static readonly shift_event_delete = this.baseApiUrl + "/org_api/shift/delete" ///{shiftId}
    static readonly shift_outstanding_shifts = this.baseApiUrl + "/api/getOutstandingShifts" // /{start}/{end}/{user_id}
    static readonly shift_edit_desc = this.baseApiUrl + "/org_api/shift/updateShiftDesc" ///{shiftId}/{newDesc}
    //ASSIGN
    static readonly shift_assign = this.baseApiUrl + "/api/assignShift" // /shift id
    // CRUD EW_Types
    static readonly app_doneEwtrawork_addshifttype =          this.baseApiUrl +   "/mod_api/ew_types/addtype"
    static readonly app_doneEwtrawork_deleteshifttype =      this.baseApiUrl +    "/mod_api/ew_types/deletetype/"
    static readonly app_doneEwtrawork_getshifttypes =          this.baseApiUrl +"/api/getewtypes"
    static readonly app_doneEwtrawork_updateNam =          this.baseApiUrl + "/mod_api/ew_types/updatetype/"


    // Achievement
    static readonly putAchievement = this.baseApiUrl+ "/api/achievement"

    // SnackType
    static readonly getSnackTypes = this.baseApiUrl+ '/api/snack/types'
    static readonly addSnackType  = this.baseApiUrl + '/mod_api/snack/addtype'
    static readonly deleteSnackType  = this.baseApiUrl + '/mod_api/snack/deleteType' // snackTypeId
    static readonly updateSnackType = this.baseApiUrl + '/mod_api/snack/updateSnackTypeName' ///{snackTypeId}/{newName}

    //Snack
    static readonly snackUsed = this.baseApiUrl + '/api/snack/used' //{snackId}/{amount}/{userId?}
    static readonly getOwnSnacks = this.baseApiUrl + '/api/snacks/own' //{start?}/{end?}
    static readonly getUsedSnacks = this.baseApiUrl + '/api/snacks' //{start?}/{end?}/{userId?}
    static readonly countUsedSnacks = this.baseApiUrl + '/api/snacks/count' //{start?}/{end?}/{userId?}


    // Email reset paths
    static readonly resetPassword = this.baseApiUrl + '/user/reset' // {email}
    static readonly resetPasswordConfirm = this.baseApiUrl + '/user/reset/confirm' // {token}
    static readonly resetPasswordCodeCheck = this.baseApiUrl + "/user/reset/check" // {code}

    // snacks booker
    static readonly getCountSnacks = this.baseApiUrl + '/admin_api/snack/booked' //
    static readonly setSnacksBookedDay = this.baseApiUrl + '/admin_api/snack/book/day' // {date}
    static readonly setAllSnachsBooked = this.baseApiUrl + '/admin_api/snack/book_all' //


    // Done EW
    static readonly getDoneEW = this.baseApiUrl + '/admin_api/doneEW' // /{start}/{end}/{userId}
    static readonly getOwnDone = this.baseApiUrl + '/api/doneEW/own' // /{start}/{end}
    static readonly doEw = this.baseApiUrl + '/api/ew_done/used' // /{start}/{end}

    // external Links
    static readonly datenSchutz = "https://emils-ecke.org/datenschutzerklaerung/"



}

