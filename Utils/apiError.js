class ApiError{
    constructor(statuscode="400",message="something went wrong"){
        this.statuscode=statuscode;
        this.message=message;
    }
}
export {ApiError}