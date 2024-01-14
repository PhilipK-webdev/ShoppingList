module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Category.associate = (models) => {
    Category.hasMany(models.Products, { foreignKey: "category_id" });
  };
  return Category;
};
