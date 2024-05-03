class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :email, limit: 64
      t.string :password_digest

      t.timestamps
    end
  end
end
