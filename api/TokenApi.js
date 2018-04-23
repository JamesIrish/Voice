import mongoose from "mongoose";
import config from "../config/index";

let Schema = mongoose.Schema;

let refreshTokenSchema = mongoose.Schema(
{
  userId: { type: Schema.Types.ObjectId, required: true },
  expires: { type: Date, required: true },
  refreshToken: { type: String, required: true }
}, { timestamps: true });

let passwordResetTokenSchema = mongoose.Schema(
{
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    index: true
  },
  expires: { type: Date, required: true },
  resetToken: {
    type: String,
    required: true,
    index: true
  }
}, { timestamps: true });

export default class TokenApi {

  constructor()
  {
    this._url = config.mongoDb.url;
    this._settings = config.mongoDb.settings;
  }

  initialise = async () =>
  {
    await mongoose.connect(this._url, this._settings);

    this._db = mongoose.connection;

    this.RefreshToken = mongoose.model("refresh_token", refreshTokenSchema);
    this.ResetPasswordToken = mongoose.model("reset_password_token", passwordResetTokenSchema);
  };

  createRefreshToken = async (model) => {
    return await this.RefreshToken.create(model);
  };

  createResetPasswordToken = async (model) => {
    return await this.ResetPasswordToken.create(model);
  };

  findRefreshTokens = async (query) => {
    return await this.RefreshToken.find(query).exec();
  };

  findOneResetPasswordToken = async (query) => {
    return await this.ResetPasswordToken.findOne(query).exec();
  };

}
