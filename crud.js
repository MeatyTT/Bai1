const fs = require('fs');
const student1 = {
    ID: 1,
    name: "Tuan",
    age: 18,
    gender: "male",
    department: "History",
};
const student2 = {
    ID: 2,
    name: "Phuong",
    age: 18,
    gender: "female",
    department: "History",
};
const writeFile = async (content) => {
    await fs.promises
        .writeFile("student.json", JSON.stringify(content))
        .catch((error) => {
            if (error) throw error;
        });
};

const readFile = async () => {
    try {
        const data = await fs.promises.readFile("./student.json", "utf8");

        console.log("read data: ", JSON.parse(data));
    } catch (err) {
        console.log("Dữ liệu không đọc được");
        throw err;
    }
};

const createFile = async () => {
    const exists = await fs.existsSync("./student.json");

    if (!exists) {
        writeFile([student]);
        console.log("Tạo file thành công");
    }
    else {
        console.log("File đã tồn tại");
    }
};

const check = async (studentId) => {
    const read = await fs.promises.readFile("./student.json", "utf8");

    let list = JSON.parse(read);

    for (let i = 0; i < list.length; i++) {
        if (list[i].ID === studentId) {
            return true;
        }
    }
};

const addStudent = async (data) => {
    try {
        const read = await fs.promises.readFile("./student.json", "utf8");

        let list = JSON.parse(read);

        let idList = list.map((e) => e.ID);

        if (idList.indexOf(data.ID) < 0) {
            list.push(data);
            writeFile(list);
        }
        else {
            console.log("ID đã tồn tại");
        }
    } catch (err) {
        throw err;
    }
};

const deleteStudent = async (studentId) => {
    const read = await fs.promises.readFile("./student.json", "utf8");

    if (await check(studentId)) {
        let list = JSON.parse(read);

        for (let i = 0; i < list.length; i++) {
            if (list[i].ID === studentId) {
                list.splice(list.indexOf(list[i]), 1);
            }
        }

        writeFile(list);
    }
    else {
        console.log("ID không tồn tại");
    }
};

const updateStudent = async (studentId, updateData) => {
    const read = await fs.promises.readFile("./student.json", "utf8");

    if (await check(studentId)) {
        let list = JSON.parse(read);

        for (let i = 0; i < list.length; i++) {
            if (list[i].ID === studentId) {
                list[i] = updateData;
            }
        }

        writeFile(list);
    }
    else {
        console.log("Id không tồn tại");
    }
};

const main = async () => {
    await createFile();

    // await addStudent(student1);
    
    // await deleteStudent(student1);

    await readFile();
};

main();