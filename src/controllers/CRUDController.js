import db from '../models/index';
import CRUDService from "../services/CRUDService";

// Hàm hiển thị trang CRUD
let getCRUD = (req, res) => {
    return res.render("crud.ejs");
};

// Hàm xử lý POST CRUD
let postCRUD = async (req, res) => {
    try {
        await CRUDService.createNewUser(req.body); // Sửa lại để truyền đúng req.body
        console.log(req.body);
        return res.send('Thêm người dùng thành công');
    } catch (e) {
        console.log(e);
        return res.status(500).send('Có lỗi xảy ra');
    }
};

let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    console.log('--------------------')
    console.log(data)
    console.log('--------------------')

    return res.render('displayCRUD.ejs', {
        dataTable: data,
    });
}
let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId)
        // let userData
        return res.render('edit-crud', {
            user: userData
        })
    } else {

    }
    // console.log(req.query.id);
}

let putCRUD = async (req, res) => {
    try {
        await CRUDService.updateUserData(req.body); // Sửa lại để truyền đúng req.body
        console.log(req.body);
        return res.redirect('/get-crud');
    } catch (e) {
        console.log(e);
        return res.status(500).send('Có lỗi xảy ra');
    }
}
let deleteCRUD = async (req, res) => {
    try {
        let id = req.query.id;
        await CRUDService.deleteUserById(id);

        // Chuyển hướng về trang get-crud sau khi xóa thành công
        return res.redirect('/get-crud');
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
};
