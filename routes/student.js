module.exports = app => {
    const Student = app.db.models.Student;

    app.get("/api-school/students/:id", (req, res) => {
        Student.findById(req.params.id, {
            attributes: ["id", "name", "email"]
        })
        .then(result => res.json(result))
        .catch(error => {
            res.status(412).json({msg: error.message});
        });
    });

    app.delete("/api-school/students/:id", (req, res) => {
        Student.destroy({where: {id: req.params.id} })
            .then(result => res.json(result))
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