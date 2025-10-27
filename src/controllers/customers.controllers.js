import { Customers } from "../models/customers.js";

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
    phone,
    surname,
    tax_key,
  } = req.body;
  try {
    const newCustomer = await Customers.create({
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
      phone,
      surname,
      tax_key,
    });
    res.json(newCustomer);
  } catch (error) {
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
      "phone",
      "surname",
      "tax_key",
    ];

    // Construye el payload sólo con campos permitidos y definidos (PATCH)
    const data = Object.fromEntries(
      allowed.map((k) => [k, req.body[k]]).filter(([, v]) => v !== undefined)
    );

    if (Object.keys(data).length === 0) {
      return res.status(400).json({ message: "No valid fields to update" });
    }

    await customer.update(data); // corre validaciones/hooks de instancia
    return res.status(200).json(customer);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
