class Admin::DashboardController < ApplicationController
  def index
    @stats = House.last_year.group_by_month.count
  end
end
