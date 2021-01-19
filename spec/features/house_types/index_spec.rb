require 'rails_helper'
require './spec/support'

RSpec.describe 'Get House Types Endpoint', type: :request do
  include Support

  it 'Should not allow unauthenticated users to list house types' do
    get api_house_types_path

    expect(response.status).to eq(401)
  end

  it 'Should list house types successfully' do
    create_list(:house_type, 21)

    get api_house_types_path, headers: authenticated_headers

    houseTypes = HouseType.all

    idx = rand(0...10)

    result = {
      id: houseTypes[idx].id,
      name: houseTypes[idx].name,
    }

    expect(response.status).to eq(200)
    expect(response.parsed_body['data'][idx]).to eq(result.stringify_keys)
  end
end
