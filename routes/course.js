module.exports = app => {
    const Course = app.db.models.Course;
    app.route("/api-school/courses")
        .all(app.authProfessor.authenticate)
        .get((req, res) => {
            Course.findAll({where: {professor_id: req.professorId}})
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
        })
        .post((req, res) => {
            req.body.professor_id = req.professorId;
            Course.create(req.body)
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        });

    app.route("/api-school/courses/:id")
        .get((req, res) => {
            Course.findOne({where: req.params})
                .then(result => {
                    if(result) {
                        res.json(result);
                    } else {
                        res.sendStatus(404);
                    }
                })
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        })
        .put((req, res) => {
            Course.update(req.body, {where: req.params})
                .then(result => res.sendStatus(204))
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        })
        .delete((req, res) => {
            Course.destroy({where: req.params})
                .then(result => res.sendStatus(204))
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        });
};