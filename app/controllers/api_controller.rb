class ApiController < ActionController::Base
  protect_from_forgery with: :null_session
  helper_method :logged_in_user

  def auth_header
    request.headers['Authorization']
  end

  def decoded_token
    return unless auth_header

    token = auth_header.split(' ')[1]
    JwtHelper.decode(token)
  end

  def logged_in_user
    return unless decoded_token

    user_id = decoded_token[0]['id']
    @user = User.find_by(id: user_id)
  end

  def logged_in?
    !logged_in_user.nil?
  end

  def authorized
    render json: { message: 'Please log in' }, status: :unauthorized unless logged_in?
  end
end
