Rails.application.routes.draw do

  scope module: :admin, path: 'admin' do
    get '/', to: redirect('/admin/dashboard')
    devise_for :admins, skip: :all
    devise_scope :admin do 
      get 'login', to: 'sessions#new', as: :new_admin_session
      post 'login', to: 'sessions#create', as: :admin_session
      get 'logout', to: 'sessions#destroy', as: :destroy_admin_session
    end

    authenticate :admin do
      get 'dashboard' => 'dashboard#index', :as => :user_root
    end
  end

  namespace :api do
    post '/login', to: 'users#login'

    resources :house_types, only: [:index]
    resources :favourites, only: [:index]
    resources :houses, only: [:index, :show] do
      post 'favourite', to: 'houses#favourite'
      post 'unfavourite', to: 'houses#unfavourite'
    end
  end

  root 'static#index'
  get '*path', to: 'static#index'
end
