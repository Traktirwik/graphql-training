import passport from 'passport';
import { decode, TokenExpiredError, verify } from 'jsonwebtoken';
import { User } from '../models/User';
import { services } from '../graphql/services';
import ApiError from '../utils/error-handler/api-error';

const authenticate = (req: any, res: any, next: any) => {
  passport.authenticate(
    'jwt',
    { session: false },
    async (err: any, user: any, info: any) => {
      if (err || !user) {
        if (info instanceof TokenExpiredError) {
          const token = req.cookies.access_token;
          const tokenPayload = decode(token);

          if (!tokenPayload || typeof tokenPayload === 'string') {
            return res.status(401).json({ message: 'Token expired' });
          }

          // find refresh token by user id
          const refreshToken = req.cookies.refresh_token;
          if (!refreshToken) {
            return ApiError.UnauthorizedError();
          }

          const findUserInDb = await User.findByPk(tokenPayload.userId);

          if (findUserInDb?.refreshToken) {
            try {
              verify(findUserInDb.refreshToken, process.env.JWT_REFRESH_KEY);
              services.token.generateAccessToken(findUserInDb.id, res);
              return next();
            } catch (err) {
              return res.status(401).json({ message: 'Unauthorized' });
            }
          }
        }
        // обработка ошибок
        return res.status(401).json({ message: 'Unauthorized' });
      }
      next();
    }
  )(req, res, next);
};

export default {
  authenticate,
};
