const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/User"); // adjust path to your user model

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id); // or db lookup
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // check if user already exists
        let user = await User.findOne({ githubId: profile.id });
        if (!user) {
          // create new user
          user = await User.create({
            githubId: profile.id,
            username: profile.username,
            email: profile.emails?.[0]?.value || null,
          });
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

module.exports = passport;
