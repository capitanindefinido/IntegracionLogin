import UserDto from "../dto/users.dto.js"

class UserRepository {
    constructor(dao){
        this.dao = dao
    }

    async addUser(user){
        const newUser = new UserDto(user)
        return await this.dao.addUser(newUser)
    }

    async updateUser(id, user){
        return await this.dao.updateUser(id, user)
    }

    async getUsers(){
        return await this.dao.getUsers()
    }

    async getUserById(id){
        return await this.dao.getUserById(id)
    }

    async deleteUser(id){
        return await this.dao.deleteUser(id)
    }

    async findUser(email){
        return await this.dao.findUser(email)
    }

    async findEmail(param){
        return await this.dao.findEmail(param)
    }

}

export default UserRepository