import { User } from "./user";

export class Report{
    _id?: string;
    reportingUser: User;
    description: string;
    code: Number;

    constructor(id: string, reportingUser: User, description: string, code: Number) {
        this._id = id;
        this.reportingUser = reportingUser;
        this.code=code;
        this.description = description;
    }  
}