class Api::HouseTypesController < ApiController
  before_action :authorized

  def index
    @houseTypes = HouseType.all
    render 'house_types/index'
  end
end
