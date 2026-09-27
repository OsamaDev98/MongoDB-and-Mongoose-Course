export type Lesson = {
  id: number;
  day: 1 | 2 | 3;
  title: string;
  duration: string;
  summary: string;
  concepts: string[];
  code?: string;
  challenge: string;
  quiz: { question: string; options: string[]; answer: number; explanation: string };
};

export const lessons: Lesson[] = [
  {id:1,day:1,title:"Database Fundamentals",duration:"12 min",summary:"افهم معنى قاعدة البيانات والفرق بين SQL وNoSQL قبل لمس MongoDB.",concepts:["Database / collection / document / field","SQL tables vs MongoDB documents","متى يكون document model مناسبًا"],code:`// SQL row
{id: 1, name: "Osama"}

// MongoDB document
{ _id: ObjectId("..."), name: "Osama", skills: ["Node.js"] }`,challenge:"حوّل جدول users تقليدي إلى شكل document مناسب لـ MongoDB.",quiz:{question:"ما المقابل الأقرب للـ row في MongoDB؟",options:["Database","Collection","Document","Index"],answer:2,explanation:"الـ Document هو وحدة البيانات الأساسية داخل Collection."}},
  {id:2,day:1,title:"MongoDB Architecture",duration:"12 min",summary:"ميّز بوضوح بين Server وAtlas وCompass وmongosh والـ Driver.",concepts:["MongoDB Server يخزن البيانات","Atlas خدمة MongoDB مُدارة على السحابة","Compass واجهة GUI وmongosh CLI","Driver يربط التطبيق بMongoDB"],challenge:"اشرح المسار من Node.js إلى collection في سطر واحد.",quiz:{question:"أي أداة هي GUI لإدارة MongoDB؟",options:["mongosh","Compass","Mongoose","BSON"],answer:1,explanation:"MongoDB Compass هي الواجهة الرسومية الرسمية."}},
  {id:3,day:1,title:"BSON, Documents & ObjectId",duration:"14 min",summary:"افهم بنية الـ document وأنواع BSON والـ _id.",concepts:["BSON توسع JSON بأنواع إضافية","كل document يحتاج _id فريد","ObjectId نوع شائع للـ _id","يمكن استخدام nested documents وarrays"],code:`{
  _id: ObjectId("66f..."),
  name: "Laptop",
  price: 3500,
  active: true,
  createdAt: ISODate("2026-09-26T00:00:00Z")
}`,challenge:"صمّم product document فيه specs وtags.",quiz:{question:"ما الحقل الذي يميز كل document؟",options:["id","key","_id","uuid فقط"],answer:2,explanation:"MongoDB يتطلب حقل _id فريدًا لكل document."}},
  {id:4,day:1,title:"Create Operations",duration:"15 min",summary:"إضافة document واحد أو عدة documents.",concepts:["insertOne","insertMany","نتيجة الإدخال تحتوي insertedId أو insertedIds"],code:`db.users.insertOne({ name: "Ahmed", age: 25 })

db.users.insertMany([
  { name: "Ali", age: 24 },
  { name: "Sara", age: 27 }
])`,challenge:"أضف 3 products دفعة واحدة.",quiz:{question:"أي method تضيف عدة documents؟",options:["insert","insertMany","pushMany","createMany"],answer:1,explanation:"insertMany() هي العملية الصحيحة."}},
  {id:5,day:1,title:"Read & Projection",duration:"16 min",summary:"ابحث عن البيانات وتحكم في الحقول المرجعة.",concepts:["find وfindOne","Filter object","Projection","الـ cursor"],code:`db.users.find({ age: { $gte: 25 } }, { name: 1, age: 1, _id: 0 })`,challenge:"أرجع أسماء المنتجات التي سعرها أكبر من 1000 بدون _id.",quiz:{question:"Projection تستخدم لـ؟",options:["تغيير البيانات","اختيار الحقول المرجعة","إنشاء index","حذف collection"],answer:1,explanation:"Projection تحدد الحقول التي تظهر في النتيجة."}},
  {id:6,day:1,title:"Query Operators",duration:"22 min",summary:"استخدم comparison وlogical operators لكتابة filters قوية.",concepts:["$eq $ne $gt $gte $lt $lte","$in $nin","$and $or $nor $not","$exists $type $regex"],code:`db.products.find({
  $and: [
    { price: { $gte: 1000, $lte: 5000 } },
    { category: { $in: ["phones", "laptops"] } }
  ]
})`,challenge:"اكتب query لمنتجات stock>0 وسعرها أقل من 2000.",quiz:{question:"أي operator يعني أكبر من أو يساوي؟",options:["$gt","$gte","$lte","$eq"],answer:1,explanation:"$gte = greater than or equal."}},
  {id:7,day:1,title:"Nested Documents & Arrays",duration:"20 min",summary:"تعامل مع dot notation وarray queries و$elemMatch.",concepts:["Dot notation","Query داخل nested document","البحث داخل arrays","$elemMatch"],code:`db.products.find({ "specs.storage": 256 })

db.products.find({ reviews: { $elemMatch: { rating: 5, verified: true } } })`,challenge:"ابحث عن users من Riyadh داخل address.city.",quiz:{question:"كيف تصل إلى field متداخل؟",options:["slash notation","dot notation","array notation فقط","لا يمكن"],answer:1,explanation:"MongoDB يستخدم dot notation مثل address.city."}},
  {id:8,day:1,title:"Update Operators",duration:"22 min",summary:"حدّث documents بدون استبدالها كاملة.",concepts:["$set $unset $inc $rename","$push $pull $addToSet","updateOne وupdateMany","upsert concept"],code:`db.products.updateOne(
  { name: "iPhone" },
  { $inc: { stock: -1 }, $addToSet: { tags: "featured" } }
)`,challenge:"زد views بمقدار 1 وأضف tag بدون تكرار.",quiz:{question:"أي operator يضيف قيمة array بدون duplicate؟",options:["$push","$addToSet","$set","$inc"],answer:1,explanation:"$addToSet يمنع تكرار نفس القيمة."}},
  {id:9,day:1,title:"Delete & Replace",duration:"12 min",summary:"احذف documents بعناية وافهم الفرق بين update وreplace.",concepts:["deleteOne/deleteMany","replaceOne يستبدل document بالكامل","الفلاتر الدقيقة مهمة"],code:`db.users.deleteOne({ email: "old@example.com" })

db.settings.replaceOne({ key: "theme" }, { key: "theme", value: "dark" })`,challenge:"احذف كل logs الأقدم من تاريخ محدد.",quiz:{question:"أي عملية تستبدل محتوى document كله؟",options:["updateOne","replaceOne","setOne","overwrite"],answer:1,explanation:"replaceOne تستبدل الحقول غير _id بالـ replacement document."}},
  {id:10,day:1,title:"Sorting & Pagination",duration:"18 min",summary:"رتب النتائج وقسمها إلى صفحات وافهم حدود skip.",concepts:["sort 1/-1","limit","skip","Cursor-based pagination للبيانات الكبيرة"],code:`const page = 2; const limit = 10;
db.products.find().sort({ createdAt: -1 }).skip((page-1)*limit).limit(limit)`,challenge:"اكتب pagination للصفحة 4 بحجم 20.",quiz:{question:"كم skip للصفحة 3 إذا limit=10؟",options:["10","20","30","3"],answer:1,explanation:"(3-1)*10 = 20."}},
  {id:11,day:1,title:"Data Modeling",duration:"32 min",summary:"اتخذ قرار embedding أم referencing بدل تقليد SQL.",concepts:["Embedding","Referencing","One-to-few / one-to-many","Denormalization","صمّم حسب access patterns"],code:`// Embedded address
{ name: "Osama", address: { city: "Riyadh", district: "Malaz" } }

// Reference
{ title: "Post", authorId: ObjectId("...") }`,challenge:"صمّم Users/Products/Orders/Reviews وحدد ما يتم embed وما يتم reference.",quiz:{question:"أفضل قرار modeling يعتمد أساسًا على؟",options:["شكل SQL السابق","Access patterns","اسم collection","عدد الملفات"],answer:1,explanation:"MongoDB schema design يبدأ من كيفية قراءة وكتابة البيانات."}},

  {id:37,day:1,title:"مراجعة اليوم الأول",duration:"25 min",summary:"ملخص ومرجع سريع لكل MongoDB Core قبل الانتقال لليوم الثاني.",concepts:["Core concepts","CRUD","Query Operators","Projection","Data Modeling"],challenge:"راجع اليوم الأول ثم نفّذ التحدي النهائي.",quiz:{question:"في Projection ماذا تعني القيمة 1؟",options:["Exclude","Include","Delete","Sort"],answer:1,explanation:"1 = Include، بينما 0 = Exclude."}},

  {id:12,day:2,title:"Aggregation Pipeline",duration:"20 min",summary:"افهم تدفق documents عبر stages متتابعة.",concepts:["aggregate([...])","كل stage يستقبل ناتج السابق","مفيد للتقارير والتحويلات"],code:`db.orders.aggregate([
  { $match: { status: "completed" } },
  { $group: { _id: null, revenue: { $sum: "$total" } } }
])`,challenge:"أنشئ pipeline تحسب عدد الطلبات المكتملة.",quiz:{question:"Aggregation تعمل كسلسلة من؟",options:["Tables","Stages","Servers","Schemas"],answer:1,explanation:"الـ pipeline مكوّنة من stages."}},
  {id:13,day:2,title:"$match & $project",duration:"16 min",summary:"فلتر مبكرًا وحدد شكل النتيجة.",concepts:["$match يقلل البيانات","$project يختار/يعيد تشكيل fields","يفضل $match مبكرًا غالبًا"],code:`db.orders.aggregate([
 { $match: { status: "completed" } },
 { $project: { _id: 0, total: 1, createdAt: 1 } }
])`,challenge:"اعرض name وprice فقط للمنتجات active.",quiz:{question:"أي stage تشبه filter؟",options:["$group","$match","$lookup","$unwind"],answer:1,explanation:"$match ترشح documents."}},
  {id:14,day:2,title:"$group & Accumulators",duration:"22 min",summary:"كوّن مجموعات واحسب totals وaverages.",concepts:["$group","$sum $avg $min $max","$count patterns","group key في _id"],code:`db.orders.aggregate([
 { $group: { _id: "$status", count: { $sum: 1 }, avg: { $avg: "$total" } } }
])`,challenge:"احسب revenue لكل category.",quiz:{question:"أين تضع مفتاح التجميع؟",options:["key","groupBy","_id","field"],answer:2,explanation:"داخل $group يتم تحديد مفتاح المجموعة في _id."}},
  {id:15,day:2,title:"$lookup & $unwind",duration:"24 min",summary:"اربط collections ثم فك arrays عند الحاجة.",concepts:["$lookup join-like stage","localField/foreignField","النتيجة array","$unwind يحول عناصر array إلى documents"],code:`db.orders.aggregate([
 { $lookup: { from: "users", localField: "userId", foreignField: "_id", as: "user" } },
 { $unwind: "$user" }
])`,challenge:"اربط reviews مع users ثم أظهر اسم صاحب المراجعة.",quiz:{question:"$lookup يعيد العلاقة عادة في؟",options:["String","Array","Number","Index"],answer:1,explanation:"as ينتج array من matches."}},
  {id:16,day:2,title:"Advanced Aggregation",duration:"28 min",summary:"استخدم $sort و$limit و$addFields وpipeline مركبة.",concepts:["$sort/$limit","$addFields/$set","ترتيب stages يؤثر على الأداء","بناء analytics"],code:`db.orders.aggregate([
 { $match: { status: "completed" } },
 { $group: { _id: "$productId", revenue: { $sum: "$total" } } },
 { $sort: { revenue: -1 } },
 { $limit: 5 }
])`,challenge:"استخرج Top 5 products حسب الإيراد.",quiz:{question:"أفضل stage لتقليل النتائج أولًا؟",options:["$match","$lookup","$group","$unwind"],answer:0,explanation:"تقليل البيانات مبكرًا يساعد غالبًا على تقليل العمل اللاحق."}},
  {id:17,day:2,title:"Indexes",duration:"28 min",summary:"افهم لماذا بعض queries سريعة وأخرى تعمل COLLSCAN.",concepts:["Single field index","Compound index","Unique index","Multikey index","تكلفة indexes على writes/storage"],code:`db.users.createIndex({ email: 1 }, { unique: true })
db.products.createIndex({ category: 1, price: 1 })`,challenge:"اقترح index لـ query تعمل filter على category ثم sort على price.",quiz:{question:"هل وضع index على كل field فكرة جيدة؟",options:["نعم دائمًا","لا، لها تكلفة كتابة وتخزين","فقط في Atlas","فقط مع Mongoose"],answer:1,explanation:"كل index له تكلفة؛ يجب بناؤه وفق queries الفعلية."}},
  {id:18,day:2,title:"explain() & Query Performance",duration:"20 min",summary:"اقرأ execution plan بدل التخمين.",concepts:["executionStats","COLLSCAN vs IXSCAN","docsExamined","keysExamined"],code:`db.products.find({ category: "phones" }).explain("executionStats")`,challenge:"قارن docsExamined قبل وبعد إنشاء index.",quiz:{question:"COLLSCAN يعني؟",options:["استخدام index","فحص collection","خطأ اتصال","transaction"],answer:1,explanation:"COLLSCAN يعني collection scan."}},
  {id:19,day:2,title:"Atomicity & Transactions",duration:"24 min",summary:"اعرف متى يكفي atomic document update ومتى تحتاج transaction.",concepts:["Single-document writes atomic","Multi-document transaction","commit/abort","قلل transaction scope"],code:`const session = db.getMongo().startSession();
// concept: startTransaction -> operations -> commit/abort`,challenge:"حدد هل checkout (order + stock) يحتاج transaction في تصميمك ولماذا.",quiz:{question:"MongoDB write على document واحد هو؟",options:["غير atomic","Atomic","دائمًا distributed","Read-only"],answer:1,explanation:"الكتابة على document واحد atomic."}},
  {id:20,day:2,title:"MongoDB Atlas",duration:"22 min",summary:"أنشئ cluster واتصالًا آمنًا وميّز cloud عن local.",concepts:["Project/Cluster","Database user","Network Access","mongodb+srv URI","Local data ليست Atlas data"],code:`MONGO_URI=mongodb+srv://USER:PASSWORD@cluster.mongodb.net/shop`,challenge:"اكتب checklist للاتصال بـ Atlas من تطبيق Node.js.",quiz:{question:"لو البيانات في localhost، هل تظهر تلقائيًا في Atlas؟",options:["نعم","لا","فقط Compass","بعد refresh"],answer:1,explanation:"هما deployments منفصلان ما لم تنقل البيانات أو تتصل بنفس الخادم."}},
  {id:21,day:2,title:"MongoDB Node.js Driver",duration:"30 min",summary:"استخدم MongoDB مباشرة من Node.js قبل abstraction Mongoose.",concepts:["MongoClient","connect","db/collection","CRUD async","connection pooling concept"],code:`import { MongoClient } from "mongodb";
const client = new MongoClient(process.env.MONGO_URI!);
await client.connect();
const products = client.db("shop").collection("products");
const data = await products.find({ active: true }).toArray();`,challenge:"اكتب function تعيد product بالـ _id.",quiz:{question:"Mongoose مبني فوق ماذا في Node.js؟",options:["PostgreSQL","MongoDB Driver","Redis","Express"],answer:1,explanation:"Mongoose يستخدم MongoDB Node.js driver تحت الغطاء."}},

  {id:38,day:2,title:"مراجعة اليوم الثاني",duration:"25 min",summary:"مرجع سريع لـ Aggregation وIndexes وTransactions وAtlas وDriver.",concepts:["Aggregation","Indexes","explain","Transactions","Atlas & Driver"],challenge:"راجع اليوم الثاني ثم نفّذ Pipeline المراجعة.",quiz:{question:"ماذا يعني COLLSCAN؟",options:["استخدام Index","فحص Collection","Transaction","Projection"],answer:1,explanation:"COLLSCAN يعني فحص Collection مباشرة."}},

  {id:22,day:3,title:"Why Mongoose?",duration:"12 min",summary:"افهم ما الذي يضيفه Mongoose فوق MongoDB Driver.",concepts:["Schemas/Models","Validation","Middleware","Populate","Convenience abstraction"],challenge:"اذكر ميزتين تحتاجهما في API وقد يوفرهما Mongoose.",quiz:{question:"Mongoose هو؟",options:["Database server","ODM لـ MongoDB","SQL engine","Cloud provider"],answer:1,explanation:"Mongoose ODM لـ MongoDB في Node.js."}},
  {id:23,day:3,title:"Connection",duration:"14 min",summary:"اربط التطبيق بقاعدة البيانات وتعامل مع config بطريقة صحيحة.",concepts:["mongoose.connect","Environment variables","Connection lifecycle","لا تضع credentials في Git"],code:`import mongoose from "mongoose";
await mongoose.connect(process.env.MONGO_URI!);`,challenge:"أنشئ dbConnect function تتأكد من وجود MONGO_URI.",quiz:{question:"أين تحفظ connection string؟",options:["داخل Git","Environment variable","اسم الملف","CSS"],answer:1,explanation:"الأسرار تحفظ في environment variables."}},
  {id:24,day:3,title:"Schema, Model & Document",duration:"22 min",summary:"ثبّت الفرق بين الثلاثة لأنه أساس Mongoose.",concepts:["Schema = shape/rules","Model = interface للcollection","Document = instance/data"],code:`const schema = new mongoose.Schema({ name: String });
const User = mongoose.model("User", schema);
const user = new User({ name: "Osama" });`,challenge:"اكتب Product schema ثم Model ثم instance.",quiz:{question:"User في mongoose.model غالبًا يمثل؟",options:["Document","Model","Database","Index"],answer:1,explanation:"mongoose.model يعيد Model."}},
  {id:25,day:3,title:"Schema Types & Options",duration:"22 min",summary:"استخدم types وdefaults وtimestamps وtrim وغيرها.",concepts:["String/Number/Boolean/Date/ObjectId/Array","required/default/enum","trim/lowercase","timestamps"],code:`const userSchema = new mongoose.Schema({
 name: { type: String, required: true, trim: true },
 role: { type: String, enum: ["user", "admin"], default: "user" }
}, { timestamps: true });`,challenge:"صمّم Product schema فيه stock default=0 وstatus enum.",quiz:{question:"timestamps تضيف عادة؟",options:["id فقط","createdAt وupdatedAt","password","index"],answer:1,explanation:"Mongoose يدير createdAt وupdatedAt تلقائيًا."}},
  {id:26,day:3,title:"Validation",duration:"24 min",summary:"امنع البيانات غير الصحيحة على مستوى model.",concepts:["required/min/max/enum/match","Custom validators","ValidationError","unique ليس validator تقليديًا"],code:`email: {
 type: String,
 required: true,
 validate: { validator: v => v.includes("@"), message: "Invalid email" }
}`,challenge:"أضف validation للسعر ليكون >= 0.",quiz:{question:"خطأ validation غالبًا نوعه؟",options:["CastError فقط","ValidationError","NetworkError","SyntaxError"],answer:1,explanation:"Mongoose يجمع أخطاء validation في ValidationError."}},
  {id:27,day:3,title:"CRUD with Mongoose",duration:"28 min",summary:"نفّذ العمليات اليومية على Models.",concepts:["create/find/findOne/findById","findByIdAndUpdate","findByIdAndDelete","runValidators في updates"],code:`const product = await Product.findByIdAndUpdate(
 id,
 { $inc: { stock: -1 } },
 { new: true, runValidators: true }
);`,challenge:"أنشئ getProducts مع filter active=true.",quiz:{question:"أي option يرجع document بعد التعديل؟",options:["new: true","lean: true","raw: true","fresh: true"],answer:0,explanation:"new:true يرجع النسخة بعد update."}},
  {id:28,day:3,title:"References & Populate",duration:"28 min",summary:"استخدم ObjectId refs واسترجع related documents عند الحاجة.",concepts:["Schema.Types.ObjectId","ref","populate","select داخل populate","populate ليس SQL join"],code:`author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }

const posts = await Post.find().populate("author", "name email");`,challenge:"اربط Review بـ User وProduct ثم populate user name.",quiz:{question:"ref تستخدم مع؟",options:["CSS","ObjectId relationship","Index only","Transaction"],answer:1,explanation:"ref تحدد الـ Model المرتبط بحقل ObjectId."}},
  {id:29,day:3,title:"Subdocuments",duration:"18 min",summary:"صمّم nested schemas وarrays داخل document.",concepts:["Subdocument schemas","Array of subdocuments","Validation cascades","Embedding decisions"],code:`const orderSchema = new Schema({
 items: [{ product: { type: ObjectId, ref: "Product" }, quantity: Number, price: Number }]
});`,challenge:"صمّم addresses كـ subdocuments داخل User.",quiz:{question:"Subdocument مناسب غالبًا عندما؟",options:["البيانات تنتمي بقوة للparent","كل شيء منفصل دائمًا","تحتاج SQL","لا توجد arrays"],answer:0,explanation:"Embedding جيد عندما lifecycle/access قريبان من parent."}},
  {id:30,day:3,title:"Middleware / Hooks",duration:"24 min",summary:"شغّل logic قبل/بعد عمليات محددة وافهم أنواع middleware.",concepts:["pre/post","Document middleware","Query middleware","Aggregate middleware","لا تفترض أن save hook يعمل على كل update query"],code:`userSchema.pre("save", async function () {
 if (!this.isModified("password")) return;
 // hash password here
});`,challenge:"صمّم pre-save hook concept لتطبيع email.",quiz:{question:"pre('save') يعمل قبل؟",options:["حفظ document","كل find","كل aggregate","إنشاء database"],answer:0,explanation:"هذا document middleware لعملية save."}},
  {id:31,day:3,title:"Methods, Statics & Virtuals",duration:"24 min",summary:"ضع behavior مناسب على documents أو models بدون تخزين fields مشتقة.",concepts:["methods على document","statics على Model","virtuals derived values"],code:`userSchema.methods.publicProfile = function () { return { name: this.name }; };
userSchema.statics.findByEmail = function(email) { return this.findOne({ email }); };
userSchema.virtual("fullName").get(function(){ return this.firstName + " " + this.lastName; });`,challenge:"أنشئ virtual اسمه priceWithTax.",quiz:{question:"Virtual يتم تخزينها في MongoDB افتراضيًا؟",options:["نعم","لا","فقط Atlas","فقط arrays"],answer:1,explanation:"Virtual قيمة مشتقة وليست field مخزنة."}},
  {id:32,day:3,title:"lean() & Performance",duration:"16 min",summary:"أرجع plain objects عندما لا تحتاج خصائص Mongoose document.",concepts:["lean returns POJOs","أخف في القراءة","لا document methods/getters التقليدية","استخدم select + indexes"],code:`const users = await User.find({ active: true }).select("name email").lean();`,challenge:"حدد endpoint مناسب لـ lean ولماذا.",quiz:{question:"lean() مناسب أكثر لـ؟",options:["قراءة بسيطة","save hook","document method","تعديل instance ثم save"],answer:0,explanation:"lean ممتاز لقراءات لا تحتاج Mongoose document features."}},
  {id:33,day:3,title:"Mongoose Indexes",duration:"18 min",summary:"عرّف indexes في schema لكن صمّمها وفق queries الحقيقية.",concepts:["schema.index","unique index","compound indexes","إدارة autoIndex في production"],code:`productSchema.index({ category: 1, price: 1 });
userSchema.index({ email: 1 }, { unique: true });`,challenge:"اختر compound index لفلترة status والترتيب createdAt.",quiz:{question:"Compound index هو index على؟",options:["عدة fields","عدة databases","serverين","array فقط"],answer:0,explanation:"يجمع أكثر من field بترتيب محدد."}},
  {id:34,day:3,title:"Mongoose Transactions",duration:"24 min",summary:"نفّذ سلسلة عمليات مترابطة داخل session.",concepts:["startSession","withTransaction","مرر session للعمليات","abort تلقائي عند الخطأ داخل callback"],code:`const session = await mongoose.startSession();
await session.withTransaction(async () => {
 await Order.create([{ user, total }], { session });
 await Product.updateOne({ _id: productId }, { $inc: { stock: -1 } }, { session });
});
await session.endSession();`,challenge:"صمّم transaction لإنشاء order وتقليل stock.",quiz:{question:"ما الذي يربط العمليات داخل transaction؟",options:["Schema","Session","Virtual","Projection"],answer:1,explanation:"الـ session تحمل سياق transaction."}},
  {id:35,day:3,title:"Errors & Security",duration:"22 min",summary:"تعامل مع الأخطاء الشائعة ولا تثق في input المستخدم.",concepts:["ValidationError","CastError","Duplicate key","NoSQL injection awareness","Whitelist allowed fields"],code:`try {
 await User.create(input);
} catch (err) {
 // map known database errors to safe API responses
}`,challenge:"اكتب قائمة fields مسموحة لتحديث profile بدل تمرير req.body كله.",quiz:{question:"تمرير req.body كاملًا للupdate قد يسبب؟",options:["Mass assignment","Index فقط","Compression","Sharding"],answer:0,explanation:"قد يسمح للمستخدم بتعديل fields غير مسموحة."}},
  {id:36,day:3,title:"Final API Architecture",duration:"40 min",summary:"اجمع كل شيء في Backend متجر قابل للتوسع.",concepts:["Models: User/Product/Category/Order/Review","Controllers/Services/Routes","Validation + error handler","Filtering/sorting/pagination","Analytics aggregation","Indexes + transactions"],code:`src/
  config/database.ts
  models/
  controllers/
  services/
  routes/
  middleware/
  validators/
  app.ts`,challenge:"ابنِ Product CRUD + Order transaction + revenue aggregation بدون الرجوع للشرح.",quiz:{question:"أفضل دليل أنك فهمت الكورس؟",options:["حفظ syntax","بناء API واتخاذ modeling/index decisions","قراءة الدروس فقط","نسخ الكود"],answer:1,explanation:"الهدف هو القدرة على التصميم والتنفيذ والتفسير، لا الحفظ."}},
  {id:39,day:3,title:"مراجعة اليوم الثالث",duration:"30 min",summary:"ملخص شامل لـ Mongoose ومرجع نهائي للكورس.",concepts:["Schema / Model / Document","Validation","Populate","Middleware","Performance & Transactions"],challenge:"راجع Mongoose ثم نفّذ Query المراجعة النهائية.",quiz:{question:"Schema في Mongoose تمثل ماذا؟",options:["بيانات فعلية","شكل وقواعد البيانات","Server","Index فقط"],answer:1,explanation:"Schema تحدد الشكل والقواعد، Model هي واجهة التعامل، Document هي instance."}},
];

export const dayMeta = {
  1: { title: "MongoDB Core", subtitle: "Fundamentals • CRUD • Queries • Data Modeling" },
  2: { title: "Advanced MongoDB", subtitle: "Aggregation • Indexes • Transactions • Atlas" },
  3: { title: "Mongoose", subtitle: "Schemas • Models • Populate • Production Patterns" }
} as const;
