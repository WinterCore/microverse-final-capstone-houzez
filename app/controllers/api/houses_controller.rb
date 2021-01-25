class Api::HousesController < ApiController
  before_action :authorized

  HOUSES_PER_PAGE = 20

  def index
    @page = params.fetch(:page, 1).to_i - 1
    @houses = House
      .belong_to_type(params[:type])
      .includes(:house_type)
      .order(created_at: :desc)
      .offset(@page * HOUSES_PER_PAGE)
      .limit(HOUSES_PER_PAGE)

    render 'api/houses/index'
  end

  def show
    @house = House.includes(:house_type).find(params[:id])

    render 'api/houses/show'
  end

  def favourite
    if logged_in_user.favourites.exists?(house_id: params[:house_id])
      render json: { message: 'You\'ve already favourited this house!' }, status: :forbidden
    else
      logged_in_user.favourited_houses << House.find(params[:house_id])
      render json: { message: 'Success' }
    end
  end

  def unfavourite
    favourite = logged_in_user.favourites.find_by(house_id: params[:house_id])
    favourite&.delete
    render json: { message: 'Success' }
  end
end
