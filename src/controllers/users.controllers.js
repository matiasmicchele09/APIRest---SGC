import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET, SALT_ROUNDS } from "../config.js";
import { cookieOptions } from "../helpers/cookies.js";
import { Users } from "../models/users.js";

export const createUsers = async (req, res) => {
  const { email, password, id_rol } = req.body;

  const user = await Users.findOne({
    where: {
      email: email,
      // password: pass
    },
  });

  if (user) return res.status(409).json({ message: "User already exists" });

  //const hashPassword = bcrypt.hashSync(password, SALT_ROUNDS); // el hashSync -> bloquea el código hasta que termine de hashear la contraseña
  //porque bloquea el thread principal, por eso se usa el hash, que es asincrónico y que por lo tanto, funciona con una promesa
  const hashPassword = await bcrypt.hash(password, SALT_ROUNDS);
  try {
    const newUser = await Users.create({
      email: email,
      password: hashPassword,
      id_rol: id_rol,
    });
    res.json(newUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await Users.findOne({
      where: {
        email: email,
      },
    });

    if (!user) return res.status(404).json({ message: "Usuario no existe" });

    //No desencripta la pass del user, sino que encrypta la pass que le pasamos y la compara con la pass encriptada que tiene el user
    const isValid = await bcrypt.compare(pass, user.password);
    if (!isValid)
      return res
        .status(401)
        .json({ message: "Usuario y/o contraseña incorrectos" });

    //En la firma (sign) del token, guardo la información que quiero que tenga el token
    //El SECRECT_KEY lo guardo en un archivo .env, para que no se vea en el código
    const token = jwt.sign(
      {
        id_user: user.id_user,
        email: user.email,
        id_rol: user.id_rol,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    //const isProd = process.env.NODE_ENV === "production";
    const opts = { ...cookieOptions(req) };

    const { password, ...userData } = user.dataValues;
    res.cookie("access_token", token, {
      ...opts,
      maxAge: 1000 * 60 * 60, //la cookie solo tiene validez por una hora
    });
    res.json(userData); //Esto es para que no devuelva la pass en el json, tambien podría sacar el id y el rol, pero por ahora saco solo la pass
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// export const logOut = async (req, res) => {
//   //res.clearCookie('access_token');
//   res.clearCookie("access_token", {
//     httpOnly: true,
//     secure: true,
//     sameSite: "none",
//   });
//   res.json({ message: "Logged out" });
// };

// users.controllers.js
export const logOut = (req, res) => {
  const opts = { ...cookieOptions(req) };
  res.clearCookie("access_token", {
    ...opts,
  });

  // Fallback por si algún proxy no respeta clearCookie
  res.cookie("access_token", "", {
    ...opts,
    expires: new Date(0),
    maxAge: 0,
  });
  res.json({ message: "Logged out" });
};

export const getUser = async (req, res) => {
  try {
    const userFound = await Users.findOne({
      where: {
        id_user: req.params.id,
      },
    });
    if (!userFound)
      return res.status(404).json({ message: "User does not exist" });
    const { password, ...userData } = userFound.dataValues;
    res.json(userData);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUsers = async (req, res) => {
  try {
    //Genero un arreglo de usuarios y lo envío al cliente
    const users = await Users.findAll();
    res.json(users);
    // console.log(users)
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, password, id_rol, name, surname } = req.body;

  console.log(id, req.body.password);

  try {
    //Busco user
    const user = await Users.findByPk(id);

    //Actualizo datos
    user.email = email;
    if (password !== undefined) {
      const hashPassword = await bcrypt.hash(password, SALT_ROUNDS);
      user.password = hashPassword;
    }
    user.id_rol = id_rol;
    user.name = name;
    user.surname = surname;

    //Guardo en la base de datos
    await user.save();

    res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await Users.destroy({
      where: {
        id_user: id,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUserByRol = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findAll({
      where: {
        id_rol: id,
      },
    });
    if (!user) return res.status(404).json({ message: "User does not exist" });
    res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
