\c eddie_db;


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
