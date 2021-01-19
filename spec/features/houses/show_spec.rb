require 'rails_helper'
require './spec/support'

RSpec.describe 'Get House by ID Endpoint', type: :request do
  include Support

  it 'Should not allow unauthenticated users to show houses' do
   get api_house_path(1)

   expect(response.status).to eq(401)
  end

  it 'Should list a house by ID successfully' do
    house = create(:house)

    get api_house_path(house.id), headers: authenticated_headers

    house = House.includes(:house_type).find(house.id)

    result = {
      id: house.id,
      name: house.name,
      images: house.images,
      description: house.description,
      price_per_month: house.price_per_month,
      house_type: {
        id: house.house_type.id,
        name: house.house_type.name
      }.stringify_keys,
      favourited: house.favourites.exists?(user_id: User.last)
    }

    expect(response.status).to eq(200)
    expect(response.parsed_body).to eq("data" => result.stringify_keys)
  end
end
