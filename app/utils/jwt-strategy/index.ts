import { Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt';
import { User } from '../../models/User';
import dotenv from 'dotenv';

dotenv.config();

const cookieExtractor = (req: any) => {
  let jwt = null;

  if (req && req.cookies) {
    jwt = req.cookies['access_token'];
  }

  return jwt;
};

const jwtOptions: StrategyOptions = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_ACCESS_KEY,
};

export const jwtStrategy = new JwtStrategy(
  jwtOptions,
  async (payload, done) => {
    try {
      const user = await User.findByPk(payload.userId);

      if (!user) {
        return done(null, false);
      }
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  }
);
