require "rails_helper"

RSpec.describe "Api::Items", type: :request do
  let(:item) { create(:item) }

  describe "GET show" do
    it "succeeds" do
      get api_item_path(item)
      expect(response).to have_http_status(:success)
      json_response = JSON.parse(response.body)
      expect(json_response.dig("data", "attributes", "title").to eq(item.title))
    end
  end
end
