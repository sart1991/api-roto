module.exports = app => {
    const Task = app.db.models.Task;
    app.route("/api-school/tasks")
        .all(app.authProfessor.authenticate())
        .get((req, res) => {
            Task.findAll({where: {professor_id: req.user.id} })
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
        })
        .post((req, res) => {
            req.body.professor_id = req.user.id;
            Task.create(req.body)
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        });

    app.route("/api-school/tasks/:id")
        .all(app.authProfessor.authenticate())
        .get((req, res) => {
            Task.findOne({
                where: {
                    id: req.params.id,
                    professor_id: req.user.id
                }
             })
            .then(result => {
                if(result) {
                    res.json(result);
                } else {
                    res.status(404).json({msg: null});
                }
            })
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
        })
        .put((req, res) => {
            Task.update(req.body, {
                where: {
                    id: req.params.id,
                    professor_id: req.user.id
                }
            })
            .then(result => res.sendStatus(204))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
        })
        .delete((req, res) => {
            Task.destroy({
                where: {
                    id: req.params.id,
                    professor_id: req.user.id
                }
            })
            .then(result => res.sendStatus(204))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
        });
};