import { where } from 'sequelize';
import db from '../models/index'
import bcrypt from 'bcryptjs';

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}; // Đổi từ userDdata -> userData
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    where: { 
                        email: email,
                     },
                     attributes: ['id', 'email', 'roleId' ,'password'],
                     raw:true

                });
                if (user) {
                    // let check = true
                    let check = bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'OK';
                        console.log(user)
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = 'User not found';
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = "Your email does not exist in the system";
            }
            resolve(userData);
        } catch (error) {
            reject(error);
        }
    });
};

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { email: userEmail } });
            resolve(user ? true : false);
        } catch (error) {
            reject(error);
        }
    });
};
let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users= '';
            if(userId === 'ALL'){
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                });
                
            }
            if(userId && userId !== 'ALL'){
                users = await db.User.findOne({
                    where : {
                        id : userId
                    }
                })
            }
            resolve(users);
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    handleUserLogin,
    checkUserEmail,
    getAllUsers,
};
