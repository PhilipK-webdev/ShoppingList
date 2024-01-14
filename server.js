const express = require("express");
const app = express();
const db = require("./models");
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static("./views"));
app.get("/api/v1/categories", async (req, res) => {
  try {
    // Assume you have a Sequelize model named 'Category'
    const categoriesWithProducts = await db.Category.findAll({
      include: [db.Products],
    });

    res.json(categoriesWithProducts);
  } catch (error) {
    console.error("Error retrieving categories with products:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.post("/api/create", async (req, res) => {
  try {
    db.Category.create({
      category_name: req.body.categoryName,
    });
    res.json({ message: "DONE" });
  } catch (error) {
    console.error("Error retrieving strings:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.post("/api/createProduct", async (req, res) => {
  try {
    const { productName, categoryName } = req.body;

    // Find or create the category
    const [category, created] = await db.Category.findOrCreate({
      where: { category_name: categoryName },
    });
    console.log("id=>", category.dataValues.category_id);
    // Create the product and associate it with the category
    const product = await db.Products.create({
      product_value: productName,
      category_id: category.category_id, // Assign the category id to the product's categoryId
    });

    res.json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Error retrieving strings:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.post("/api/products", async (req, res) => {
  try {
    const categoryWithProducts = await db.Category.findByPk(1, {
      include: [db.Products],
    });

    if (categoryWithProducts) {
      // Access category and associated products
      res.json({ categoryWithProducts });
    } else {
      console.log(`Category with id ${category_id} not found.`);
    }
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).send("Internal Server Error");
  }
});
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log(`App listening at http://localhost:${PORT}`);
  });
});
