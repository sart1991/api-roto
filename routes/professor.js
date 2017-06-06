module.exports = app => {
    const Professor = app.db.models.Professor;

    app.get("/api-school/professors/:id", (req, res) => {
        Professor.findById(req.params.id, {
            attributes: ["id", "name", "email"]
        })
        .then(result => res.json(result))
        .catch(error => {
            res.status(412).json({msg: error.message});
        });
    });

    app.delete("/api-school/profesors/:id", (req, res) => {
        Professor.destroy({where: {id: req.params.id} })
            .then(result => res.json(result))
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