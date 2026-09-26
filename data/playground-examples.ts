export const playgroundExamples: Record<number, string> = {
1: `// Document بسيط يشبه JavaScript Object
const product = {
  name: "iPhone",
  price: 4200,
  stock: 8
}

product`,
2: `// تخيل أن التطبيق يتصل بالـ MongoDB Server
// هذا مثال توضيحي للمسار وليس اتصالًا حقيقيًا داخل المتصفح
db.products.find({})`,
3: `// BSON / ObjectId / nested document
db.products.find({
  "specs.storage": 256
})`,
4: `db.products.insertOne({
  name: "AirPods",
  price: 850,
  stock: 12,
  category: "accessories",
  active: true,
  tags: ["apple"],
  specs: { color: "white" }
})`,
5: `db.products.find(
  { price: { $gte: 1000 } },
  { name: 1, price: 1, _id: 0 }
)`,
6: `db.products.find({
  $and: [
    { price: { $gte: 1000, $lte: 5000 } },
    { category: { $in: ["phones", "laptops"] } }
  ]
})`,
7: `db.products.find({
  "specs.storage": 256
})`,
8: `db.products.updateOne(
  { name: "iPhone" },
  {
    $inc: { stock: -1 },
    $addToSet: { tags: "featured" }
  }
)`,
9: `db.products.deleteOne({
  name: "Mouse"
})`,
10: `db.products
  .find({ active: true })
  .sort({ price: -1 })
  .skip(0)
  .limit(2)`,
11: `// مثال على Access Pattern
// نبحث عن كل المنتجات داخل category محددة
db.products.find({
  category: "phones"
})`,
12: `db.orders.aggregate([
  { $match: { status: "completed" } },
  { $group: { _id: null, revenue: { $sum: "$total" } } }
])`,
13: `db.orders.aggregate([
  { $match: { status: "completed" } },
  { $project: { _id: 0, total: 1, createdAt: 1 } }
])`,
14: `db.orders.aggregate([
  {
    $group: {
      _id: "$status",
      count: { $sum: 1 },
      average: { $avg: "$total" }
    }
  }
])`,
15: `db.orders.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "user"
    }
  },
  { $unwind: "$user" }
])`,
16: `db.orders.aggregate([
  { $match: { status: "completed" } },
  { $group: { _id: "$productId", revenue: { $sum: "$total" } } },
  { $sort: { revenue: -1 } },
  { $limit: 5 }
])`,
17: `db.products.createIndex({
  category: 1,
  price: 1
})`,
18: `db.products
  .find({ category: "phones" })
  .explain("executionStats")`,
19: `// Transaction concept
// Create Order + Decrease Stock
// يجب أن تنجح العمليتان معًا
db.products.updateOne(
  { name: "iPhone" },
  { $inc: { stock: -1 } }
)`,
20: `// Atlas يستخدم نفس Queries
// الفرق فقط في Connection String
db.products.find({
  active: true
})`,
21: `// MongoDB Node.js Driver
const products = db.collection("products")

await products
  .find({ active: true })
  .toArray()`,
22: `// Mongoose Model
Product.find({
  active: true
})`,
23: `// Connection concept
await mongoose.connect(
  process.env.MONGO_URI
)`,
24: `const productSchema = new mongoose.Schema({
  name: String,
  price: Number
})

const Product = mongoose.model(
  "Product",
  productSchema
)

const product = new Product({
  name: "iPhone",
  price: 4200
})`,
25: `const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  stock: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})`,
26: `const productSchema = new mongoose.Schema({
  price: {
    type: Number,
    min: 0,
    required: true
  }
})`,
27: `await Product.findByIdAndUpdate(
  id,
  { $inc: { stock: -1 } },
  {
    new: true,
    runValidators: true
  }
)`,
28: `const postSchema = new mongoose.Schema({
  title: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
})

await Post
  .find()
  .populate("author", "name email")`,
29: `const orderSchema = new mongoose.Schema({
  items: [
    {
      product: mongoose.Schema.Types.ObjectId,
      quantity: Number,
      price: Number
    }
  ]
})`,
30: `userSchema.pre("save", async function () {
  if (!this.isModified("password")) return

  // hash password
})`,
31: `userSchema.methods.getProfile = function () {
  return {
    name: this.name,
    email: this.email
  }
}

userSchema.virtual("fullName").get(function () {
  return this.firstName + " " + this.lastName
})`,
32: `await User
  .find({ active: true })
  .select("name email")
  .lean()`,
33: `productSchema.index({
  category: 1,
  price: 1
})`,
34: `const session = await mongoose.startSession()

await session.withTransaction(async () => {
  await Order.create(
    [{ user, total }],
    { session }
  )

  await Product.updateOne(
    { _id: productId },
    { $inc: { stock: -1 } },
    { session }
  )
})

await session.endSession()`,
35: `try {
  await User.create(input)
} catch (error) {
  if (error.name === "ValidationError") {
    // handle validation error
  }
}`,
36: `// Final API example
const products = await Product
  .find({ active: true })
  .sort({ createdAt: -1 })
  .limit(10)
  .lean()`
};
