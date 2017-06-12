module.exports = app => {
    const Professor = app.db.models.Professor;

    app.route("/api-school/professor")
        .all(app.authProfessor.authenticate)
        .get((req, res) => {
            Professor.findById(req.professorId, {
                attributes: ["id", "name", "email"]
            })
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
        })
        .delete((req, res) => {
            Professor.destroy({where: {id: req.professorId} })
                .then(result => res.sendStatus(204))
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        });

    app.route("/api-school/professors")
        .get((req, res) => {
            Professor.findAll({
                attributes: ["name", "email"]
            })
            .then(result => res.json(result))
            .catch(error => json.status(412).json({msg: error.message}));

        })
        .post((req, res) => {
        Professor.create(req.body)
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    });
};