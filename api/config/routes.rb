Rails.application.routes.draw do
  post 'auth/login'
  post 'auth/validate'
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
