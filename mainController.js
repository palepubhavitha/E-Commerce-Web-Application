const getUsers = (req, res) => {
  res.json({
    success: true,
    message: "Users Route Working"
  });
};

const getProducts = (req, res) => {
  res.json({
    success: true,
    message: "Products Route Working"
  });
};

const getOrders = (req, res) => {
  res.json({
    success: true,
    message: "Orders Route Working"
  });
};

module.exports = {
  getUsers,
  getProducts,
  getOrders
};