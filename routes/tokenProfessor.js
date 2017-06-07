import jwt from "jwt-simple";

module.exports = app => {
    const cfg = app.libs.config;
    const Professor = app.db.models.Professor;
    app.post("/token_professor", (req, res) => {
        if (req.body.email && req.body.password) {
            const email = req.body.email;
            const password = req.body.password;
            Professor.findOne({where: {email: email}})
                .then(professor => {
                    if (Professor.isPassword(professor.password, password)) {
                        const payload = {id: professor.id};
                        res.json({
                            token: jwt.encode(payload, cfg.jwtSecret)
                        });
                    } else {
                        res.sendStatus(401);
                    }
                })
                .catch(error => res.sendStatus(401));
            } else {
                res.sendStatus(401);
            }
        });
    };