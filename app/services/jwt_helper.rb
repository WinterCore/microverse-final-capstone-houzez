class JwtHelper
  def self.encode(payload)
    JWT.encode(
      payload.merge({ exp: Time.now.to_i + 30 * 24 * 60 * 60 }),
      Rails.application.credentials.jwt_secret || 'Potato'
    )
  end

  def self.decode(token)
    JWT.decode(token, Rails.application.credentials.jwt_secret || 'Potato', true, algorithm: 'HS256')
  rescue JWT::DecodeError
    nil
  end
end
