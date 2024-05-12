Rails.application.routes.draw do
  resources :posts do
    resources :comments
  end
  post 'auth/login'
  post 'auth/validate'
  resources :users do
    collection do
      get 'checkUserNameExists'
      get 'validate'
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
