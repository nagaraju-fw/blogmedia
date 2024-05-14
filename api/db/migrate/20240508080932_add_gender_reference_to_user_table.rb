class AddGenderReferenceToUserTable < ActiveRecord::Migration[5.2]
  def change
    add_foreign_key :users, :genders, column: :gender, primary_key: :gender
  end
end
