import bodyParser from "body-parser";

module.exports = app => {
    app.set("port", 8080);
    app.use(bodyParser.json());
    app.use(app.authProfessor.initialize())
    app.use(app.authStudent.initialize())
    app.use((req, res, next) => {
        delete req.body.id;
        next();
    });
};