const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const Excel = require("exceljs");
const { unlink } = require("node:fs/promises");
const { PassThrough } = require("stream");

const { cloudinary } = require("../cloudinary");

const User = require("../models/userModel");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");

// ADVISER
//ADVISER CRUD
module.exports.createAdviser = asyncHandler(async (req, res) => {
  const data = req.body.adviser;
  data.userType = "Adviser";
  data.username = data.email;
  data.deleted = false;
  const password = req.body.password;
  const adviser = await User.register(data, password);
  const currentUser = await User.findById(req.user._id);
  adviser.user = currentUser;
  await adviser.save();
  res.status(201).json({ message: "Adviser created" });
});

module.exports.viewAdvisers = asyncHandler(async (req, res) => {
  if (req.query.all) {
    const advisers = await User.find({ userType: "Adviser" });
    res.json({ advisers });
  } else {
    const pageSize = Number(req.query.pageSize);
    const page = Number(req.query.pageNumber) || 1;
    const sort = req.query.sort;
    const order = req.query.order;
    var sortCondition = {};
    if (sort && order && (order === "ascending" || order === "descending")) {
      switch (sort) {
        case "name":
          sortCondition[sort] = order === "ascending" ? 1 : -1;
          break;
        case "skuTrep":
          sortCondition[sort] = order === "ascending" ? 1 : -1;
          break;
        case "brand":
          sortCondition[sort] = order === "ascending" ? 1 : -1;
          break;
        case "countInStock":
          sortCondition[sort] = order === "ascending" ? 1 : -1;
          break;
      }
    }
    const keywordSkuTrep = req.query.keyword
      ? {
          skuTrep: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const keywordName = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const count = await User.countDocuments({
      $and: [
        { deleted: false },
        { userType: "Adviser" },
        {
          $or: [{ ...keywordSkuTrep }, { ...keywordName }],
        },
      ],
    });

    const advisers = await User.find({
      $and: [
        { deleted: false },
        { userType: "Adviser" },
        {
          $or: [{ ...keywordSkuTrep }, { ...keywordName }],
        },
      ],
    })
      .sort(sortCondition)
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.json({ advisers, page, pages: Math.ceil(count / pageSize) });
  }
});

module.exports.viewAdviser = asyncHandler(async (req, res) => {
  const adviser = await User.findById(req.params.id);
  if (adviser) {
    res.json(adviser);
  } else {
    res.status(404);
    throw new Error("Adviser not found");
  }
});

module.exports.editAdviser = asyncHandler(async (req, res) => {
  const data = req.body.adviser;
  data.username = data.email;
  const password = req.body.password;
  const adviser = await User.findByIdAndUpdate({ _id: req.params.id }, data);
  if (password) {
    await adviser.setPassword(password, function (err, user) {
      adviser.save();
    });
  }
  await adviser.save();
  res.status(201).json(adviser);
});

module.exports.deleteAdviser = asyncHandler(async (req, res) => {
  const adviser = await User.findById(req.params.id);
  adviser.deleted = true;
  await adviser.save();
  res.json({ message: "Adviser deleted" });
});

// PRODUCT
//PRODUCT CRUD
module.exports.createProduct = asyncHandler(async (req, res) => {
  const data = req.body;
  
  const product = new Product(data);
  product.deleted = false;
  
  if (req.file) {
    const { path } = req.file;
    const { secure_url } = await cloudinary.uploader.upload( path );
    product.image = secure_url;
  } else {
    product.image = "";
  }
  
  await product.save();
  res.status(201).json({ message: "Product created" });
});

module.exports.viewProducts = asyncHandler(async (req, res) => {
  if (req.query.all) {
    const products = await Product.find().populate('adviser', 'name');
    res.json({ products });
  } else {
    const pageSize = Number(req.query.pageSize);
    const page = Number(req.query.pageNumber) || 1;
    const sort = req.query.sort;
    const order = req.query.order;
    var sortCondition = {};
    if (sort && order && (order === "ascending" || order === "descending")) {
      switch (sort) {
        case "name":
          sortCondition[sort] = order === "ascending" ? 1 : -1;
          break;
        case "skuTrep":
          sortCondition[sort] = order === "ascending" ? 1 : -1;
          break;
        case "brand":
          sortCondition[sort] = order === "ascending" ? 1 : -1;
          break;
        case "countInStock":
          sortCondition[sort] = order === "ascending" ? 1 : -1;
          break;
      }
    }
    const keywordSkuTrep = req.query.keyword
      ? {
          skuTrep: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const keywordName = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const count = await Product.countDocuments({
      $and: [
        { deleted: false },
        {
          $or: [{ ...keywordSkuTrep }, { ...keywordName }],
        },
      ],
    });

    const products = await Product.find({
      $and: [
        { deleted: false },
        {
          $or: [{ ...keywordSkuTrep }, { ...keywordName }],
        },
      ],
    })
      .populate('adviser', 'name')
      .sort(sortCondition)
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  }
});

module.exports.viewProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

module.exports.editProduct = asyncHandler(async (req, res) => {
  const data = req.body;
  const product = await Product.findByIdAndUpdate({ _id: req.params.id }, data);

  if (req.file) {
    // Limpiar imágen previas
    if (product.image) {
      const nombreArr = product.image.split('/');
      const nombre = nombreArr[ nombreArr.length - 1 ];
      const [ public_id ] = nombre.split('.');
      cloudinary.uploader.destroy( public_id );
    }

    const { path } = req.file;
    const { secure_url } = await cloudinary.uploader.upload( path );
    product.image = secure_url;
  }

  await product.save();
  res.status(201).json(product);
});

module.exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  product.deleted = true;
  
  // Limpiar imágen previas
  if (product.image) {
    const nombreArr = product.image.split('/');
    const nombre = nombreArr[ nombreArr.length - 1 ];
    const [ public_id ] = nombre.split('.');
    cloudinary.uploader.destroy( public_id );
  }
  
  await product.save();
  res.json({ message: "Product deleted" });
});

// ORDER
//ORDER CRUD
module.exports.createOrder = asyncHandler(async (req, res) => {
  const data = req.body.order;
  
  const order = new Order(data);
  order.deleted = false;
  order.shippingCompany = "";
  order.trackingNumber = "";

  await order.save();
  res.status(201).json({ message: "Order created" });
});

module.exports.viewOrders = asyncHandler(async (req, res) => {
  let condition = {}
  if (req.user.userType === "Adviser") {
    condition = { adviser: req.user._id }
  }

  if (req.query.all) {
    const orders = await Order.find().populate({
      path: 'product',
      match: condition
    });
    res.json({ orders });
  } else {
    const pageSize = Number(req.query.pageSize);
    const page = Number(req.query.pageNumber) || 1;
    const sort = req.query.sort;
    const order = req.query.order;
    var sortCondition = {};
    if (sort && order && (order === "ascending" || order === "descending")) {
      switch (sort) {
        case "name":
          sortCondition[sort] = order === "ascending" ? 1 : -1;
          break;
        case "skuTrep":
          sortCondition[sort] = order === "ascending" ? 1 : -1;
          break;
        case "brand":
          sortCondition[sort] = order === "ascending" ? 1 : -1;
          break;
        case "countInStock":
          sortCondition[sort] = order === "ascending" ? 1 : -1;
          break;
      }
    }
    const keywordSkuTrep = req.query.keyword
      ? {
          skuTrep: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const keywordName = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const count = await Order.countDocuments({
      $and: [
        { deleted: false },
        {
          $or: [{ ...keywordSkuTrep }, { ...keywordName }],
        },
      ],
    });

    const orders = await Order.find({
      $and: [
        { deleted: false },
        {
          $or: [{ ...keywordSkuTrep }, { ...keywordName }],
        },
      ],
    })
      .populate({
        path: 'product',
        match: condition
      })
      .sort(sortCondition)
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.json({ orders, page, pages: Math.ceil(count / pageSize) });
  }
});

module.exports.viewOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

module.exports.editOrder = asyncHandler(async (req, res) => {
  const data = req.body.order;

  const order = await Order.findByIdAndUpdate({ _id: req.params.id }, data);
  await order.save();
  
  res.status(201).json(order);
});

module.exports.deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  order.deleted = true;
  
  await order.save();
  res.json({ message: "Order deleted" });
});
