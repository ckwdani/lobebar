export class BACKENDPATHS{
    static readonly baseApiUrl = 'http://192.168.3.11:8000';
    static readonly login = this.baseApiUrl + '/login_check';
    static readonly register = this.baseApiUrl + '/register';
    static readonly getUser = this.baseApiUrl + '/user';
}
