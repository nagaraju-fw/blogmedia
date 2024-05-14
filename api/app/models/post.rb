class Post < ApplicationRecord
  has_many :comments, dependent: :destroy
  belongs_to :user, foreign_key: :user_id

  def as_json(options = {})
    super(options.merge(include: :user))
  end

end
