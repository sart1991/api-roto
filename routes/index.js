module.exports = app => {
    app.get("/", (req, res) => res.json(
        {status: "Welcome to the group of APIs sart1991.roto"}
    ));
};
