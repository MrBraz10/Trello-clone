class BoardsController < ApplicationController
  before_action :authenticate_user!

  def new
    @board = Board.new
  end
end