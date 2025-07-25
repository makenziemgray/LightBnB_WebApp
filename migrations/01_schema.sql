-- Drop tables in reverse order of dependencies
DROP TABLE IF EXISTS property_reviews CASCADE;
DROP TABLE IF EXISTS reservations CASCADE;
DROP TABLE IF EXISTS properties CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- Properties table
CREATE TABLE properties (
  id SERIAL PRIMARY KEY,
  owner_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  thumbnail_photo_url TEXT,
  cover_photo_url TEXT,
  cost_per_night INTEGER NOT NULL,
  parking_spaces INTEGER DEFAULT 0,
  number_of_bathrooms INTEGER DEFAULT 1,
  number_of_bedrooms INTEGER DEFAULT 1,
  country VARCHAR(100) NOT NULL,
  street VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  province VARCHAR(100) NOT NULL,
  post_code VARCHAR(20) NOT NULL,
  active BOOLEAN DEFAULT TRUE
);

-- Reservations table
CREATE TABLE reservations (
  id SERIAL PRIMARY KEY,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  property_id INTEGER NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  guest_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

-- Drop existing stretch tables if re-running schema
DROP TABLE IF EXISTS guest_reviews CASCADE;
DROP TABLE IF EXISTS property_rates CASCADE;

-- Table: property_rates
CREATE TABLE property_rates (
  id SERIAL PRIMARY KEY,
  property_id INTEGER NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  cost_per_night INTEGER NOT NULL CHECK (cost_per_night >= 0)
);

-- Table: guest_reviews
CREATE TABLE guest_reviews (
  id SERIAL PRIMARY KEY,
  guest_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  owner_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reservation_id INTEGER NOT NULL REFERENCES reservations(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  message TEXT
);