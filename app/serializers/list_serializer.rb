class ListSerializer
  include JSONAPI::Serializer
  attributes :title, :class_list

  has_many :items, serializer: ItemSerializer
end
