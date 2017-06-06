module.exports = (sequelize, DataType) => {
    const Student = sequelize.define("Student", 
    {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                is: ["^[a-z\ ]+$", 'i'],
                notEmpty: true
            }
        },
        email: {
            type: DataType.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                notEmpty: true
            }
        },
        password: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                is: ["^[a-z\ ]+$", 'i'],
                notEmpty: true
            }
        }
    }, {
        classMethods: {
            associate: (models) => {
                Student.belongsTo(models.School);
                Student.belongsToMany(models.Professor, {as: "student", through: "professor_student"});
                Student.belongsToMany(models.Course, {as: "student", through: "student_course"});
            }
        }
    });
    return Student;
};