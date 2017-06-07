module.exports = app => {
    const Student = app.db.models.Student;

    app.route("/api-school/student")
        .all(app.authStudent.authenticate)
        .get((req, res) => {
            Student.findById(req.studentId, {
                attributes: ["id", "name", "email"]
            })
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
        })
        .delete((req, res) => {
            Student.destroy({where: {id: req.studentId} })
                .then(result => res.sendStatus(204))
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        });

    app.post("/api-school/students", (req, res) => {
        Student.create(req.body)
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    });
};