FactoryBot.define do
  factory :item do
    list
    title { Faker::Lorem.word }
  end
end
