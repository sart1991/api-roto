import jwt from "jwt-simple";

module.exports = app => {
    const Student = app.db.models.Student;
    const cfg = app.libs.config;
    return {
        authenticate: (req, res, next) => {
            let studentId = 0;
            try {
                req.studentId = (jwt.decode(req.headers.authorization, cfg.jwtSecret).id);
                next();
            } catch(err) {
                res.sendStatus(401);
            }
        }
    };
};
