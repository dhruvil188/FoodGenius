-- Add is_public column to saved_recipes if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_name = 'saved_recipes' AND column_name = 'is_public'
    ) THEN
        ALTER TABLE saved_recipes ADD COLUMN is_public BOOLEAN DEFAULT FALSE;
    END IF;

    -- Add updated_at column to saved_recipes if it doesn't exist
    IF NOT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_name = 'saved_recipes' AND column_name = 'updated_at'
    ) THEN
        ALTER TABLE saved_recipes ADD COLUMN updated_at TIMESTAMP;
        
        -- Set initial values for updated_at to be the same as created_at
        UPDATE saved_recipes SET updated_at = created_at;
    END IF;
END $$;