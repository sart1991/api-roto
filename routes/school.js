module.exports = app => {
    const School = app.models.school;
    app.get("/api-school", (req, res) => {
        School.findAll({}, (school) => {
            res.json({school: school});
        });
    });
};