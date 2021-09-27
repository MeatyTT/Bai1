const express = require('express')
const { getAllUser, queryUser, addUser, deleteUserById, updateUserById, updateUser } = require('../model/user')

let userRouter = express.Router();

userRouter.get('/', async (req, res) => {
    try {

        // console.log(req.query) // ?name1=val&name2=sdaf&asdf
        const { name = '', age = '' } = req.query || {};
        //lấy toàn bộ user
        if (!name && !age) {
            console.log(req.query, 'query');
            const result = await getAllUser();
            res.json(result);
            return 1;
        } else {
            const result = await queryUser({ name, age });
            res.json(result);
            return 1;
        }
        // const name=req.query.name;
        // const age=req.query.age;

        // res.send('get method: ' + req.params.user)
    } catch (err) {
        console.log('error get user', err);
        res.status(500).json({
            msg: err
        })
    }
});

userRouter.post('/', async (req, res) => {
    try {
        const body = req.body;
        console.log('post', body);
        await addUser(body);
        res.json({
            msg: 'Thêm mới user thành công'
        });
    } catch (err) {
        console.log('error post user', err);
        res.status(500).json({
            msg: err
        })
    }

    // res.send('post method: ' + req.params.user)
});

userRouter.patch('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const body = req.body;
        await updateUserById(userId,body)
        res.json({
            msg: `Cập nhât user ${userId} thành công`
        })
    } catch (err) {
        console.log('error patch user');
        res.status(500).json({
            msg: err
        })
    }
});

userRouter.put('/', async (req, res) => {
    try {
        const body = req.body;
        await updateUser(body);
        res.json({
            msg: 'Thêm mới user thành công'
        });
    } catch (err) {
        console.log('error put user');
        res.status(500).json({
            msg: err
        })
    }
});

userRouter.delete('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const result = await deleteUserById(userId)
        res.status(result.status).json({
            msg: result.msg
        })

    } catch (err) {
        console.log('error delete user');
        res.status(500).json({
            msg: err
        })
    }
});

module.exports = userRouter;