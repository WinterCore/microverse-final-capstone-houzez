Rails.application.routes.draw do
  root 'static#index'

  namespace :api do
    post '/login', to: 'users#login'
  end
end
