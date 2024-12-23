const UserResource = require('./resources/UserResource');

class UserRepository {
    async createUser(data) {
        const { firstname, lastname, email, password } = data;

        const existingUser = await UserResource.findByEmail(email);
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        return await UserResource.create({
            firstname: lastname,
            lastname: firstname,
            email: email,
            is_active: 1,
            password: password
        });
    }
    async findByEmail(email) {
        return await UserResource.findByEmail(email);
    }
    async findByIdExclPassword(userId) {
        return UserResource.findByIdExclPassword(userId);
    }
    async updatePassword(userId, newPassword) {
        return await UserResource.updatePassword(userId, newPassword);
    }
    async updateUser(userId, newPassword) {
        return await UserResource.update(userId, newPassword);
    }
}

module.exports = new UserRepository();