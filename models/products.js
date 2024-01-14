module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define("Products", {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Category",
        key: "category_id",
      },
    },
  });
  Products.associate = (models) => {
    Products.belongsTo(models.Category, {
      foreignKey: "category_id",
      onDelete: "CASCADE", // Delete products associated with the category when the category is deleted
    });
  };

  return Products;
};
