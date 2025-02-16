import UserService from '../services/UserService'
let handleLogin= async (req,res)=>{
    let email = req.body.email;
    let password = req.body.password;        
if(!email || !password){
    return res.status(500).json({
        errCode:1,
        message:'Missing inputs parameter!',
    })
}
let userData = await UserService.handleUserLogin(email,password);
    console.log(userData)
    return res.status(200).json({
        errCode: userData.errCode,
        message:userData.errMessage,
        userData: userData.user? userData.user:{}
})
}
let handleGetAllUser = async (req, res) => {
 
        let id = req.query.id; //ALL,Single    
        let users = await UserService.getAllUsers(id);
        console.log(users)
        return res.status(200).json({
            errCode: 0,
            errMessage: 'OK',
            users
        });
  
};
module.exports ={
    handleLogin:handleLogin,
    handleGetAllUser:handleGetAllUser,
}