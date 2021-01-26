require 'rails_helper'
require './spec/support'

RSpec.describe 'Houses', type: :feature do
  include Support

  scenario 'Displays all houses' do
    create_list(:house, 10)
    login_admin
    visit houses_path

    houses = House.all

    houses.each do |house|
      expect(page).to have_content(house.id)
      expect(page).to have_content(house.name)
    end
  end

  scenario 'Deletes houses' do
    house = create(:house)
    login_admin
    visit houses_path

    click_button 'Delete'

    expect(page).to have_content('House was successfully deleted.')
    expect(page).not_to have_content(house.name)
  end

  scenario 'Create a new house' do
    login_admin

    house_type = create(:house_type)
    house = build(:house)

    visit new_house_path

    fill_in 'house[name]', with: house.name
    select house_type.name, from: 'house[house_type_id]'
    fill_in 'house[description]', with: house.description
    fill_in 'house[price_per_month]', with: house.price_per_month
    attach_file('house[images][]', Rails.root.join('app', 'assets', 'images', 'potato.jpeg'))

    click_button 'Create'

    expect(page).to have_content(house.name)
    expect(page).to have_content(house.id)
  end
end
