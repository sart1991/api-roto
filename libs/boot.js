module.exports = app => {
    app.db.sync().done(() => {
        app.listen(app.get("port"), () => {
            console.log(`Group of APIs working on - port: ${app.get("port")} `);
        });
    });
};