export default function (inputFields) {

    const patterns = {
        name: /^[\w\-'\s]+$/,
        username: /^\S+$/,
        password: /.*/
    };
    let errors = {};
    for (let inputField in inputFields) {
        if (inputFields.hasOwnProperty(inputField)) {
            if (inputFields[inputField].match(patterns[inputField]) && inputFields[inputField].length > 0) {
                continue;
            }

            errors[inputField] = `${inputField} is invalid!`;
        }
    }

    return errors;
};