export function cookieOptions(req) {
  //const isProd = process.env.NODE_ENV === "production";
  const isProd = true;

  return {
    httpOnly: true, //Solo se puede acceder al token desde el servidor, no vas a poder acceder al token desde el cliente o desde javascript
    sameSite: "none", // si hay front/back en dominios distintos
    secure: isProd, // true sólo en HTTPS (prod)
    path: "/", // SIEMPRE explícito
  };
}
