const User = require('../model/userModel');
const bcrypt = require('bcrypt');

const securePassword = async (password)=>{
   try {
      const passwordHash = await bcrypt.hash(password, 10);
      return passwordHash;
   } catch (error) {
     console.log(error.message);  
   }
}

const loadRegister = async(req,res)=>{
     try {
        res.render('registration');
     } catch (error) {
        console.log(error.message);
     }
}
const insertUser = async(req,res)=>{
       
   try {
      const spassword = await securePassword(req.body.password);
      const user = new User({
           name:req.body.name,
           email:req.body.email,
           mobile:req.body.mobile,
           password:spassword,
           is_admin:0,         
      });

      const userData = await user.save();
      
      if(userData){
         
         res.redirect('/login');
      }else{
         res.render('registration',{message:"your registration has been failed"})
      }
    }
    catch (error) {
      console.log(error.message);
   }
}

     //login user methods started

 const loginLoad = async(req,res)=>{
   try {
      res.render('login');
   } catch (error) {
      console.log(error.message);
   }
 }


const verifyLogin = async(req,res)=>{
   try {
      
      const email = req.body.email;   
      const password = req.body.password;
      let userData = await User.findOne({email:email});
      if(userData){
         const passwordMatch = await bcrypt.compare(password,userData.password);

      if(passwordMatch){
         req.session.user_id = userData._id
          res.redirect('/home');  
      }else{
         res.render('login', {message:"Email and Password is incorrect"});
      }
      }else{
            res.render('login', {message:"Email and Password is incorrect"});
      }
   } catch (error) {
      console.log(error.message);
   }
}

const loadHome = async (req,res)=>{
   try {
     const userData =  await User.findById({_id:req.session.user_id});
      res.render('home',{user:userData});
   } catch (error) {
      console.log(error.message);
   }
}

const userLogout = async (req,res,next)=>{
   try {
      req.session.destroy();
      res.redirect('/');
   } catch (error) {
      console.log(error.message);
   }
}

module.exports={
    loadRegister,
    insertUser,
    loginLoad,
    verifyLogin,
    loadHome ,
    userLogout
}