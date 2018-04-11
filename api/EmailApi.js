import nodemailer from "nodemailer";
import Email from "email-templates";
import config from "../config/index";
import path from "path";

export default class EmailApi {
  
  constructor() {
    this.transporter = nodemailer.createTransport(config.smtp);
  }
  
  _createMail = () => {
    return new Email(
      {
        message: {
          from: {
            name: "Our Voice",
            address: "no-reply@our-voice.io"
          }
        },
        send: true,
        transport: this.transporter,
        juice: true,
        juiceResources: {
          preserveImportant: true,
          webResources: {
            relativeTo: path.join(__dirname, "..")
          }
        }
      });
  };
  
  sendWelcomeEmail = async (user) => {
    
    let email = this._createMail();
  
    await email.send(
    {
      template: "welcome",
      message: {
        to: user.email
      },
      send: true,
      locals: Object.assign({}, user, { website: "http://our-voice.io" })
    });
  };
  
  sendResetPasswordEmail = async (user) => {
  
    let email = this._createMail();
  
    await email.send(
    {
      template: "resetpassword",
      message: {
        to: user.email
      },
      send: true,
      locals: Object.assign({}, user, { reseturl: `http://our-voice.io/auth/reset/${user.resetPasswordToken}` })
    });
  };
  
}
