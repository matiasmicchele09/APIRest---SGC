import { Op } from "sequelize";
import { Customers } from "../models/customers.js";

const normalizeCuit = (value) => {
  if (typeof value !== "string") return value;
  return value.replace(/\D/g, "");
};

const isUniqueConstraintError = (error) =>
  error?.name === "SequelizeUniqueConstraintError";

export const getAll = async (req, res) => {
  const id_user = parseInt(req.query.id_user);
  //console.log(req.query.id_user);
  try {
    const customers = await Customers.findAll({
      where: {
        id_user: id_user,
      },
    });
    res.json(customers);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createCustomers = async (req, res) => {
  //* Saco el "id" del body para que no intente crearlo manualmente, ya que es auto incremental
  const {
    active,
    activity,
    address,
    city,
    created_at,
    cuit,
    deactivated_at,
    email,
    hasDREI,
    id_bank,
    id_province,
    id_sex,
    id_user,
    id_tax_condition,
    id_type,
    name,
    nro_cuenta_DREI,
    nro_reg_DREI,
    observations,
    phone,
    surname,
    tax_key,
  } = req.body;
  const parsedUserId = Number(id_user);
  const normalizedCuit = normalizeCuit(cuit);

  if (!Number.isInteger(parsedUserId)) {
    return res.status(400).json({ message: "Invalid id_user" });
  }

  if (!normalizedCuit) {
    return res.status(400).json({ message: "CUIT is required" });
  }

  try {
    const existingCustomer = await Customers.findOne({
      where: {
        id_user: parsedUserId,
        cuit: normalizedCuit,
      },
    });

    if (existingCustomer) {
      return res.status(409).json({
        message: "A customer with this CUIT already exists for this user",
      });
    }

    const newCustomer = await Customers.create({
      active,
      activity,
      address,
      city,
      created_at,
      cuit: normalizedCuit,
      deactivated_at,
      email,
      hasDREI,
      id_bank,
      id_province,
      id_sex,
      id_user: parsedUserId,
      id_tax_condition,
      id_type,
      name,
      nro_cuenta_DREI,
      nro_reg_DREI,
      phone,
      surname,
      tax_key,
      observations,
    });
    res.json(newCustomer);
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      return res.status(409).json({
        message: "A customer with this CUIT already exists for this user",
      });
    }

    return res.status(500).json({ message: error.message });
  }
};

export const updateCustomers = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const customer = await Customers.findByPk(id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Lista blanca de campos permitidos. Saco el id porque no se debe actualizar
    const allowed = [
      "active",
      "activity",
      "address",
      "city",
      "cuit",
      "email",
      "hasDREI",
      "id_bank",
      "id_province",
      "id_sex",
      "id_tax_condition",
      "id_type",
      "name",
      "nro_cuenta_DREI",
      "nro_reg_DREI",
      "observations",
      "phone",
      "surname",
      "tax_key",
    ];

    // Construye el payload sólo con campos permitidos y definidos (PATCH)
    const data = Object.fromEntries(
      allowed.map((k) => [k, req.body[k]]).filter(([, v]) => v !== undefined),
    );

    if (data.cuit !== undefined) {
      data.cuit = normalizeCuit(data.cuit);

      if (!data.cuit) {
        return res.status(400).json({ message: "CUIT is required" });
      }
    }

    if (Object.keys(data).length === 0) {
      return res.status(400).json({ message: "No valid fields to update" });
    }

    if (data.cuit !== undefined) {
      const existingCustomer = await Customers.findOne({
        where: {
          id_user: customer.id_user,
          cuit: data.cuit,
          id: {
            [Op.ne]: id,
          },
        },
      });

      if (existingCustomer) {
        return res.status(409).json({
          message: "A customer with this CUIT already exists for this user",
        });
      }
    }

    await customer.update(data); // corre validaciones/hooks de instancia
    return res.status(200).json(customer);
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      return res.status(409).json({
        message: "A customer with this CUIT already exists for this user",
      });
    }

    return res.status(500).json({ message: error.message });
  }
};
