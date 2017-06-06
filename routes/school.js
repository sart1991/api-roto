module.exports = app => {
    const School = app.db.models.School;
    app.get("/api-school", (req, res) => {
        School.findAll({}).then(school => {
            res.json({school: school});
        });
    });
};