import IUser from '../types/user.type';

const prefix = `rajak.rs`;

const getAllUsers = (): IUser[] => {
    const allUsers = localStorage.getItem(`${prefix}_users`);
    if (!allUsers) {
        return [];
    }
    return JSON.parse(allUsers);
}
const saveAllUsers = (users: IUser[]) => {
    const asJSON = JSON.stringify(users, null, 4);
    localStorage.setItem(`${prefix}_users`, asJSON);
}


export const findUserByEmail = (email: string): IUser | undefined => {
    const users = getAllUsers();
    return users.find(user => user.email === email);
}

export const findUserByUsernameAndPassword = (username: string, password: string) => {
    const users = getAllUsers();
    return users.find(user => user.username === username && user.password === password);
}

export const addNewUser = (newUser: IUser) => {
    const users = getAllUsers();
    const sameUserExists = users.find(user => user.email === newUser.email
        || user.username === newUser.username);
    
    if (sameUserExists && sameUserExists.email === newUser.email) {
        return {
            error: {
                reason: `There's already an account with that email`
            }
        };
    }
      
    if (sameUserExists && sameUserExists.username === newUser.username) {
        return {
            error: {
                reason: `There's already an account with that username`
            }
        };
    }

    users.push(newUser);
    saveAllUsers(users);
    return {};
}