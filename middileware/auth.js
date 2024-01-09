const isLogin = async (req,res,next)=>{
    try {
        
        if(req.session.user_id){
        next()
        }else{
            res.redirect('/');
        }
          
    } catch (error) {
        console.log(error.message);
    }
}

const isLogout = (req,res,next)=>{
    try {
        if(!req.session.user_id){
         next()
        }else{

            res.redirect('/home')

        }
       
    } catch (error) {
        console.log(error.message);
    }
}

module.exports={
    isLogin,
    isLogout
}

