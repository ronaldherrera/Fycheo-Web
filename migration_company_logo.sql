-- Migration: Add logo_url to companies
ALTER TABLE companies ADD COLUMN IF NOT EXISTS logo_url text;
