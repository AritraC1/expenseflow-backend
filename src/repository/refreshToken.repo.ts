import token from "../models/refreshToken.model";

class RefreshTokenRepository {
  // Find token
  findById = (id: string) => {
    return token.findById(id);
  };

  // create entry
  saveRefreshToken = (
    userId: string,
    hash_token: string,
    expires_at: Date,
    revoked: boolean = false,
    ip_address: string,
  ) => {
    const newToken = token.create({
      user_id: userId,
      token_hash: hash_token,
      expires_at,
      revoked,
      ip_address,
    });

    return newToken;
  };

  // Delete and revoke token
  revokeRefreshToken = (tokenId: string) => {
    return token.findByIdAndUpdate(tokenId, {
      revoked: true,
    });
  };

  // Get refresh token
  getRefreshToken = (tokenHash: string) => {
    return token.findOne({ token_hash: tokenHash });
  };
}

export default RefreshTokenRepository;
