module.exports = app => {
    const Professor = app.db.models.Professor;

    app.route("/api-school/professor")
        .all(app.authProfessor.authenticate())
        .get((req, res) => {
            Professor.findById(req.professor.id, {
                attributes: ["id", "name", "email"]
            })
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
        })
        .delete((req, res) => {
            Professor.destroy({where: {id: req.professor.id} })
                .then(result => res.sendStatus(204))
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        });

    app.post("/api-school/professors", (req, res) => {
        Professor.create(req.body)
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    });
};