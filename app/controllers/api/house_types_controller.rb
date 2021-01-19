class Api::HouseTypesController < ApiController
  before_action :authorized

  def index
    @house_types = HouseType.all
    render 'house_types/index'
  end
end
