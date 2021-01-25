class Admin::HousesController < ApplicationController
  before_action :set_house_types, only: [:new]

  def index
    @houses = House.order(created_at: :desc).all
  end

  def new
    @house = House.new
  end

  def create
    @house = House.new(house_params)
    if @house.save
      redirect_to houses_path, notice: 'House created successfully!'
    else
      set_house_types
      render 'new'
    end
  end

  def destroy
    @house = House.find(params[:id])
    @house.favourites.destroy_all
    @house.destroy
    redirect_to houses_path, notice: 'House was successfully deleted.'
  end

  private

  def set_house_types
    @house_types = HouseType.pluck(:name, :id)
  end

  def house_params
    params.require(:house).permit(:name, :price_per_month, :description, :house_type_id, images: [])
  end
end
