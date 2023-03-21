import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface RequestWithUserData extends Request {
  userData?: any;
}

const JWT_KEY = process.env.JWT_KEY || 'secret';

export function verifyToken(req: RequestWithUserData, res: Response, next: NextFunction) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
  const token = req.headers.authorization?.split(" ")[1]!;
  if (!token) {
    res.status(401).json({ message: "Missing authorization header" });
  }
  try {
    const decoded = jwt.verify(token, JWT_KEY);
    req.userData = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
}
