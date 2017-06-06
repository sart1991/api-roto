module.exports = (sequelize, DataType) => {
    const Course = sequelize.define("Course", 
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
                notEmpty: true
            }
        }
    }, {
        classMethods: {
            associate: (models) => {
                Course.belongsTo(models.School);
                Course.belongsTo(models.Professor);
                Course.hasMany(models.Task);
                Course.belongsToMany(models.Student, {as: "course", through: "student_course"});
            }
        }
    });
    return Course;
};