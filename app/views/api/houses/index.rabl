if !@houses.empty?
  child @houses, root: 'data', object_root: false do
    extends 'houses/snippet'
  end
else
  node(:data) { [] }
end
