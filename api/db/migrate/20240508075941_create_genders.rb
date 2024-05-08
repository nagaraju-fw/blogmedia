class CreateGenders < ActiveRecord::Migration[5.2]
  def change
    create_table :genders, id: false do |t|
      t.string :gender, primary_key: true
      t.string :name, limit: 32
    end

    add_index :genders, :name, unique: true
    execute "INSERT INTO genders (gender, name) VALUES ('F', 'Female'), ('M', 'Male')"
  end
end
