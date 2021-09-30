const bcrypt = require('bcryptjs');
const token = require('../ultis/token')

const login = async (email, password) => {
    try{
        const data = {
            email: "hoangtuanhung220901@gmail.com",
            password: "hihi123",
            Firstname: "Hoàng",
            Lastname: "Tuấn Hưng",
            Address: "195 Quang Trung Hà Đông",
        };
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(data.password,salt);
        if(email.trim() === data.email.trim()){
            console.log("done email");
            if(await bcrypt.compareSync(password.trim(),hash) === true){
                console.log("done");
                let clienttoken = await token.generateToken(data);
                //console.log("client token",clienttoken);
                return clienttoken
                // return{message: "done"};
            }
            else{
                return { message: "Password not correct" };
            }
        }else {
            return { message: "account not exist" };
        }
    }catch(err){
        return(err);
    }
}
module.exports = {
    login,
}