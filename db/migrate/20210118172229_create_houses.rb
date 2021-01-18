class CreateHouses < ActiveRecord::Migration[6.1]
  def change
    create_table :houses do |t|
      t.references :house_type, null: false, foreign_key: true
      t.string :name
      t.text :description
      t.json :images
      t.float :price_per_month

      t.timestamps
    end
  end
end
