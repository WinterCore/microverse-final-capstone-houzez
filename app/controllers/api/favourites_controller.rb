class Api::FavouritesController < ApiController
  before_action :authorized

  def index
    @houses = logged_in_user.favourited_houses.includes(:house_type)
    render 'api/houses/index'
  end
end
