FactoryBot.define do
  factory :list do
    board { nil }
    title { Faker::Lorem }
  end
end
