export default class {
    static handleRegister(userObj) {
        const {username} = userObj;

        let users = this.getUsers();

        let existingUser = users.find(user => user.username === username);

        if (existingUser) {
            return false;
        }

        users.push(userObj);
        this.saveUsers(users);

        return true;

    }
    static handleLogin(userData) {
        const {username, password} = userData;

        let users = this.getUsers();

        let foundUser = users.find(user => user.username === username);

        if (foundUser) {
            if (foundUser.password === password) {
                let token = (({name, username}) => ({name, username}))(foundUser);
                this.saveToken(token);
                return token;
            }
        }

        return false;

    }

    static getUsers() {
        return JSON.parse(localStorage.getItem('users') || "[]");
    }

    static saveUsers(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    static saveToken(user) {
        localStorage.setItem('token', JSON.stringify(user))
    }

    static getUserToken() {
        return JSON.parse(localStorage.getItem('token'));
    }

    static clearUserToken() {
        localStorage.removeItem('token');
    }

    static returnAllUsersExceptLogged(loggedUser) {
        let users = this.getUsers();

        return users.filter(user => user.username !== loggedUser.username);
    }
}