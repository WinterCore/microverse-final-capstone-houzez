class CreateHouses < ActiveRecord::Migration[6.1]
  def change
    create_table :houses do |t|
      t.references :house_type, null: false, foreign_key: true
      t.string :name, null: false
      t.text :description, null: false
      t.json :images, null: false, default: []
      t.float :price_per_month, null: false

      t.timestamps
    end
  end
end
