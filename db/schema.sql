
-- <ai_context>
-- File is responsible for providing a PostgreSQL schema to store users, workout plans, workouts,
-- exercises, and associated user diary notes.
-- This schema includes minimal sample fields and foreign key relationships.
-- Additional columns/constraints may be added as needed.
-- This does not include any migrations logic, just a baseline schema design.
-- </ai_context>

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS workout_plans (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  goals TEXT,
  frequency INT,
  duration INT,
  equipment TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS workouts (
  id SERIAL PRIMARY KEY,
  workout_plan_id INT NOT NULL,
  scheduled_date DATE NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (workout_plan_id) REFERENCES workout_plans(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS exercises (
  id SERIAL PRIMARY KEY,
  workout_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  sets INT NOT NULL,
  reps INT NOT NULL,
  weight DECIMAL(6,2),
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (workout_id) REFERENCES workouts(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS diary_notes (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  workout_id INT,
  exercise_id INT,
  note TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (workout_id) REFERENCES workouts(id) ON DELETE CASCADE,
  FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON DELETE CASCADE
);

-- Indexes for faster queries (optional examples):
CREATE INDEX IF NOT EXISTS idx_workout_plan_user ON workout_plans(user_id);
CREATE INDEX IF NOT EXISTS idx_workout_by_plan ON workouts(workout_plan_id);
CREATE INDEX IF NOT EXISTS idx_exercise_by_workout ON exercises(workout_id);
CREATE INDEX IF NOT EXISTS idx_diary_notes_user ON diary_notes(user_id);
      