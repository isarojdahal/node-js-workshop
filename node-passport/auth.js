import GoogleStrategy from "passport-google-oauth20";
import passport from "passport";
import "dotenv/config";

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      //   console.log("hello");
      //   User.findOrCreate({ googleId: profile.id }, function (err, user) {

      console.log(profile);
      return cb(null, profile);
      //   });
    }
  )
);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {
  cb(null, user);
});
