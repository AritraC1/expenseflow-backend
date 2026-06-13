import mongoose from "mongoose";

const RefreshTokenModel = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    token_hash: {
      type: String,
      required: true,
    },
    expires_at: {
      type: Date,
      required: true,
    },
    revoked: {
      type: Boolean,
      default: false,
    },
    ip_address: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const RefreshToken = mongoose.model("refresh-token", RefreshTokenModel);

export default RefreshToken;
