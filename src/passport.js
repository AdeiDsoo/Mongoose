import passport from "passport";
import { userManager } from "./managers/usersManager.js";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import { hashData, compareData } from "./utils.js";
import { cartsManager } from "./managers/cartsManager.js";

passport.use(
  "signup",
  new LocalStrategy(
    { usernameField: "email", passReqToCallback: true },
    async (req, email, password, done) => {
      try {
        const createdCart= await cartsManager.createOne({productsCart:[]})
        const userDB = await userManager.findByEmail(email);
        if (userDB) {
          return done(null, false);
        }
        const hashedPassword = await hashData(password);
        const createUser = await userManager.createOne({
          ...req.body,
          password: hashedPassword,
          cart: createdCart._id
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

passport.use(
  "github",
  new GithubStrategy(
    {
      clientID: "Iv1.47611ca7d5ec2a03",
      clientSecret: "2b48daf0d82ed82228cc0e7fd6e383018ca227dd",
      callbackURL: "http://localhost:8080/api/users/github",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const userDB = await userManager.findByEmail(profile.email);
        //login
        if (userDB) {
          if (userDB.from_github) {
            return null, userDB;
          } else {
            return done(null, false);
          }
        }
        //signup
        console.log(profile);
        const newUser = {
          first_name: profile.username,
          last_name: "Without Last_Name",
          email: profile.email,
          password: "constraseña",
          from_github: true,
        };
        const createUser = await userManager.createOne(newUser);
        done(null, createUser);
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
    const user = await userManager.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
