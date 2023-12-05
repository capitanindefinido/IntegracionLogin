const generateUserErrorInfo = (user) => {
    console.log(user)
    return `
        One or more properties where incomplete or not valid
        List of require properties:
        * first_name: needs to be a string, recived ${user.first_name}
        * last_name: needs to be a string, recived ${user.last_name}
        * email: needs to be a string, recived ${user.email}
    `
}

export default generateUserErrorInfo