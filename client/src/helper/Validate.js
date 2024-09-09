import toast from "react-hot-toast"

/** validate login page */
export async function usernameValidate(values){
    const errors = usernameVerify({}, values);

    return errors;
} 
export async function passwordValidate(values){
    const errors = passwordVerify({}, values);

    return errors;
} 

/** validate password */
function passwordVerify(errors = {}, values){
    const specialChars = /[!@#$%^&*(),.?":{}|<>]/;
    if(!values.password){
        errors.password = toast.error("Password required...!");
    }else if(values.password.includes(" ")){
        errors.password = toast.error('Password should not contain spaces...!');
    }else if(values.password.length < 4){
        errors.password = toast.error('Password should be at least 4 characters long...!');
    }else if(!specialChars.test(values.password)){
        errors.password = toast.error('Password should contain at least one special character...!');
    }
}

/** Validate username */

function usernameVerify(error = {}, values){
    if(!values.username){
        error.username = toast.error('Username Required...!');
    }else if(values.username.includes(" ")){
        error.username = toast.error('Username should not contain spaces...!');
    }
    return error;
}