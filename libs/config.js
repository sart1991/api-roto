module.exports = {
    database: "bqvwr9dlh",
    username: "uz0oxko4dyk8ccms",
    password: "qZFBVMqdEcPVLA1Ihaj",
    params: {
        host: "bqvwr9dlh-mysql.services.clever-cloud.com",
        dialect: "mysql",
        define: {
            underscored: true
        },
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    },
    jwtSecret: "s@p1r070_5ch00l",
    jwtSession: {session: false, failureFlash: true} 
};