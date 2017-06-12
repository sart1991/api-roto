import jwt from "jwt-simple";

module.exports = app => {
    const Professor = app.db.models.Professor;
    const cfg = app.libs.config;
    return {
        authenticate: (req, res, next) => {
            let studentId = 0;
            try {
                req.professorId = (jwt.decode(req.headers.authorization, cfg.jwtSecretProfessor).id);
                next();
            } catch(err) {
                res.sendStatus(401);
            }
        }
    };
};
