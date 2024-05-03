class AddNewFieldsToUserTable < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :username, :string, limit: 32
  end
end
