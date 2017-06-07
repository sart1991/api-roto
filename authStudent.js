import passport from "passport";
import {Strategy, ExtractJwt} from "passport-jwt";

module.exports = app => {
    const Student = app.db.models.Student;
    const cfg = app.libs.config;
    const params = {
        secretOrKey: cfg.jwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeader()
    };
    const strategy = new Strategy(params, (payload, done) => {
        Student.findById(payload.id)
            .then(student => {
                if (student) {
                    return done(null, {
                        id: student.id,
                        email: student.email
                    });
                }
                return done(null, false);
            })
            .catch(error => done(error, null));
        });
        passport.use(strategy);
        return {
            initialize: () => {
                return passport.initialize();
            },
            authenticate: () => {
                return passport.authenticate("jwts", cfg.jwtSession);
            }
        };
    };
