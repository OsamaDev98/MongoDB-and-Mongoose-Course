export type PointExplanation = {
  title: string;
  explanation: string;
  example?: string;
  code?: string;
};

export const lessonPoints: Record<number, PointExplanation[]> = {
1:[
{title:"Database",explanation:"الـ Database هي الحاوية الرئيسية التي تجمع بيانات مشروع واحد. في متجر إلكتروني قد يكون لديك Database اسمها shop، وداخلها كل بيانات المستخدمين والمنتجات والطلبات.",example:"shop database تحتوي users وproducts وorders."},
{title:"Collection",explanation:"الـ Collection هي مجموعة Documents من نفس النوع تقريبًا. بدل جدول users في SQL، سيكون لديك Collection اسمها users.",example:"Collection products تجمع كل المنتجات الموجودة في المتجر."},
{title:"Document",explanation:"الـ Document هو سجل واحد داخل Collection، وشكله قريب جدًا من JavaScript Object. يمكن أن يحتوي نصوصًا وأرقامًا وArrays وObjects داخلية.",example:"كل منتج هو Document مستقل داخل products.",code:`{ name: "iPhone", price: 4200, stock: 8 }`},
{title:"Field",explanation:"الـ Field هو خاصية داخل Document، مثل name أو price. كل Field له قيمة، والقيمة قد تكون String أو Number أو Boolean أو Array أو Object.",example:"في المنتج السابق name وprice وstock كلها Fields."}
],
2:[
{title:"MongoDB Server",explanation:"هذا هو البرنامج الذي يخزن البيانات فعليًا ويستقبل أوامر القراءة والكتابة. تطبيقك لا يحفظ البيانات داخل Compass؛ بل داخل MongoDB Server."},
{title:"MongoDB Atlas",explanation:"Atlas هو MongoDB Server مُدار في السحابة. بدل تشغيل السيرفر بنفسك على جهازك، MongoDB تستضيفه لك وتوفر لك Cluster وConnection String."},
{title:"MongoDB Compass",explanation:"Compass واجهة رسومية تساعدك على مشاهدة Databases وCollections وDocuments وكتابة Queries بدون الاعتماد على Terminal.",example:"تستطيع فتح products وتشاهد كل Documents وتعمل Filter من الواجهة."},
{title:"mongosh",explanation:"mongosh هو MongoDB Shell. تكتب فيه أوامر مثل db.products.find() مباشرة من الطرفية."},
{title:"Driver / Mongoose",explanation:"Node.js يحتاج Driver أو Mongoose حتى يرسل أوامر إلى MongoDB Server من داخل الكود."}
],
3:[
{title:"BSON",explanation:"MongoDB تخزن البيانات كـ BSON، وهو شبيه بـ JSON لكنه يدعم أنواعًا إضافية مهمة مثل ObjectId وDate وDecimal128."},
{title:"_id",explanation:"كل Document يجب أن يكون له _id فريد. إذا لم ترسل واحدًا، MongoDB تنشئه غالبًا تلقائيًا."},
{title:"ObjectId",explanation:"نوع شائع جدًا للـ _id. هو ليس String عاديًا، لذلك عند المقارنة أو العلاقات يجب التعامل معه كنوع ObjectId عند الحاجة."},
{title:"Nested Document",explanation:"يمكن أن يحتوي Document على Object داخله، مثل specs أو address، وهذا يجعل البيانات المرتبطة قريبة من بعضها.",code:`{ name:"Laptop", specs:{ ram:16, storage:512 } }`},
{title:"Array",explanation:"يمكن أيضًا تخزين عدة قيم داخل Array مثل tags أو reviews.",code:`{ tags:["apple","premium"] }`}
],
4:[
{title:"insertOne()",explanation:"تستخدمها عندما تريد إضافة Document واحد. ترسل Object واحد، وتعيد لك MongoDB نتيجة تحتوي insertedId.",code:`db.users.insertOne({ name: "Ahmed", age: 25 })`},
{title:"insertMany()",explanation:"تستخدمها عندما تريد إضافة عدة Documents مرة واحدة. ترسل Array من Objects.",code:`db.users.insertMany([{name:"Ali"},{name:"Sara"}])`},
{title:"متى أستخدم كل واحدة؟",explanation:"إذا كان الحدث ينشئ عنصرًا واحدًا مثل تسجيل مستخدم جديد استخدم insertOne. عند استيراد بيانات كثيرة معًا استخدم insertMany."}
],
5:[
{title:"find()",explanation:"تعيد مجموعة Documents تطابق الـ Filter. إذا استخدمت {} كـ Filter فهذا يعني لا يوجد شرط وبالتالي ترجع كل البيانات تقريبًا.",code:`db.products.find({ price: { $gte: 1000 } })`},
{title:"findOne()",explanation:"تعيد Document واحد فقط يطابق الشرط، ومناسبة عندما تتوقع نتيجة واحدة مثل البحث بالبريد الإلكتروني.",code:`db.users.findOne({ email: "a@b.com" })`},
{title:"Filter",explanation:"الـ Filter هو Object يصف الشروط. فكر فيه كسؤال: أي Documents أريد؟"},
{title:"Projection",explanation:"Projection تحدد الحقول التي تريدها من Documents المطابقة. مفيدة لتقليل البيانات التي ترجع من قاعدة البيانات.",code:`db.users.find({}, { name:1, email:1, _id:0 })`},
{title:"Cursor",explanation:"find لا يعيد Array عادية مباشرة في shell/driver؛ يعيد Cursor يمثل نتيجة يمكن المرور عليها أو ترتيبها أو تحديدها."}
],
6:[
{title:"$gt / $gte",explanation:"$gt تعني أكبر من، و$gte تعني أكبر من أو يساوي.",code:`{ price: { $gte: 1000 } }`},
{title:"$lt / $lte",explanation:"$lt تعني أقل من، و$lte تعني أقل من أو يساوي.",code:`{ price: { $lte: 5000 } }`},
{title:"$eq / $ne",explanation:"$eq للمساواة و$ne لعدم المساواة. غالبًا لا تحتاج $eq لأن كتابة field:value كافية.",code:`{ status: { $ne: "deleted" } }`},
{title:"$in / $nin",explanation:"$in تبحث عن قيمة تقع داخل قائمة قيم مسموحة، و$nin عكسها.",code:`{ category: { $in:["phones","laptops"] } }`},
{title:"$and / $or",explanation:"تستخدم لدمج عدة شروط. $and يعني كل الشروط صحيحة، و$or يعني شرط واحد على الأقل صحيح.",code:`{ $or:[{stock:0},{active:false}] }`},
{title:"$exists / $type / $regex",explanation:"$exists يفحص وجود Field، $type يفحص نوعه، و$regex للبحث النصي بنمط معين."}
],
7:[
{title:"Dot Notation",explanation:"للوصول إلى Field داخل Object متداخل نكتب المسار بنقاط.",code:`db.products.find({ "specs.storage": 256 })`},
{title:"البحث داخل Array",explanation:"إذا كان Field عبارة عن Array من قيم بسيطة، تستطيع غالبًا البحث عن قيمة مباشرة باسم الحقل.",code:`db.products.find({ tags: "apple" })`},
{title:"$elemMatch",explanation:"تستخدمها عندما تكون لديك Array من Objects وتريد أكثر من شرط ينطبقان على نفس العنصر داخل Array.",code:`{ reviews:{ $elemMatch:{ rating:5, verified:true } } }`}
],
8:[
{title:"$set",explanation:"يغيّر قيمة Field أو ينشئه إذا لم يكن موجودًا.",code:`{ $set:{ active:true } }`},
{title:"$unset",explanation:"يحذف Field من Document.",code:`{ $unset:{ oldField:"" } }`},
{title:"$inc",explanation:"يزيد أو ينقص قيمة رقمية بدون الحاجة لقراءة القيمة أولًا.",code:`{ $inc:{ stock:-1 } }`},
{title:"$push",explanation:"يضيف قيمة إلى Array حتى لو كانت موجودة مسبقًا."},
{title:"$addToSet",explanation:"يضيف قيمة إلى Array بشرط ألا تكون موجودة بالفعل."},
{title:"$pull",explanation:"يحذف قيمة مطابقة من Array."}
],
9:[
{title:"deleteOne()",explanation:"يحذف Document واحد مطابق للـ Filter.",code:`db.users.deleteOne({ email:"old@example.com" })`},
{title:"deleteMany()",explanation:"يحذف كل Documents المطابقة. لذلك الـ Filter هنا حساس جدًا."},
{title:"replaceOne()",explanation:"يستبدل محتوى Document كاملًا بالـ replacement الجديد مع بقاء _id عادةً.",code:`db.settings.replaceOne({key:"theme"},{key:"theme",value:"dark"})`},
{title:"Update vs Replace",explanation:"Update يعدّل جزءًا فقط من Document، أما Replace فيستبدل المحتوى بالكامل تقريبًا."}
],
10:[
{title:"sort()",explanation:"ترتب النتائج حسب Field. القيمة 1 تصاعدي و-1 تنازلي.",code:`db.products.find().sort({ price:-1 })`},
{title:"limit()",explanation:"تحدد أقصى عدد نتائج ترجعها Query.",code:`.limit(10)`},
{title:"skip()",explanation:"تتجاوز عددًا من النتائج. شائعة في Pagination البسيطة.",code:`.skip(20).limit(10)`},
{title:"Pagination Formula",explanation:"في pagination التقليدية: skip = (page - 1) × limit.",example:"page=3 وlimit=10 يعني skip=20."},
{title:"Cursor Pagination",explanation:"عند البيانات الكبيرة جدًا قد يكون الاعتماد على قيمة مثل _id أو createdAt أفضل من skip الكبير."}
],
11:[
{title:"Embedding",explanation:"يعني وضع البيانات الفرعية داخل نفس Document. مناسب إذا كانت البيانات صغيرة وتُقرأ غالبًا مع الـ parent.",code:`{ name:"Osama", address:{city:"Riyadh"} }`},
{title:"Referencing",explanation:"يعني تخزين ObjectId يشير إلى Document في Collection أخرى. مناسب للبيانات الكبيرة أو المشتركة.",code:`{ userId:ObjectId("...") }`},
{title:"One-to-Few",explanation:"علاقة يكون فيها عدد العناصر قليلًا ومحدودًا غالبًا، مثل عناوين المستخدم. Embedding قد يكون مناسبًا."},
{title:"One-to-Many",explanation:"علاقة قد تكبر جدًا مثل User لديه آلاف Orders. غالبًا Reference أفضل."},
{title:"Access Patterns",explanation:"قبل التصميم اسأل: كيف سيقرأ التطبيق هذه البيانات؟ التصميم في MongoDB يجب أن يخدم الاستخدام الحقيقي."}
],
12:[
{title:"Pipeline",explanation:"هي سلسلة مراحل. كل Stage تستقبل Documents من السابقة وتنتج Documents للمرحلة التالية."},
{title:"$match",explanation:"تفلتر Documents مبكرًا لتقليل البيانات الداخلة لباقي المراحل."},
{title:"$group",explanation:"تجمع Documents وتحسب totals أو averages أو counts."},
{title:"$project",explanation:"تحدد شكل النتيجة النهائية أو الحقول المطلوبة."}
],
13:[
{title:"$match",explanation:"تشبه Filter في find، لكنها داخل Aggregation Pipeline.",code:`{ $match:{ status:"completed" } }`},
{title:"$project",explanation:"تسمح باختيار أو إعادة تشكيل Fields التي تمر للمرحلة التالية.",code:`{ $project:{ total:1, createdAt:1, _id:0 } }`},
{title:"ترتيب المراحل",explanation:"وضع $match مبكرًا غالبًا يقلل العمل الذي تقوم به المراحل التالية."}
],
14:[
{title:"Group Key",explanation:"الحقل _id داخل $group يمثل القيمة التي ستجمع على أساسها.",code:`{ $group:{ _id:"$category" } }`},
{title:"$sum",explanation:"تجمع أرقامًا، أو يمكن استخدام 1 لعد Documents.",code:`count:{ $sum:1 }`},
{title:"$avg",explanation:"تحسب المتوسط لقيم Field رقمي."},
{title:"$min / $max",explanation:"تعيد أقل أو أكبر قيمة داخل كل Group."}
],
15:[
{title:"from",explanation:"اسم Collection التي تريد الربط معها."},
{title:"localField",explanation:"الحقل الموجود في Documents الحالية."},
{title:"foreignField",explanation:"الحقل المقابل داخل Collection الأخرى."},
{title:"as",explanation:"اسم Array الجديدة التي ستحتوي النتائج المرتبطة."},
{title:"$unwind",explanation:"يحول عناصر Array إلى Documents منفصلة أو يفك Array ناتجة من $lookup."}
],
16:[
{title:"Filter First",explanation:"ابدأ غالبًا بتقليل البيانات المطلوبة باستخدام $match."},
{title:"Transform",explanation:"استخدم $project أو $addFields لتجهيز شكل البيانات."},
{title:"Aggregate",explanation:"استخدم $group للحسابات."},
{title:"Sort & Limit",explanation:"رتب النتيجة وحدد عددها في النهاية عندما يكون ذلك مناسبًا."}
],
17:[
{title:"Single-field Index",explanation:"Index على Field واحد مثل email. ممتاز عندما تبحث بهذا الحقل كثيرًا."},
{title:"Compound Index",explanation:"Index على أكثر من Field مع ترتيب مهم، مثل category ثم price."},
{title:"Unique Index",explanation:"يمنع تكرار نفس القيمة، مثل email."},
{title:"Multikey Index",explanation:"MongoDB تنشئه تلقائيًا عند عمل Index على Array field."},
{title:"Write Cost",explanation:"كل Index يحتاج تحديثًا عند insert/update/delete، لذلك كثرتها قد تبطئ الكتابة."}
],
18:[
{title:"COLLSCAN",explanation:"يعني MongoDB فحصت Documents في Collection مباشرة."},
{title:"IXSCAN",explanation:"يعني MongoDB استخدمت Index في خطة التنفيذ."},
{title:"docsExamined",explanation:"عدد Documents التي تم فحصها. إذا كان ضخمًا مقارنة بالنتائج فقد توجد مشكلة."},
{title:"keysExamined",explanation:"عدد مفاتيح الـ Index التي تم المرور عليها."},
{title:"executionTimeMillis",explanation:"زمن التنفيذ، لكنه يجب قراءته مع بقية الأرقام وليس وحده."}
],
19:[
{title:"Atomic Operation",explanation:"التعديل على Document واحد يتم كوحدة واحدة؛ لا يرى النظام نصف التعديل."},
{title:"Session",explanation:"سياق يجمع العمليات التي تريد إدخالها في Transaction."},
{title:"Commit",explanation:"تثبيت كل العمليات بعد نجاحها."},
{title:"Abort / Rollback",explanation:"إلغاء العمليات داخل Transaction عند حدوث خطأ."}
],
20:[
{title:"Cluster",explanation:"مجموعة موارد MongoDB التي تستضيف قواعد بياناتك في Atlas."},
{title:"Database User",explanation:"مستخدم مخصص للاتصال بقاعدة البيانات بصلاحيات محددة."},
{title:"Network Access",explanation:"يحدد أي IPs مسموح لها بالاتصال بالCluster."},
{title:"Connection String",explanation:"URI تستخدمه في التطبيق للاتصال بـ Atlas.",code:`mongodb+srv://USER:PASSWORD@cluster.mongodb.net/shop`},
{title:"Environment Variable",explanation:"مكان آمن نسبيًا لحفظ URI بدل كتابتها في الكود."}
],
21:[
{title:"MongoClient",explanation:"الكلاس الرئيسي في MongoDB Driver لإنشاء الاتصال."},
{title:"db()",explanation:"تحدد أي Database تريد استخدامها."},
{title:"collection()",explanation:"تحدد Collection التي ستنفذ عليها العمليات."},
{title:"Async Operations",explanation:"عمليات MongoDB ترجع Promises في Node.js، لذلك تستخدم await غالبًا."}
],
22:[
{title:"Schema",explanation:"تحدد شكل البيانات والقواعد في تطبيقك."},
{title:"Model",explanation:"واجهة تستخدمها لتنفيذ Queries وCRUD على Collection."},
{title:"Validation",explanation:"تمنع بيانات غير مناسبة من المرور حسب القواعد."},
{title:"Middleware",explanation:"يشغل منطق قبل أو بعد عمليات معينة."},
{title:"Populate",explanation:"يسهل جلب Documents المرتبطة عبر ObjectId refs."}
],
23:[
{title:"mongoose.connect()",explanation:"تفتح الاتصال بMongoDB باستخدام URI."},
{title:"MONGO_URI",explanation:"ضع Connection String في Environment Variable، لا داخل الكود."},
{title:"Connection Reuse",explanation:"لا تنشئ اتصالًا جديدًا لكل Query؛ أعد استخدام الاتصال."},
{title:"Connection Errors",explanation:"تعامل مع فشل الاتصال بوضوح لأن التطبيق لا يستطيع العمل طبيعيًا بدون Database."}
],
24:[
{title:"Schema",explanation:"Blueprint يحدد Fields والأنواع والقواعد."},
{title:"Model",explanation:"Object يمثل Collection ويوفر Methods مثل find وcreate."},
{title:"Document",explanation:"Instance فعلية من Model تمثل سجلًا واحدًا."}
],
25:[
{title:"String / Number / Boolean",explanation:"أنواع أساسية شائعة للFields."},
{title:"Date",explanation:"لتخزين الوقت والتاريخ كنوع Date وليس String عادي."},
{title:"ObjectId",explanation:"للمعرفات والعلاقات بين Models."},
{title:"Array / Subdocument",explanation:"للقوائم والبيانات المتداخلة."},
{title:"Schema Options",explanation:"مثل required وdefault وenum وtrim وtimestamps."}
],
26:[
{title:"required",explanation:"يجعل Field ضروريًا عند الحفظ."},
{title:"min / max",explanation:"تحدد حدودًا للأرقام."},
{title:"enum",explanation:"تسمح بمجموعة قيم محددة فقط."},
{title:"match",explanation:"تستخدم Regular Expression للتحقق من String."},
{title:"Custom Validator",explanation:"Function خاصة بك ترجع true أو false حسب منطق التطبيق."}
],
27:[
{title:"create()",explanation:"إنشاء Document وحفظه في قاعدة البيانات."},
{title:"find()",explanation:"إرجاع مجموعة Documents."},
{title:"findOne() / findById()",explanation:"البحث عن Document واحد."},
{title:"findByIdAndUpdate()",explanation:"تحديث Document بالـ id مباشرة."},
{title:"findByIdAndDelete()",explanation:"حذف Document بالـ id."}
],
28:[
{title:"ObjectId Reference",explanation:"Field يخزن _id لـ Document آخر."},
{title:"ref",explanation:"اسم Model الذي يشير إليه ObjectId."},
{title:"populate()",explanation:"يطلب من Mongoose جلب بيانات Document المرتبط بدل إبقاء id فقط."},
{title:"select",explanation:"تستطيع تحديد الحقول التي تريدها من الـ populated document لتقليل البيانات."}
],
29:[
{title:"Subdocument Schema",explanation:"Schema داخل Schema أخرى لتمثيل Object متداخل."},
{title:"Array of Subdocuments",explanation:"مثل items داخل Order."},
{title:"Validation",explanation:"Subdocuments يمكن أن يكون لها validation أيضًا."},
{title:"Lifecycle",explanation:"غالبًا subdocument يعيش ويموت مع الـ parent Document."}
],
30:[
{title:"pre()",explanation:"يشغل Function قبل العملية المحددة."},
{title:"post()",explanation:"يشغل Function بعد العملية."},
{title:"Document Middleware",explanation:"مثل save وvalidate ويعمل على Document."},
{title:"Query Middleware",explanation:"مثل findOneAndUpdate ويعمل على Query."},
{title:"Hook Scope",explanation:"لا تفترض أن Hook لعملية واحدة سيعمل مع عملية مختلفة."}
],
31:[
{title:"Instance Method",explanation:"Function متاحة على Document واحد، وتستخدم this للإشارة إليه."},
{title:"Static Method",explanation:"Function متاحة على Model نفسه، مثل User.findByEmail()."},
{title:"Virtual",explanation:"قيمة محسوبة لا تُخزن افتراضيًا في MongoDB."}
],
32:[
{title:"Mongoose Document",explanation:"Object غني بMethods وGetters وChange Tracking."},
{title:"lean()",explanation:"يطلب من Mongoose إرجاع Plain JavaScript Objects بدل Documents كاملة."},
{title:"متى تستخدمه؟",explanation:"في endpoints القراءة فقط التي لا تحتاج save أو document methods."},
{title:"Trade-off",explanation:"أخف وأسرع غالبًا، لكن تخسر بعض خصائص Mongoose Documents."}
],
33:[
{title:"schema.index()",explanation:"تعريف Index من داخل Schema."},
{title:"Unique",explanation:"يمكن تعريف Index فريد مثل email."},
{title:"Compound",explanation:"يمكن تعريف Index من أكثر من Field."},
{title:"Production",explanation:"يجب إدارة إنشاء Indexes بعناية في production بدل الاعتماد الأعمى على autoIndex."}
],
34:[
{title:"startSession()",explanation:"تبدأ Session جديدة."},
{title:"withTransaction()",explanation:"تنفذ مجموعة عمليات داخل Transaction."},
{title:"session option",explanation:"كل Query داخل Transaction يجب أن تستقبل نفس session."},
{title:"endSession()",explanation:"تنهي Session بعد الانتهاء."}
],
35:[
{title:"ValidationError",explanation:"يظهر عند فشل قواعد Schema validation."},
{title:"CastError",explanation:"يظهر غالبًا عند تحويل قيمة إلى نوع غير مناسب، مثل ObjectId غير صالح."},
{title:"Duplicate Key",explanation:"يظهر عند خرق Unique Index."},
{title:"Mass Assignment",explanation:"خطر يحدث عندما تمرر req.body كاملًا للتحديث بدون whitelist."},
{title:"Safe Errors",explanation:"لا تعرض stack traces أو تفاصيل Database الحساسة للمستخدم."}
],
36:[
{title:"Models",explanation:"ابدأ بتصميم User وProduct وCategory وOrder وReview بناءً على العلاقات والاستخدام."},
{title:"Routes / Controllers / Services",explanation:"افصل مسؤوليات HTTP عن business logic وعن database access."},
{title:"Validation",explanation:"تحقق من input قبل تنفيذ operations."},
{title:"Filtering / Pagination",explanation:"اجعل endpoints قابلة للتعامل مع بيانات كثيرة."},
{title:"Analytics",explanation:"استخدم Aggregation للتقارير مثل revenue وtop products."},
{title:"Transactions",explanation:"استخدمها فقط للعمليات المترابطة التي تحتاج نجاحًا أو فشلًا معًا."}
]
};
