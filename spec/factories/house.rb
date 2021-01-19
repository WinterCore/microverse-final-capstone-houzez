FactoryBot.define do
  factory :house do
    house_type
    name { Faker::Name.name }
    description { Faker::Lorem.paragraph }
    price_per_month { Faker::Number.decimal(l_digits: 2) }
    images { ["https://picsum.photos/400"] }
  end
end
