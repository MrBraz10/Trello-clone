FactoryBot.define do
  factory :list do
    board
    title { Faker::Lorem.word }
  end
end
