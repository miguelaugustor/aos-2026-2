const getCursoModel = (sequelize, { DataTypes }) => {
  const Curso = sequelize.define(
    "curso",
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      titulo: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
      descricao: { type: DataTypes.STRING(1000), allowNull: true },
      cargaHoraria: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1 } },
    },
    { tableName: "cursos" }
  );

  Curso.associate = (models) => {
    Curso.hasMany(models.Inscricao, { foreignKey: "cursoId", onDelete: "CASCADE" });
    Curso.belongsToMany(models.User, { through: models.Inscricao, foreignKey: "cursoId", otherKey: "userId" });
  };

  return Curso;
};

export default getCursoModel;