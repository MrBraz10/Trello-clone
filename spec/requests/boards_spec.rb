require "rails_helper"

RSpec.describe "Boards", type: :request do
  let(:user) { create(:user) }

  before do
    sign_in user
  end

  describe "GET new" do
    it "succeeds" do
      get new_board_path
      expect(response).to have_http_status(:success)
    end
  end
end
