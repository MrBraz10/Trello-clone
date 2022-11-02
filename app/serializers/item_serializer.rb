class ItemSerializer
  include JSONAPI::Serializer
  attributes :title, :list_id
end
