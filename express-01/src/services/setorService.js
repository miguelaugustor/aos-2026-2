import { Op } from "sequelize";
import models from "../models/index.js";
import { findPaginated } from "../utils/index.js";

const getAllSetores = async ({ page = 1, limit = 10, order = "DESC", q } = {}) =>
  await findPaginated(models.Setor, {
    page,
    limit,
    order,
    ...(q && { where: { nome: { [Op.iLike]: `%${q}%` } } }),
  });

const getSetorById = async (id) => await models.Setor.findByPk(id);

const createSetor = async ({ nome }) => await models.Setor.create({ nome });

const updateSetor = async (id, { nome }) => {
  const setor = await getSetorById(id);
  if (!setor) return null;
  return await setor.update({ ...(nome !== undefined && { nome }) });
};

const deleteSetor = async (id) => {
  const count = await models.Setor.destroy({ where: { id } });
  return count > 0;
};

export default { getAllSetores, getSetorById, createSetor, updateSetor, deleteSetor };