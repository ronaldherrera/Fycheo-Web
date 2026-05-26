-- Backfill company_id in invoices based on concept text
-- Concept format: 'Alta Empresa [Name] - Plan ...'

UPDATE invoices
SET company_id = companies.id
FROM companies
WHERE invoices.company_id IS NULL
  AND invoices.type = 'ticket'
  AND invoices.concept ILIKE '%' || companies.name || '%';
