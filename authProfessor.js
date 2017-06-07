import passport from "passport";
import {Strategy, ExtractJwt} from "passport-jwt";

module.exports = app => {
    const Professor = app.db.models.Professor;
    const cfg = app.libs.config;
    const params = {
        secretOrKey: cfg.jwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeader()
    };
    const strategy = new Strategy(params, (payload, done) => {
        Professor.findById(payload.id)
            .then(professor => {
                if (professor) {
                    return done(null, {
                        id: professor.id,
                        email: professor.email
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
                return passport.authenticate("jwt", cfg.jwtSession);
            }
        };
    };
