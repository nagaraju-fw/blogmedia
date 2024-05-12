class User < ApplicationRecord
  validates :email, uniqueness: true
  has_secure_password

  has_many :posts

  def as_json(options = {})
    super(options.merge({ except: [:password, :password_digest] }))
  end
end
