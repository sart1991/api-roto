module.exports = (sequelize, DataType) => {
    const Task = sequelize.define("Task", 
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
        },
        grade_point: {
            type: DataType.DOUBLE,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        classMethods: {
            associate: (models) => {
                Task.belongsTo(models.School);
                Task.belongsTo(models.Course);
                Task.belongsTo(models.Professor);
                Task.belongsTo(models.Student);
            }
        }
    });
    return Task;
};