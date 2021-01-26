require 'rails_helper'

RSpec.describe 'Authentication', type: :feature do
  let(:admin) { create(:admin) }

  scenario 'Login' do
    visit new_admin_session_path
    fill_in 'admin[email]', with: admin.email
    fill_in 'admin[password]', with: 'admin'
    click_button 'Sign in'
    expect(page).to have_content('Signed in successfully.')
  end

  scenario 'Logout' do
    visit new_admin_session_path
    fill_in 'admin[email]', with: admin.email
    fill_in 'admin[password]', with: 'admin'
    click_button 'Sign in'
    click_link 'Logout'
    expect(page).to have_content('Sign in to your account')
  end
end
