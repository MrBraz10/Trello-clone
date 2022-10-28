class ItemSerializer
  include JSONAPI::Serializer
  attributes :title, :class_list
end
