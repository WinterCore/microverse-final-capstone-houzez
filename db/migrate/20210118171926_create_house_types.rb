class CreateHouseTypes < ActiveRecord::Migration[6.1]
  def change
    create_table :house_types do |t|
      t.string :name, null: false

      t.timestamps
    end
  end
end
