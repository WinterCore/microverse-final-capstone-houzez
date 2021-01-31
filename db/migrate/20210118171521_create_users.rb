class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :google_id, null: false, index: true
      t.string :name, null: false
      t.string :email, null: false
      t.string :picture

      t.timestamps
    end
  end
end
