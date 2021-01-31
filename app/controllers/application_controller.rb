class ApplicationController < ActionController::Base
  def after_sign_out_path_for(*)
    new_admin_session_path
  end

  def after_sign_in_path_for(*)
    admin_dashboard_path
  end
end
