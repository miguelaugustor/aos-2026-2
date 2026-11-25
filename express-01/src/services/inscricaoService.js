import models from "../models/index.js";
import { AppError, findPaginated } from "../utils/index.js";

const includeRelacoes = [
  { model: models.User, attributes: ["id", "username", "email"] },
  { model: models.Curso, attributes: ["id", "titulo", "cargaHoraria"] },
];

const getAllInscricoes = async ({
  page = 1,
  limit = 10,
  order = "DESC",
  status,
  userId,
  cursoId,
} = {}) =>
  await findPaginated(models.Inscricao, {
    page,
    limit,
    order,
    include: includeRelacoes,
    where: {
      ...(status && { status }),
      ...(userId && { userId }),
      ...(cursoId && { cursoId }),
    },
  });

const getInscricaoById = async (id) =>
  await models.Inscricao.findByPk(id, { include: includeRelacoes });

const createInscricao = async ({ userId, cursoId, status }) => {
  const [user, curso] = await Promise.all([
    models.User.findByPk(userId),
    models.Curso.findByPk(cursoId),
  ]);
  if (!user) throw new AppError("Funcionário não encontrado.", 404);
  if (!curso) throw new AppError("Curso não encontrado.", 404);
  const created = await models.Inscricao.create({
    userId,
    cursoId,
    ...(status && { status }),
  });
  return await getInscricaoById(created.id);
};

const updateInscricao = async (id, { status }) => {
  const inscricao = await models.Inscricao.findByPk(id);
  if (!inscricao) return null;
  await inscricao.update({ status });
  return await getInscricaoById(id);
};

const deleteInscricao = async (id) => {
  const count = await models.Inscricao.destroy({ where: { id } });
  return count > 0;
};

export default {
  getAllInscricoes,
  getInscricaoById,
  createInscricao,
  updateInscricao,
  deleteInscricao,
};