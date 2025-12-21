CREATE TABLE IF NOT EXISTS about_me (
    id SERIAL PRIMARY KEY,
    images JSONB DEFAULT '{"profile": null, "gallery": []}',
    full_name VARCHAR(255) NOT NULL,
    other_name VARCHAR(100),
    expertises TEXT[] DEFAULT '{}',
    links JSONB DEFAULT '[]',
    contact JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert default data if table is empty
INSERT INTO about_me (full_name, other_name, expertises, links, contact, images)
SELECT 
    'Kyaw Phyoe Han',
    'Eddie',
    ARRAY['Flutter Developer', 'Node.js Developer'],
    '[
        {"name": "Github", "link": "https://github.com/walkmandede"},
        {"name": "LinkedIn", "link": "https://www.linkedin.com/in/kyaw-phyoe-han-aba3b9255/"}
    ]'::jsonb,
    '{
        "phone": "+66 627 052 637",
        "email": "kyawphyoehan2995@gmail.com",
        "address": "Bangkok, Thailand",
        "originCountry": "Myanmar",
        "currentCountry": "Thailand"
    }'::jsonb,
    '{"profile": null, "gallery": []}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM about_me LIMIT 1);

CREATE TABLE IF NOT EXISTS project (
    id SERIAL PRIMARY KEY,
    project_name VARCHAR(255) NOT NULL,
    short_description TEXT,
    description TEXT,
    tech_stacks TEXT[] DEFAULT '{}',
    responsibilities TEXT[] DEFAULT '{}',
    links JSONB DEFAULT '[]',
    project_logo TEXT,
    images TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS experience (
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    role VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    work_type VARCHAR(50) NOT NULL,
    work_time_type VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    responsibilities TEXT[] NOT NULL DEFAULT '{}',
    "from" DATE NOT NULL,
    "to" DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS education (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    course_name VARCHAR(255) NOT NULL,
    "from" DATE NOT NULL,
    "to" DATE,
    grade VARCHAR(50),
    remark TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contact (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    logo TEXT,
    url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
