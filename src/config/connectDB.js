const { Sequelize } = require('sequelize');

// Khởi tạo kết nối với cơ sở dữ liệu MySQL
const sequelize = new Sequelize('hoidanit', 'root', '', {
    host: 'localhost', // Địa chỉ host của cơ sở dữ liệu (ở đây là local)
    dialect: 'mysql',  // Sử dụng MySQL làm hệ quản trị cơ sở dữ liệu
    logging: false     // Tắt ghi log các câu truy vấn SQL trên console
});

// Hàm kết nối cơ sở dữ liệu
let connectDB = async () => {
    try {
        // Thực hiện xác thực kết nối với cơ sở dữ liệu
        await sequelize.authenticate();
        console.log('Connection has been established successfully'); // Thông báo nếu kết nối thành công
    } catch (error) {
        // Bắt lỗi nếu không thể kết nối tới cơ sở dữ liệu
        console.error('Unable to connect to the database:', error);
    }
}

// Xuất hàm kết nối để có thể sử dụng ở file khác
module.exports = connectDB;
