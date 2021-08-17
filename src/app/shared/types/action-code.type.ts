export type ActionCode =
    | 'ACCESS_PASSWORD_UPDATE'

    | 'ROLE_REGISTER'
    | 'ROLE_UPDATE'
    | 'ROLE_GET_ALL'
    | 'ROLE_DELETE'

    | 'USER_REGISTER'
    | 'USER_UPDATE'
    | 'USER_CURRENT_UPDATE'
    | 'USER_GET_ALL'

    | 'DEPARTMENT_REGISTER'
    | 'DEPARTMENT_UPDATE'
    | 'DEPARTMENT_UPDATE_MEMBERS'
    | 'DEPARTMENT_GET'
    | 'DEPARTMENT_GET_ALL'

    | 'PROCESS_CREATE'
    | 'PROCESS_GET_ALL'

    | 'REQUEST_REGISTER'
    | 'REQUEST_GET_ALL_CURRENT_USER'
    | 'REQUEST_EXECUTE_ACTION'

    | 'DEPARTMENT_MEMBER_UPLOAD_CERTIFICATE';