const {getUser}=require('../service/auth')

async function restrictToLoggedInUserOnly(req,res,next){
    console.log(req)
    const userid=req.headers["authorization"];
    if(!userid) return res.redirect('/login')

    const token= userid.split("Bearer ")[1]
    const user=getUser(token)
    if(!user) return res.redirect('/login')


    req.user=user
    next();
};


async function checkAuth(req,res,next){
    const userid=req.headers["authorization"];
    const token= userid.split("Bearer ")[1]
    const user=getUser(token)
    req.user=user
    next();
};




module.exports={restrictToLoggedInUserOnly,checkAuth}