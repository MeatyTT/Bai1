  
const express = require('express');
let loginRouter = express.Router();
const controller = require('../controller/loginController');
const auth = require('../middleware/authtoken.js');

loginRouter.post('/',async (req,res) =>{
    try{
        const {email,password} = req.body;
        const token = await controller.login(email,password);
        res.send({token: token});
    }catch(err){
        console.log("err",err);
        res.status(500).json({
            msg: err
        })
    }
})
loginRouter.post('/info', auth, (req, res, ) => {
    res.send({ message: "Token Ok" });
});
module.exports = loginRouter;