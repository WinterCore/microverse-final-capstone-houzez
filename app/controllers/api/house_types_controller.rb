class Api::HouseTypesController < ApplicationController
  def index
    types = HouseType.all
    render_response json: types
  end
end
