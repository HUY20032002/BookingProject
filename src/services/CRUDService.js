import { where } from "sequelize";
import db from "../models/index";
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

// Hàm tạo người dùng mới
let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.password) {
                return reject(new Error("Mật khẩu là bắt buộc"));
            }
            let hashPasswordFormBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFormBcrypt, // Sử dụng biến đã hash mật khẩu
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
            });
            resolve('Tạo người dùng thành công');
        } catch (e) {
            reject(e);
        }
    });
};

// Hàm hash mật khẩu người dùng
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    });
};
let getAllUser = () => {
    return new Promise((resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true,
            });
            resolve(users)
        } catch (error) {
            reject(e)
        }
    })
}
let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: userId
                },
                raw: true,
            })
            if (user) {
                resolve(user)
            } else {
                resolve([])
            }
        } catch (error) {
            reject(e)
        }
    })
}
let updateUserData = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: data.id
                },
                raw: false, // raw: true không cho phép bạn gọi phương thức save() vì nó trả về dữ liệu thô.
            });

            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;  // Sửa lại là lastName thay vì lastNameName
                user.address = data.address;
                user.gender = data.gender === '1' ? true : false;

                await user.save();
                resolve(user);  // Trả về user sau khi lưu thành công
            } else {
                resolve([]);  // Nếu không tìm thấy user
            }
        } catch (error) {
            reject(error);  // Sử dụng biến error thay vì e
        }
    });
};

let deleteUserById = (userid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: userid
                }
            });

            if (user) {
                await user.destroy();
            }

            resolve({ success: true, message: "User deleted successfully" });
        } catch (error) {
            reject(error);
        }
    });
};



module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
}