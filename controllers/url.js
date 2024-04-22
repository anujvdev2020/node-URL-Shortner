
const URL=require("../models/url")
const ShortUniqueId = require('short-unique-id');

async function handlegenerateNewShortUrl(req,res){
    const body=req.body;
    
    if(!body.url) return res.status(400).json({error:"url is requrired"})
    const uid = new ShortUniqueId({ length: 10 });
    const shortId=uid.rnd()
    await URL.create({
        shortId,
        redirectURL:body.url,
        visitHistory:[],
        createdBy:req.user._id
    })
    return res.render('home',{id:shortId})
}


async function handleGetAnalytics(req,res){
    const shortId=req.params.shortId;
    const result = await URL.findOne({shortId})
    res.json({totalClicks:result.visitHistory.length,analytics:result.visitHistory})
}



module.exports = {handlegenerateNewShortUrl,handleGetAnalytics}