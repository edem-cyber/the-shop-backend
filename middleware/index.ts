import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const app = express();

// Middleware for validating JWT
const validateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, 'your-secret-key', (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

    //   req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Use the middleware on routes that need protection
app.get('/protected', validateJWT, (req, res) => {
  res.sendStatus(200);
});