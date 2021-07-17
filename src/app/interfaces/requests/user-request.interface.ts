export interface UserRequest {

    username: string;
    password: string;
    passwordConfirmation: string;
    status?: string;
    names: string;
    firstSurname: string;
    secondSurname: string;
    email: string;
    phone: string;
    code?: string;

}
