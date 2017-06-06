module.exports = (sequelize, DataType) => {
    const Professor = sequelize.define("Professor", 
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
                Professor.belongsTo(models.School);
                Professor.hasMany(models.Course);
                Professor.hasMany(models.Task);
                Professor.belongsToMany(models.Professor, {as: "student", through: "professor_student"});
            }
        }
    });
    return Professor;
};