const {getUser}=require('../service/auth')

async function restrictToLoggedInUserOnly(req,res,next){
    console.log(req)
    const userid=req.cookies?.uid;
    if(!userid) return res.redirect('/login')

    const user=getUser(userid)
    if(!user) return res.redirect('/login')


    req.user=user
    next();
};


async function checkAuth(req,res,next){
    const userid=req.cookies?.uid;
    const user=getUser(userid)
    req.user=user
    next();
};




module.exports={restrictToLoggedInUserOnly,checkAuth}