// import jwt from 'jsonwebtoken';
// import { JWT_SECRET } from './../config.js';

// export const validationToken = (req, res, next) => {
//     const token = req.cookies.access_token;

//     if (!token) {
//         return res.status(401).json({ message: 'Unauthorized (no token)' });
//     }

//     try {
//         const data = jwt.verify(token, JWT_SECRET);
//         req.user = data;
//         next() //seguir a la siguiente ruta o middleware
//     } catch (error) {
//         return res.status(401).json({message: 'Unauthorized'})
//     }
// }
// middlewares/validationToken.js
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

export function validationToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ message: "Invalid auth header format" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
