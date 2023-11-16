import passport from "passport";
import { userManager } from "./managers/usersManager.js";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { hashData, compareData } from "./utils.js";
import { cartsManager } from "./managers/cartsManager.js";
import config from "./config.js";

passport.use(
  "signup",
  new LocalStrategy(
    { usernameField: "email", passReqToCallback: true },
    async (req, email, password, done) => {
      try {
        const createdCart = await cartsManager.createOne({ productsCart: [] });
        const userDB = await userManager.findByEmail(email);
        if (userDB) {
          return done(null, false);
        }
        const hashedPassword = await hashData(password);
        const createUser = await userManager.createOne({
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
        const userDB = await userManager.findByEmail(email);
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

// passport.use(
//   "github",
//   new GithubStrategy(
//     {
//       clientID: config.github_client_id,
//       clientSecret: config.github_client_secret,
//       callbackURL: "http://localhost:8080/api/sessions/github",
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         const userDB = await userManager.findByEmail(profile.email);
//         //login
//         if (userDB) {
//           if (userDB.from_github) {
//             return null, userDB;
//           } else {
//             return done(null, false);
//           }
//         }
//         //signup
//         console.log(profile);
//         const newUser = {
//           first_name: profile.username,
//           last_name: "Without Last_Name",
//           email: profile.email,
//           password: "constraseña",
//           from_github: true,
//         };
//         const createUser = await userManager.createOne(newUser);
//         done(null, createUser);
//       } catch (error) {
//         done(error);
//       }
//     }
//   )
// );

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
      console.log(profile, 'json');
      try {
        const userEmail = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;

        const userDB = await userManager.findByEmail(profile._json.email);
        // login
        if (userDB) {
          if (userDB.from_github) {
            return done(null, userDB);
          } else {
            return done(null, false);
          }
        }
        // signup
        const newUser = {
          first_name: profile._json.login,
          // last_name: profile._json.name.split(" ")[1] || "",
          email: userEmail || profile._json.email || profile.emails[0].value,
          password: " ",
          from_github: true,
        };
        const createdUser = await userManager.createOne(newUser);
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
        const user = await userManager.findByEmail(profile._json.email);
     
        if (user) {
          if (user.fromGoogle) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        }
        const createdCart = await cartsManager.createOne({ productsCart: [] });

        const infoUser = {
          first_name: profile._json.given_name,
          last_name: profile._json.family_name,
          email: profile._json.email,
          password: " ",
          from_google: true,
          cart: createdCart._id,
        };

        const createdUser = await userManager.createOne(infoUser);
        done(null, createdUser);
      } catch (error) {
        done(error);
      }

      // done(null, false);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await userManager.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
