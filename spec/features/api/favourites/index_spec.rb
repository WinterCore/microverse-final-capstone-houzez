require 'rails_helper'
require './spec/support'

RSpec.describe 'Get Favourites Endpoint', type: :request do
  include Support

  it 'Should not allow unauthenticated users to get favourites' do
    get api_favourites_path

    expect(response.status).to eq(401)
  end

  it 'Should list house types successfully' do
    house = create(:house)
    user = create(:user)

    house.favouritors << user

    get api_favourites_path, headers: authenticated_headers(user)
    p response.body

    result = {
      id: house.id,
      name: house.name,
      images: house.images,
      price_per_month: house.price_per_month,
      house_type: {
        id: house.house_type.id,
        name: house.house_type.name
      }.stringify_keys
    }

    expect(response.status).to eq(200)
    expect(response.parsed_body['data'][0]).to eq(result.stringify_keys)
  end
end
