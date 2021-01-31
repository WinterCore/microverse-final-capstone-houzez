module Support
  def user_token(user)
    JwtHelper.encode({ id: user.id })
  end

  def authenticated_headers(user = create(:user))
    { Authorization: "Bearer #{user_token(user)}" }
  end

  def login_admin(admin = create(:admin))
    visit new_admin_session_path
    fill_in 'admin[email]', with: admin.email
    fill_in 'admin[password]', with: 'admin'
    click_button 'Sign in'
  end
end
