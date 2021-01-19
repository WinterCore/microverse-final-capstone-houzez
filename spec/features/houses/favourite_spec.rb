require 'rails_helper'
require './spec/support'

RSpec.describe 'Favourite Houses Endpoint', type: :request do
  include Support

  it 'Should not allow unauthenticated users to favourite houses' do
    post api_house_favourite_path(1)

    expect(response.status).to eq(401)
  end

  it 'Should allow users to favourite houses' do
    house = create(:house)
    user = create(:user)

    post api_house_favourite_path(house.id), headers: authenticated_headers(user)

    expect(response.status).to eq(200)
    expect(response.parsed_body).to eq({ "message" => "Success" })
    expect(house.favourites.exists?(user_id: user)).to eq(true)
  end

  it 'Shouldn\'t allow users to favourite an already favourited house' do
    house = create(:house)
    user = create(:user)
    house.favouritors << User.last

    post api_house_favourite_path(house.id), headers: authenticated_headers(user)

    expect(response.status).to eq(403)
    expect(response.parsed_body).to eq({ "message" => "You've already favourited this house!" })
  end
end
