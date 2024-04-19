const express=require("express")
const urlRoute=require("./routes/url")
const app =express();
const PORT=8001;
const {connectMongoDb}=require('./connection');
const URL=require('./models/url')

const staticRoute=require("./routes/staticRouter");
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

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/url',urlRoute)
app.use('/',staticRoute)

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