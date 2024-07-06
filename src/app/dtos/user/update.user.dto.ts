export class UpdateUserDTO {
    fullname: string;
    address: string;
    password: string;
    retypePassword: string;
    date_of_birth: Date;

    constructor(data: any) {
        this.fullname = data.fullname;
        this.address = data.address;
        this.password = data.password;
        this.retypePassword = data.retypePassword;
        this.date_of_birth = data.date_of_birth;
    }
}