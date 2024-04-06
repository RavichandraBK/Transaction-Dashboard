const product = require("../Models/products");
const axios = require("axios");
exports.searchProd = async (req, res, next) => {
  try {
    const { searchText, pageNo = 1, month } = req.body;
    console.log(req.body);
    let totalPages = 0;
    const tmpDate = `1 ${month} 2000`;
    const date = new Date(tmpDate);
    const chkDate = date.getMonth();

    let query = {};

    query = searchText
      ? {
          $expr: {
            $eq: [{ $month: { $toDate: "$dateOfSale" } }, chkDate + 1],
          },
          $or: [
            { title: { $regex: searchText, $options: "i" } },
            { description: { $regex: searchText, $options: "i" } },
            ...(isNaN(searchText) ? [] : [{ price: parseFloat(searchText) }]),
          ],
        }
      : {
          $expr: {
            $eq: [{ $month: { $toDate: "$dateOfSale" } }, chkDate + 1],
          },
        };
    const pipe1 = [
      {
        $match: query,
      },
      { $limit: 10 },
      { $skip: (pageNo - 1) * 10 },
    ];
    const pipe2 = [
      {
        $match: query,
      },
      {
        $count: "totalDocs",
      },
    ];
    const totalProds = await product.aggregate(pipe2);
    totalPages =
      totalProds.length > 0 ? Math.ceil(totalProds[0].totalDocs / 10) : 0;
    const items = await product.aggregate(pipe1);
    res.json({
      items,
      totalPages,
      hasNextPage: pageNo < totalPages,
      hasPrevPage: pageNo > 1,
    });
  } catch (err) {
    next(err);
  }
};

exports.stats = async (req, res, next) => {
  try {
    const { month } = req.body;
    const tmpDate = `1 ${month} 2000`;
    const date = new Date(tmpDate);
    const chkDate = date.getMonth();
    const pipe = [
      {
        $match: {
          $expr: {
            $eq: [{ $month: { $toDate: "$dateOfSale" } }, chkDate + 1],
          },
        },
      },
      {
        $group: {
          _id: null,
          totalSaleAmount: { $sum: "$price" }, // Calculate total sale amount
          totalSoldItems: {
            $sum: {
              $cond: [{ $eq: ["$sold", true] }, 1, 0], // Calculate total number of sold items
            },
          },
          totalNotSoldItems: {
            $sum: {
              $cond: [{ $eq: ["$sold", false] }, 1, 0], // Calculate total number of not sold items
            },
          },
        },
      },
      {
        $project: {
          _id: 0, // Exclude _id field
          totalSaleAmount: 1,
          totalSoldItems: 1,
          totalNotSoldItems: 1,
        },
      },
    ];
    const saleStat = await product.aggregate(pipe);
    res.json({
      message: "Successfully fetched the statisticks",
      statData: saleStat[0],
    });
  } catch (err) {
    next(err);
  }
};
exports.barChartData = async (req, res, next) => {
  try {
    const { month } = req.body;

    const tmpDate = `1 ${month} 2000`;
    const date = new Date(tmpDate);
    const chkDate = date.getMonth();

    const priceRanges = [
      { min: 0, max: 100 },
      { min: 101, max: 200 },
      { min: 201, max: 300 },
      { min: 301, max: 400 },
      { min: 401, max: 500 },
      { min: 501, max: 600 },
      { min: 601, max: 700 },
      { min: 701, max: 800 },
      { min: 801, max: 900 },
      { min: 901, max: Infinity },
    ];

    const pipe = [
      {
        $match: {
          $expr: {
            $eq: [{ $month: { $toDate: "$dateOfSale" } }, chkDate + 1],
          },
        },
      },
      {
        $group: {
          _id: null,
          counts: {
            $push: {
              $switch: {
                branches: priceRanges.map(({ min, max }, index) => ({
                  case: {
                    $and: [
                      { $gte: ["$price", min] },
                      { $lte: ["$price", max] },
                    ],
                  },
                  then: index,
                })),
                default: priceRanges.length - 1,
              },
            },
          },
        },
      },
      {
        $unwind: "$counts",
      },
      {
        $group: {
          _id: "$counts",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ];

    const result = await product.aggregate(pipe);

    // Create labels for the price ranges
    const countsMap = {};

    // Initialize counts for each range to 0
    priceRanges.forEach(({ min, max }) => {
      countsMap[`${min}-${max === Infinity ? "above" : max}`] = {
        name: `${min}-${max === Infinity ? "above" : max}`,
        count: 0,
      };
    });

    // Update counts based on the aggregation result
    result.forEach(({ _id, count }) => {
      const range = priceRanges[_id];
      countsMap[
        `${range.min}-${range.max === Infinity ? "above" : range.max}`
      ].count = count;
    });

    // Extracting responseData from countsMap
    const responseData = Object.values(countsMap);

    res.json(responseData);
  } catch (err) {
    next(err);
  }
};
exports.pieChartData = async (req, res, next) => {
  try {
    const { month } = req.body;

    const tmpDate = `1 ${month} 2000`;
    const date = new Date(tmpDate);
    const chkDate = date.getMonth();
    const pipe = [
      {
        $match: {
          $expr: {
            $eq: [{ $month: { $toDate: "$dateOfSale" } }, chkDate + 1],
          },
        },
      },
      {
        $group: {
          _id: "$category",
          items: { $sum: 1 },
        },
      },
      {
        $project: {
          category: "$_id",
          items: 1,
          _id: 0,
        },
      },
    ];
    const result = await product.aggregate(pipe);

    res.json(result);
  } catch (err) {
    next(err);
  }
};
exports.combinedData = async (req, res, next) => {
  try {
    const { month } = req.body;
    const url = "https://transaction-dashboard-tmi7.onrender.com/api/products";

    const [statsResponse, barChartDataResponse, pieChartDataResponse] =
      await Promise.all([
        axios.post(`${url}/stats`, { month }),
        axios.post(`${url}/bar-data`, { month }),
        axios.post(`${url}/pie-data`, { month }),
      ]);

    const statsData = statsResponse.data.statData;
    const barChartData = barChartDataResponse.data;
    const pieChartData = pieChartDataResponse.data;

    const combinedData = {
      stats: statsData,
      barChartData: barChartData,
      pieChartData: pieChartData,
    };

    // Send the combined data as the response
    res.json({ message: "Combined data", combinedData });
  } catch (err) {
    next(err);
  }
};
