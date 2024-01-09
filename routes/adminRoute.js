const express = require('express');
const admin_route = express();

const session = require('express-session');
const config = require('../config/config');
admin_route.use(session({secret: config.sessionSecret,resave:false, saveUninitialized:false}));

const bodyParser = require('body-parser');


const nocache = require('nocache');

admin_route.use(nocache());


admin_route.use(bodyParser.json());
admin_route.use(bodyParser.urlencoded({extended:true}));

admin_route.set('view engine','ejs');
admin_route.set('views','./views/admin');

const auth = require('../middileware/adminAuth');

const adminController = require('../controller/adminController');

admin_route.get('/' ,auth.isLogout,adminController.loadLogin );

admin_route.get('/home',auth.islogin,adminController.loadDashboard);

admin_route.post('/',adminController.verifyLogin);

admin_route.get('/logout',adminController.logout);

admin_route.get('/new-user',auth.islogin,adminController.newUserLoad);
admin_route.post('/new-user',adminController.addUser);

admin_route.get('/edit-user',auth.islogin,adminController.editUserLoad);
admin_route.post('/edit-user',adminController.updateUser);

admin_route.get('/delete-user',adminController.deleteUser);

admin_route.get('*',(req,res)=>res.redirect('/admin'));

module.exports =  admin_route;
   
