import jwt from "jwt-simple";

module.exports = app => {
    const cfg = app.libs.config;
    const Student = app.db.models.Student;
    app.post("/token_student", (req, res) => {
        if (req.body.email && req.body.password) {
            const email = req.body.email;
            const password = req.body.password;
            Student.findOne({where: {email: email}})
                .then(student => {
                    if (Student.isPassword(student.password, password)) {
                        const payload = {id: student.id};
                        res.json({
                            token: jwt.encode(payload, cfg.jwtSecret)
                        });
                    } else {
                        res.tatus(401).json({msg: "Wrong passowrd"});
                    }
                })
                .catch(error => {res.sendStatus(401); console.log(error.message)});
            } else {
                res.sendStatus(401);
            }
        });
    };