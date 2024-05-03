class UsersController < ApplicationController

    before_action :authorize, except: [:create]

    def create
        user = User.create(user_params)
        if user.valid?
            user = user
            token = JWT.encode({user_id: user.id}, ENV['APP_SECRET_KEY'], 'HS256')
            render json: {user: user, token: token}
        else
            render json: {errors: user.error.full_messages}
        end
    end

    def update
        user = User.find(params[:id])
        user.update(user_params)
        render json: user
    end

    def show
        user = User.find(params[:id])
        render json: user
    end

    def delete
        user = User.find(params[:id])
        user.destroy
    end

    private 

    def user_params
        params.permit(:email, :password, :username)
    end

end
