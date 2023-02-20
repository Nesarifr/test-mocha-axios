import twilio from "twilio";
import { options } from "../config/config.js";


const accountId = options.message.twilioCredential.ADMIN_ACCOUNTID;
const authtoken = options.message.twilioCredential.ADMIN_TOKEN;
export const twilioPhone = options.message.phone.ADMIN_PHONE_NUMBER;
export const twilioWapp = options.message.whatsapp.TWILIO_WHATSAPP;
export const adminWapp = options.message.whatsapp.ADMIN_WHATSAPP
export const twilioCliente = twilio(accountId,authtoken);