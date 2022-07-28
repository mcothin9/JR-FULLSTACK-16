const Student = require('../models/student');

async function getAllStudents(req, res) {
    // db.students.find()
    // query
    // query chain
    // .sort().limit() -> pagination
    // const students = await Student.find().select('firstName lastName').exec();
    const query = Student.find();
    if (process.env.NODE_ENV === 'production') {
        query.select('firstName lastName');
    }
    const students = await query.exec();
    /**
     * {
     *  data: [],
     *  error: "",
     *  message: ""
     * }
     */
    return res.json({ data: students });
}

async function getStudentById(req, res) {
    const { id } = req.params;
    const student = await Student.findById(id).exec();
    if (!student) {
        return res.status(404).json({ error: "student not found" });
    }
    return res.json({ data: student });
}

async function addStudent(req, res) {
    const { firstName, lastName, email } = req.body;
    // data validation

    const student = new Student({ firstName, lastName, email });
    await student.save();
    
    return res.status(201).json({ data: student });
}

function updateStudentById(req, res) {
    
}

function deleteStudentById(req, res) {
    
}

module.exports = {
    getAllStudents,
    getStudentById,
    updateStudentById,
    addStudent,
    deleteStudentById,
};