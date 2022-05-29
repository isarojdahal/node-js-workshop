import express from "express";
import passport from "passport";
import "./auth.js";
import session from "express-session";
import "dotenv/config";
const { SESSION_SECRET } = process.env;

const app = express();
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

function validateLogin(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

app.get("/", (req, res) => {
  res.send("<a href='auth/google'>Sign up with Google </a>");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/error",
  })
);

app.get("/dashboard", validateLogin, (req, res) => {
  res.send("Hello from dashboard");
});

app.get("/auth/error", (req, res) => {
  res.send("Error occured");
});

app.get("/dashboard/logout", (req, res) => {
  req.logout((err) => {
    if (err) throw error;
    else {
      req.session.destroy();
      res.redirect("/");
    }
  });
});
//
app.listen(8000, () => {
  console.log("Server has Started");
});
