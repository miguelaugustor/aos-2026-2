const getSetorModel = (sequelize, { DataTypes }) => {
  const Setor = sequelize.define(
    "setor",
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      nome: { type: DataTypes.STRING, unique: true, allowNull: false, validate: { notEmpty: true } },
    },
    { tableName: "setores" }
  );

  Setor.associate = (models) => {
    Setor.hasMany(models.User, { foreignKey: "setorId", onDelete: "SET NULL" });
  };

  return Setor;
};

export default getSetorModel;