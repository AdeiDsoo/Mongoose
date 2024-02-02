import passport from "passport";
import { usersMongo } from "./DAO's/memDAO/users.mongo.js";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { hashData, compareData } from "./utils.js";
import { cartsMongo } from "./DAO's/memDAO/carts.mongo.js";
import config from "./config/config.js";
import { logger } from "./winston.js";


passport.use(
  "signup",
  new LocalStrategy(
    { usernameField: "email", passReqToCallback: true },
    async (req, email, password, done) => {
      try {
        const createdCart = await cartsMongo.createOne({ productsCart: [] });
        const userDB = await usersMongo.findByEmail(email);
        if (userDB) {
          logger.info(userDB);
          return done(null, false);
        }
        const hashedPassword = await hashData(password);
        const createUser = await usersMongo.createOne({
          ...req.body,
          password: hashedPassword,
          cart: createdCart._id,
        });
       
        done(null, createUser);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        const userDB = await usersMongo.findByEmail(email);
        logger.info(userDB);
        if (!userDB) {
          return done(null, false);
        }
        const isValid = await compareData(password, userDB.password);
        if (!isValid) {
          return done(null, false);
        }
        done(null, userDB);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "github",
  new GithubStrategy(
    {
      clientID: config.github_client_id,
      clientSecret: config.github_client_secret,
      callbackURL: config.github_callback_url,
      scope: ["user:email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const userEmail =
          profile.emails && profile.emails.length > 0
            ? profile.emails[0].value
            : null;

     
        const userDB = await usersMongo.findByEmail(userEmail);

        if (userDB) {

          if (userDB.from_github) {
            return done(null, userDB);
          } else {
            return done(null, false, {
              message: "Usuario existente pero no de GitHub.",
            });
          }
        }

        const createdCart = await cartsMongo.createOne({ productsCart: [] });
        const newUser = {
          first_name: profile._json.login,
          email: userEmail || profile._json.email || profile.emails[0].value,
          password: " ",
          from_github: true,
          cart: createdCart._id,
        };

        const createdUser = await usersMongo.createOne(newUser);
        done(null, createdUser);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: config.google_client_id,
      clientSecret: config.google_client_secret,
      callbackURL: config.google_callback_url,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await usersMongo.findByEmail(profile._json.email);
        logger.info(user, "google");
        if (user) {
          if (user.from_google) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        }
        const createdCart = await cartsMongo.createOne({ productsCart: [] });

        const infoUser = {
          first_name: profile._json.given_name,
          last_name: profile._json.family_name,
          email: profile._json.email,
          password: "",
          from_google: true,
          cart: createdCart._id,
        };

        const createdUser = await usersMongo.createOne(infoUser);
        done(null, createdUser);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await usersMongo.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
