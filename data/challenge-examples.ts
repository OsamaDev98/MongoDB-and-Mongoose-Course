export type ChallengeExample = {
  prompt: string;
  code: string;
};

export const challengeExamples: Record<number, ChallengeExample> = {
  1: { prompt: "عدّل الـ Document وأضف category وactive.", code: `const product = {
  name: "iPhone",
  price: 4200,
  stock: 8
}

// Challenge: أضف category و active
product` },
  2: { prompt: "نفّذ find على products وأظهر كل البيانات.", code: `db.products.find({})` },
  3: { prompt: "ابحث عن المنتجات التي storage فيها 512.", code: `db.products.find({
  "specs.storage": 512
})` },
  4: { prompt: "استخدم insertMany لإضافة 3 منتجات accessories دفعة واحدة.", code: `db.products.insertMany([
  { name: "Headset", price: 250, stock: 10, category: "accessories", active: true, tags: [], specs: { color: "black" } },
  { name: "Webcam", price: 380, stock: 6, category: "accessories", active: true, tags: [], specs: { color: "black" } },
  { name: "Charger", price: 120, stock: 20, category: "accessories", active: true, tags: [], specs: { color: "white" } }
])` },
  5: { prompt: "اعرض المنتجات التي سعرها 3000 أو أكثر، وأظهر name وprice فقط بدون _id.", code: `db.products.find(
  { price: { $gte: 3000 } },
  { name: 1, price: 1, _id: 0 }
)` },
  6: { prompt: "ابحث عن المنتجات التي stock أكبر من 0 وسعرها أقل من 5000.", code: `db.products.find({
  $and: [
    { stock: { $gt: 0 } },
    { price: { $lt: 5000 } }
  ]
})` },
  7: { prompt: "ابحث عن المنتجات التي tags فيها apple.", code: `db.products.find({
  tags: "apple"
})` },
  8: { prompt: "استخدم updateMany لزيادة stock بمقدار 2 لكل phones وإضافة tag باسم updated.", code: `db.products.updateMany(
  { category: "phones" },
  {
    $inc: { stock: 2 },
    $addToSet: { tags: "updated" }
  }
)` },
  9: { prompt: "احذف كل المنتجات غير النشطة باستخدام deleteMany.", code: `db.products.deleteMany({
  active: false
})` },
  10: { prompt: "اعرض أغلى منتجين نشطين فقط.", code: `db.products
  .find({ active: true })
  .sort({ price: -1 })
  .limit(2)` },
  11: { prompt: "اكتب Query تمثل Access Pattern: كل المنتجات في category phones.", code: `db.products.find({
  category: "phones"
})` },
  12: { prompt: "احسب عدد الطلبات المكتملة باستخدام Aggregation.", code: `db.orders.aggregate([
  { $match: { status: "completed" } },
  { $count: "completedOrders" }
])` },
  13: { prompt: "فلتر الطلبات المكتملة ثم أظهر total فقط بدون _id.", code: `db.orders.aggregate([
  { $match: { status: "completed" } },
  { $project: { _id: 0, total: 1 } }
])` },
  14: { prompt: "احسب إجمالي revenue لكل status.", code: `db.orders.aggregate([
  {
    $group: {
      _id: "$status",
      revenue: { $sum: "$total" }
    }
  }
])` },
  15: { prompt: "اربط orders مع users ثم فك user array.", code: `db.orders.aggregate([
  { $lookup: { from: "users", localField: "userId", foreignField: "_id", as: "user" } },
  { $unwind: "$user" }
])` },
  16: { prompt: "استخرج أعلى حالتين حسب إجمالي الإيراد.", code: `db.orders.aggregate([
  { $group: { _id: "$status", revenue: { $sum: "$total" } } },
  { $sort: { revenue: -1 } },
  { $limit: 2 }
])` },
  17: { prompt: "أنشئ Compound Index على category ثم price.", code: `db.products.createIndex({
  category: 1,
  price: 1
})` },
  18: { prompt: "شغّل explain على Query تبحث عن phones.", code: `db.products
  .find({ category: "phones" })
  .explain("executionStats")` },
  19: { prompt: "جرّب عملية إنقاص stock كجزء من سيناريو checkout.", code: `db.products.updateOne(
  { name: "iPhone" },
  { $inc: { stock: -1 } }
)` },
  20: { prompt: "نفّذ Query مناسبة لتطبيق متصل بـ Atlas.", code: `db.products.find({
  active: true
})` },
  21: { prompt: "باستخدام Driver concept، ابحث عن المنتجات النشطة.", code: `const products = db.collection("products")

await products
  .find({ active: true })
  .toArray()` },
  22: { prompt: "اكتب Mongoose query ترجع products النشطة.", code: `Product.find({
  active: true
})` },
  23: { prompt: "اكتب اتصال Mongoose باستخدام MONGO_URI.", code: `await mongoose.connect(
  process.env.MONGO_URI
)` },
  24: { prompt: "أنشئ Product Schema فيه name وprice ثم Model.", code: `const productSchema = new mongoose.Schema({
  name: String,
  price: Number
})

const Product = mongoose.model("Product", productSchema)` },
  25: { prompt: "أضف stock default=0 وtimestamps إلى Product Schema.", code: `const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stock: { type: Number, default: 0 }
}, { timestamps: true })` },
  26: { prompt: "اجعل price مطلوبًا ولا يقبل قيمة أقل من صفر.", code: `const productSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true,
    min: 0
  }
})` },
  27: { prompt: "حدّث stock باستخدام findByIdAndUpdate مع runValidators.", code: `await Product.findByIdAndUpdate(
  id,
  { $inc: { stock: -1 } },
  { new: true, runValidators: true }
)` },
  28: { prompt: "استخدم populate لإرجاع name وemail للـ author.", code: `await Post
  .find()
  .populate("author", "name email")` },
  29: { prompt: "أنشئ items كـ Array of Subdocuments داخل Order.", code: `const orderSchema = new mongoose.Schema({
  items: [
    {
      product: mongoose.Schema.Types.ObjectId,
      quantity: Number,
      price: Number
    }
  ]
})` },
  30: { prompt: "أنشئ pre save hook يفحص هل password تغير.", code: `userSchema.pre("save", async function () {
  if (!this.isModified("password")) return
  // hash password
})` },
  31: { prompt: "أنشئ Virtual باسم fullName.", code: `userSchema.virtual("fullName").get(function () {
  return this.firstName + " " + this.lastName
})` },
  32: { prompt: "استخدم lean مع select لقراءة name وemail فقط.", code: `await User
  .find({ active: true })
  .select("name email")
  .lean()` },
  33: { prompt: "أنشئ Compound Index على status وcreatedAt.", code: `orderSchema.index({
  status: 1,
  createdAt: -1
})` },
  34: { prompt: "ضع Order create وProduct update داخل نفس session.", code: `const session = await mongoose.startSession()

await session.withTransaction(async () => {
  await Order.create([{ user, total }], { session })
  await Product.updateOne(
    { _id: productId },
    { $inc: { stock: -1 } },
    { session }
  )
})` },
  35: { prompt: "تعامل مع ValidationError بشكل واضح.", code: `try {
  await User.create(input)
} catch (error) {
  if (error.name === "ValidationError") {
    console.log("Validation failed")
  }
}` },
  36: { prompt: "أنشئ Query نهائية: products نشطة، مرتبة بالأحدث، أول 10، باستخدام lean.", code: `const products = await Product
  .find({ active: true })
  .sort({ createdAt: -1 })
  .limit(10)
  .lean()` }
};
