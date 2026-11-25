import { Op } from "sequelize";
import models from "../models/index.js";
import { findPaginated } from "../utils/index.js";

const getAllCursos = async ({ page = 1, limit = 10, order = "DESC", q } = {}) =>
  await findPaginated(models.Curso, {
    page,
    limit,
    order,
    ...(q && { where: { titulo: { [Op.iLike]: `%${q}%` } } }),
  });

const getCursoById = async (id) => await models.Curso.findByPk(id);

const createCurso = async ({ titulo, descricao, cargaHoraria }) =>
  await models.Curso.create({ titulo, descricao, cargaHoraria });

const updateCurso = async (id, { titulo, descricao, cargaHoraria }) => {
  const curso = await getCursoById(id);
  if (!curso) return null;
  return await curso.update({
    ...(titulo !== undefined && { titulo }),
    ...(descricao !== undefined && { descricao }),
    ...(cargaHoraria !== undefined && { cargaHoraria }),
  });
};

const deleteCurso = async (id) => {
  const count = await models.Curso.destroy({ where: { id } });
  return count > 0;
};

export default { getAllCursos, getCursoById, createCurso, updateCurso, deleteCurso };