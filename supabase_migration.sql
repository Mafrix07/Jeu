-- Create sessions table
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

-- Create votes table
CREATE TABLE votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  voter_hash TEXT NOT NULL,
  question_id INT NOT NULL,
  voted_for TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create progress table
CREATE TABLE progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  player_name TEXT NOT NULL,
  questions_answered INT DEFAULT 0,
  is_done BOOLEAN DEFAULT FALSE,
  UNIQUE(session_id, player_name)
);

-- Enable RLS
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies for sessions
CREATE POLICY "Allow anyone to read active sessions" ON sessions
  FOR SELECT USING (is_active = true);

CREATE POLICY "Allow anyone to insert sessions" ON sessions
  FOR INSERT WITH CHECK (true);

-- RLS Policies for votes
CREATE POLICY "Allow anyone to insert votes" ON votes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anyone to see vote counts" ON votes
  FOR SELECT USING (true);

-- RLS Policies for progress
CREATE POLICY "Allow anyone to select progress" ON progress
  FOR SELECT USING (true);

CREATE POLICY "Allow anyone to insert/update progress" ON progress
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anyone to update own progress" ON progress
  FOR UPDATE USING (true);

-- Add unique constraint to prevent double voting
ALTER TABLE votes ADD CONSTRAINT unique_vote_per_voter UNIQUE (session_id, voter_hash, question_id);
