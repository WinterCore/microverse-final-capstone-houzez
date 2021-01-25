class House < ApplicationRecord
  belongs_to :house_type
  has_many :favourites
  has_many :favouritors, through: :favourites, source: :user
  scope :group_by_month, -> { group("date_trunc('month', created_at)") }
  scope :last_year, -> { where('created_at >= ?', (Time.zone.now - 1.year).beginning_of_year) }

  scope :belong_to_type, ->(type) { where(house_type_id: type) unless type.nil? }

  def images=(images)
    paths = []
    (images || []).each do |image|
      if image.instance_of?(ActionDispatch::Http::UploadedFile)
        extension = File.extname(image)
        path = File.join('uploads', "#{Time.now.to_i}_#{Random.rand(1e9)}#{extension}")
        File.open(Rails.root.join('public', path), 'wb') do |file|
          file.write(image.read)
        end
        paths.push("/#{path}")
      else
        paths.push(image)
      end
    end
    write_attribute(:images, paths)
  end

  validates :name, :description, :price_per_month, :images, :house_type_id, presence: true
  validates :name, length: { minimum: 3, maximum: 255 }
  validates :price_per_month, numericality: { greater_than: 0 }
end
