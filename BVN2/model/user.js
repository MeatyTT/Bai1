const fs = require('fs');
const path = require('path')

const addNewPromise = async student => {
    try {
        const isExit = await fs.existsSync('student.json');
        if (!isExit) {
            const newList = [student];
            const dataToSave = JSON.stringify(newList)
            await fs.promises.writeFile('student.json', dataToSave);
            return 1;
        }
        const data = await fs.promises.readFile(path.resolve(__dirname, 'student.json'), 'utf8');
        const dataConvert = JSON.parse(data);
        const newList = [...dataConvert, student];

        await fs.promises.writeFile(path.resolve(__dirname, 'student.json'), JSON.stringify(newList));
        console.log('Thêm user mới thành công');

    } catch (err) {
        console.log('Thêm user mới thất bại');
        throw err;

    }
}
const getAllUser = async () => {
    const result = await fs.promises.readFile(path.resolve(__dirname, 'student.json'), 'utf8')
    const dataConvert = JSON.parse(result)
    return dataConvert;
}
const queryUser = async (params) => {
    const allUser = await getAllUser();
    const result = allUser.filter(user => {
        if (params.name) {
            user.name.includes(params.name) || params.age == user.age;
        } else {
            return params.age == user.age;
        }
    });
    return result;
}
const deleteUserById = async (userId) => {
    try {
        const allUser = await getAllUser();
        const newListUser = allUser.filter(user => {
            return user.id != userId
        })
        if (newListUser.length === allUser.length) {
            return {
                status: 400,
                msg: `Không tìm thấy user ${userId} `
            }
        } else {
            await fs.promises.writeFile(path.resolve(__dirname, 'student.json'), JSON.stringify(newListUser));
            return {
                status: 200,
                msg: `Xóa bỏ user ${userId} thành công`
            }
        }
        return 1;
    } catch (err) {
        throw err
    }
}
const writeFile = async (content) => {
    await fs.promises
        .writeFile(path.resolve(__dirname, 'student.json'), JSON.stringify(content))
        .catch((error) => {
            if (error) throw error;
        });
};
const check = async (userID) => {
    const read = await fs.promises.readFile(path.resolve(__dirname, 'student.json'), "utf8");

    let list = JSON.parse(read);
    for (let i = 0; i < list.length; i++) {
        if (list[i].id == userID) {
            return true;
        }
    }
};
const updateUserById = async (userId, body) => {
    const read = await fs.promises.readFile(path.resolve(__dirname, 'student.json'), "utf8");
    console.log(userId);
    if (await check(userId)) {
        let list = JSON.parse(read);
        for (let i = 0; i < list.length; i++) {
            if (list[i].id == userId) {
                list[i] = body;
            }
        }
        writeFile(list)
    }
    else {
        console.log("Id không tồn tại");
    }
}

const updateUser = async (body) => {
    try {
        fs.writeFileSync(path.resolve(__dirname, 'student.json'), JSON.stringify(body));
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    getAllUser,
    queryUser,
    addUser: addNewPromise,
    deleteUserById,
    updateUserById,
    updateUser,
}