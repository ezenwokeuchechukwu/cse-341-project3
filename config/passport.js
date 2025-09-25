// config/passport.js
const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;
const User = require("../models/User");

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Find if user already exists
        let user = await User.findOne({ githubId: profile.id });

        if (!user) {
          // Create new user
          user = new User({
            githubId: profile.id,
            name: profile.displayName || profile.username,
            email: profile.emails && profile.emails[0]?.value, // may be undefined
          });
          await user.save();
        }

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

// Serialize user to session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
