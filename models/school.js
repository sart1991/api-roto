module.exports = (sequelize, DataType) => {
    const School = sequelize.define("School", 
    {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataType.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true
            }
        }
    }, {
        classMethods: {
            associate: (models) => {
                School.hasMany(models.Professor);
                School.hasMany(models.Student);
                School.hasMany(models.Course);
            }
        }
    });
    return School;
};