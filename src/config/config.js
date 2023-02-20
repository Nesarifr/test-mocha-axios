import * as dotenv from "dotenv";
import ParsedArgs  from "minimist";


dotenv.config()

const objArgs = ParsedArgs(process.argv.slice(2), {
    alias: {
        p: `port`,
        m: `mode`,
        e: `env`
    }, default: {
        port: 8080,
        mode: 'FORK',
        env: 'test'
    }
})

export const options = {
    server: {
        PORT: objArgs.port,
        MODE: objArgs.mode,
        NODE_ENV: objArgs.env,
        BASE_DATATYPE: process.env.BASE_DATATYPE
    },
    mongoDB: {
        MONGOURLBD: objArgs.env === 'test' ? process.env.MONGOURLBD_TEST : process.env.MONGOURLBD,
        MONGOURLBD_AUTH: process.env.MONGOURLBD_AUTH,
        MONGOURL_SESSION: process.env.MONGOURL_SESSION
    },
    message: {
        email: {
            ADMIN_EMAIL: process.env.ADMIN_EMAIL,
            ADMIN_EMAIL_PASS: process.env.ADMIN_EMAIL_PASS,
        },
        phone: {
            ADMIN_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER
        },
        whatsapp: {
            ADMIN_WHATSAPP: process.env.ADMIN_WHATSAPP,
            TWILIO_WHATSAPP: process.env.TWILIO_WHATSAPP
        },
        twilioCredential: {
            ADMIN_ACCOUNTID: process.env.ADMIN_TWILIO_ACCOUNTID,
            ADMIN_TOKEN: process.env.ADMIN_TWILIO_AUTHTOKEN,

        }
    }
};