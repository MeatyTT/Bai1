const TokenUtil = require("../ultis/token");

const checkToken = async(req, res, next) => {
    try {
        console.log("req: ",req.headers.authorization);

        const token = req.headers.authorization;

        let fixtoken
        if (token.indexOf(" ") >= 0)
            fixtoken = token.split(" ")


        if (!fixtoken[1]) {
            res.sendStatus(403);
        }
        console.log("verifyToken", verifyToken);
        const verifyToken = await TokenUtil.verifyToken(fixtoken[1]);
        console.log("verifyToken", verifyToken);
        if (!verifyToken) {
            res.send(false);
        } else {


            req.data = [{...verifyToken }];
        }

        return next();
    } catch (error) {
        res.send(false);
    }
};

module.exports = checkToken