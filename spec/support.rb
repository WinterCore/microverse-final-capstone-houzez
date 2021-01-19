module Support
  def user_token(user)
    JwtHelper.encode({ id: user.id })
  end

  def authenticated_headers(user = create(:user))
    { Authorization: "Bearer #{user_token(user)}" }
  end
end
