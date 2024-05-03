Rails.application.routes.draw do
  get 'auth/login'
  get 'auth/validate'
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
