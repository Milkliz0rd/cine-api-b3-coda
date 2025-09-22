-- Schéma minimal pour CineFast (PostgreSQL)

CREATE TABLE IF NOT EXISTS films (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  director TEXT,
  year INT,
  genre TEXT
);

CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  film_id INT NOT NULL REFERENCES films(id) ON DELETE CASCADE,
  author TEXT,
  rating SMALLINT NOT NULL CHECK (rating BETWEEN 0 AND 5),
  comment TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
