FactoryBot.define do
  factory :user do
    google_id { Faker::Name.unique.name }
    name { Faker::Name.name }
    email { Faker::Internet.email }
    picture { "https://picsum.photos/400" }
  end
end
