const getInscricaoModel = (sequelize, { DataTypes }) => {
  const Inscricao = sequelize.define(
    "inscricao",
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      userId: { type: DataTypes.UUID, allowNull: false },
      cursoId: { type: DataTypes.UUID, allowNull: false },
      status: {
        type: DataTypes.ENUM("PENDENTE", "EM_ANDAMENTO", "CONCLUIDO"),
        allowNull: false,
        defaultValue: "PENDENTE",
      },
    },
    {
      tableName: "inscricoes",
      indexes: [{ unique: true, fields: ["userId", "cursoId"] }],
    }
  );

  Inscricao.associate = (models) => {
    Inscricao.belongsTo(models.User, { foreignKey: "userId", onDelete: "CASCADE" });
    Inscricao.belongsTo(models.Curso, { foreignKey: "cursoId", onDelete: "CASCADE" });
  };

  return Inscricao;
};

export default getInscricaoModel;