class Api::UsersController < ApiController
  def login
    data = validate_id_token
    if data
      @user = create_or_update_user(data)
      @token = JwtHelper.encode({ id: @user.id })
      render 'users/login'
    else
      render json: { message: 'Invalid token' }, status: :unauthorized
    end
  end

  private

  def create_or_update_user(data)
    user = User.find_by(google_id: data['sub'])
    filtered_data = {
      name: data['name'],
      email: data['email'],
      picture: data['picture'],
      google_id: data['sub']
    }
    if user
      user.update(filtered_data)
    else
      user = User.create(filtered_data)
    end
    user
  end

  def validate_id_token
    validator = GoogleIDToken::Validator.new
    begin
      client_id = Rails.application.credentials.google_sign_in[:client_id]
      validator.check(login_params[:token], client_id)
    rescue StandardError
      nil
    end
  end

  def login_params
    params.permit(:token)
  end
end
