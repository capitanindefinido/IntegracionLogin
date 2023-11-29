class UserDto {
    constructor(newUser){
        this.full_name = `${newUser.first_name} ${newUser.last_name}`
        this.first_name = newUser.first_name
        this.last_name = newUser.last_name
        this.email = newUser.email
        this.age = newUser.age
        this.password = newUser.password
        this.rol = newUser.rol
        this.active = true
    }
}

export default UserDto