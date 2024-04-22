const express=require("express")
const app =express();
const PORT=8001;
const cookieParser=require("cookie-parser")
const {connectMongoDb}=require('./connection');
const {restrictToLoggedInUserOnly,checkAuth} = require("./middlewares/auth")
const URL=require('./models/url')

const urlRoute=require("./routes/url")
const staticRoute=require("./routes/staticRouter");
const userRoute=require("./routes/user")
const path=require("path")

connectMongoDb('mongodb://127.0.0.1:27017/short-url').then(()=>console.log("MongoDb connected"))


app.set("view engine","ejs");
app.set('views',path.resolve('./views'))

app.get("/tests",async (req,res)=>{
    const allUrls= await URL.find({})
    return res.render('home',{
        urls:allUrls
    })
})

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());



app.use('/url',restrictToLoggedInUserOnly,urlRoute)
app.use('/user',userRoute)
app.use('/',checkAuth,staticRoute)

app.get("/url/:shortId",async (req,res)=>{
    const shortId=req.params.shortId
    const entry=await URL.findOneAndUpdate(
        {
            shortId
        },
        {
            $push:{
                visitHistory:{
                     timestamp:Date.now()
                    }
                }
        }
    );
    res.redirect(entry.redirectURL);
})

app.listen(PORT,()=>console.log("SERVER started at PORT "+PORT));