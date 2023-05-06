import axios from "axios";
import { addNewUser, findUserByUsernameAndPassword } from "../client-db/users";
import IUser from "../types/user.type";


const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  
  async login(username: string, password: string) {
   const foundUser = findUserByUsernameAndPassword(username, password);
   if (!foundUser) {
    // eslint-disable-next-line no-throw-literal
    throw {
      response: {
        data: {
          message: 'Invalid  username or password'
        },
      }
    }
   }
   this.setCurrentUser(foundUser);
   return foundUser; 
  }

  logout() {
  }

  async register(username: string, email: string, password: string) {
      const user: IUser = {
        username,
        password,
        email,
        roles: ['ROLE_ADMIN'],
      };
      const result = addNewUser(user);
      if (result.error) {
        // eslint-disable-next-line no-throw-literal
        throw {
          response: {
            data: {
              message: result.error.reason
            }
          }
        }
      }
      return {
        response: {
          data: user
        },
      }
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  }

  setCurrentUser(user: IUser) {
    localStorage.setItem('user', JSON.stringify(user));
  }
}

export default new AuthService();
