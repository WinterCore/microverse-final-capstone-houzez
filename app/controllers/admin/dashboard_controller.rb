class Admin::DashboardController < ApplicationController
  def index
    @stats = User.last_year.group_by_month.count
  end
end
