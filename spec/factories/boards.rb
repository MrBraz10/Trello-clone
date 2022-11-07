FactoryBot.define do
  factory :board do
    name { Faker::Lorem.word }
    user
  end
end
