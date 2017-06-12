import bcrypt from "bcrypt";

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
                is: ["^[a-z]+$", 'i'],
                notEmpty: true
            }
        }
    }, {
        hooks: {
            beforeCreate: user => {
                const salt = bcrypt.genSaltSync();
                user.password = bcrypt.hashSync(user.password, salt);
            }
        },
        classMethods: {
            associate: (models) => {
                Professor.belongsTo(models.School);
                Professor.hasMany(models.Course);
                Professor.hasMany(models.Task);
            },
            isPassword: (encodedPassword, password) => {
                return bcrypt.compareSync(password, encodedPassword);
            }
        }
    });
    return Professor;
};