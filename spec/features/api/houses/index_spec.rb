require 'rails_helper'
require './spec/support'

RSpec.describe 'Get Houses Endpoint', type: :request do
  include Support

  it 'Should not allow unauthenticated users to list houses' do
    get api_houses_path

    expect(response.status).to eq(401)
  end

  it 'Should list houses successfully' do
    create_list(:house, 41)

    get api_houses_path, headers: authenticated_headers

    houses = House.order(created_at: :desc)

    idx = rand(0...20)

    result = {
      id: houses[idx].id,
      name: houses[idx].name,
      images: houses[idx].images,
      price_per_month: houses[idx].price_per_month,
      house_type: {
        id: houses[idx].house_type.id,
        name: houses[idx].house_type.name
      }.stringify_keys
    }

    expect(response.status).to eq(200)
    expect(response.parsed_body['data'][idx]).to eq(result.stringify_keys)
  end

  it 'Should provide the data in multiple pages' do
    create_list(:house, 41)

    get api_houses_path, { params: { page: 2 }, headers: authenticated_headers }

    idx = rand(20...40)

    houses = House.order(created_at: :desc)
    result = {
      id: houses[idx].id,
      name: houses[idx].name,
      images: houses[idx].images,
      price_per_month: houses[idx].price_per_month,
      house_type: {
        id: houses[idx].house_type.id,
        name: houses[idx].house_type.name
      }.stringify_keys
    }

    expect(response.status).to eq(200)
    expect(response.parsed_body['data'][idx % 20]).to eq(result.stringify_keys)
  end
end
