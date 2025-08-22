ALTER TABLE reviews
ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Optional: Update existing reviews with a placeholder user_id if needed for testing
-- For production, you'd typically want to ensure new reviews are associated with a user.
-- UPDATE reviews SET user_id = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11' WHERE user_id IS NULL;
