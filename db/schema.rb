# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_01_18_172335) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "favourites", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "house_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["house_id"], name: "index_favourites_on_house_id"
    t.index ["user_id", "house_id"], name: "index_favourites_on_user_id_and_house_id"
    t.index ["user_id"], name: "index_favourites_on_user_id"
  end

  create_table "house_types", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "houses", force: :cascade do |t|
    t.bigint "house_type_id", null: false
    t.string "name", null: false
    t.text "description", null: false
    t.json "images", null: false
    t.float "price_per_month", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["house_type_id"], name: "index_houses_on_house_type_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "google_id", null: false
    t.string "name", null: false
    t.string "email", null: false
    t.string "picture"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["google_id"], name: "index_users_on_google_id"
  end

  add_foreign_key "favourites", "houses"
  add_foreign_key "favourites", "users"
  add_foreign_key "houses", "house_types"
end
