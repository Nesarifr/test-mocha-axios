import {createTransport} from "nodemailer";
import { options } from "../config/config.js";

//Credenciales
export const emailAdmin = options.message.email.ADMIN_EMAIL
const emailAdminPass = options.message.email.ADMIN_EMAIL_PASS

// Config nodemailer
export const transporterEmail = createTransport({
    host:"smtp.gmail.com",
    puerto: 587,
    auth:{
        type: "register",
        user:emailAdmin,
        pass:emailAdminPass
    },
    secure: false, //cambiar a true en deploy
    tls:{
        rejectUnauthorized:false
    }
})