const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const medicos = require('../models/Medicos');

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, passwd1, done) => {
      // Match Email's User
      const user = await medicos.findOne({ email: email });

      if (!user) {
        return done(null, false, { message: "Usuario no encontrado." });
      } else {

        // Match Password's User
        const match = await user.matchPassword(passwd1);
        if (match) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Contraseña Inválida." });
        }
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});