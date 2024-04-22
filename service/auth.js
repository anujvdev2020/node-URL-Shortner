const jwt = require("jsonwebtoken")
const secret="Anuj@1998"
function setUser(user){
    
    return jwt.sign({
        id:user._id,
        email:user.email
    },secret)

}

function getUser(token){
    if(!token) return null;
    try{
        return jwt.verify(token,secret)
    }
   catch(error){

    console.log("errr",error)
   }
}


module.exports={setUser,getUser}