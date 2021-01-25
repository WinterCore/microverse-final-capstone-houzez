require 'rails_helper'
require './spec/support'

RSpec.describe 'Unfavourite Houses Endpoint', type: :request do
  include Support

  it 'Should not allow unauthenticated users to unfavourite houses' do
    post api_house_unfavourite_path(1)

    expect(response.status).to eq(401)
  end

  it 'Should allow users to unfavourite houses' do
    house = create(:house)
    user = create(:user)
    house.favouritors << user

    post api_house_unfavourite_path(house.id), headers: authenticated_headers(user)

    expect(response.status).to eq(200)
    expect(response.parsed_body).to eq({ 'message' => 'Success' })
    expect(house.favourites.exists?(user_id: user)).to eq(false)
  end
end
