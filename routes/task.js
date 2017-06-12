module.exports = app => {
    const Task = app.db.models.Task;
    const Student = app.db.models.Student;
    const Course = app.db.models.Course;
    app.route("/api-school/tasks")
        .all(app.authProfessor.authenticate)
        .get((req, res) => {
            console.log("get Json headers: " + req.headers);
            Task.findAll({
                where: {professor_id: req.professorId},
                attributes: ["id", "name", "grade_point", "student_id"],
                include: [
                        {model: Student, attributes: ["name"]},
                        {model: Course, attributes: ["name"]}
                    ]
            })
            .then(resultT => {
                res.json(resultT);
            })
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
        })
        .post((req, res) => {
            req.body.professor_id = req.professorId;
            console.log("Json body: " + req.body);
            Task.create(req.body)
                .then(result => res.json(result))
                .catch(error => {
                    console.log("Post error: " + error.message);
                    res.status(412).json({msg: error.message});
                });
        });

    app.route("/api-school/tasks/:id")
        .all(app.authProfessor.authenticate)
        .get((req, res) => {
            Task.findOne({
                where: {
                    id: req.params.id,
                    professor_id: req.professorId
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
                    professor_id: req.professorId
                }
            })
            .then(result => res.sendStatus(200))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
        })
        .delete((req, res) => {
            Task.destroy({
                where: {
                    id: req.params.id,
                    professor_id: req.professorId
                }
            })
            .then(result => {res.status(200).json({})})
            .catch(error => {
                console.log("Delete error: " + error.message);
                res.status(412).json({msg: error.message});
            });
        });
};