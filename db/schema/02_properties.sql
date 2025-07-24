CREATE TABLE properties (
  id SERIAL PRIMARY KEY,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  cost_per_night INTEGER NOT NULL,
  parking_spaces INTEGER DEFAULT 0,
  number_of_bathrooms INTEGER,
  number_of_bedrooms INTEGER,
  thumbnail_photo_url VARCHAR(255),
  cover_photo_url VARCHAR(255),
  country VARCHAR(255),
  street VARCHAR(255),
  city VARCHAR(255),
  province VARCHAR(255),
  post_code VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE
);