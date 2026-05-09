-- =============================================
-- TMCI Website - Supabase Schema
-- Run this in your Supabase SQL Editor
-- =============================================

-- SITE SECTIONS TABLE
create table site_sections (
  id text primary key,
  title text,
  content_type text default 'html',
  content text,
  updated_at timestamptz default now()
);

alter table site_sections enable row level security;
create policy "Public read sections" on site_sections for select using (true);
create policy "Admin write sections" on site_sections for all
  using (auth.role() = 'authenticated');

-- BLOGS TABLE
create table blogs (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  content text,
  cover_image text,
  author text default 'TMCI Team',
  tags text[],
  published boolean default false,
  seo_title text,
  seo_description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table blogs enable row level security;
create policy "Public read published blogs" on blogs for select
  using (published = true);
create policy "Admin all blogs" on blogs for all
  using (auth.role() = 'authenticated');

-- FAQS TABLE
create table faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  category text,
  sort_order int default 0,
  published boolean default true
);

alter table faqs enable row level security;
create policy "Public read faqs" on faqs for select using (published = true);
create policy "Admin all faqs" on faqs for all using (auth.role() = 'authenticated');

-- WORKBENCH OPTIONS TABLE
create table workbench_options (
  id uuid primary key default gen_random_uuid(),
  category text,
  name text,
  image_url text,
  description text,
  sort_order int default 0
);

alter table workbench_options enable row level security;
create policy "Public read workbench" on workbench_options for select using (true);
create policy "Admin all workbench" on workbench_options for all using (auth.role() = 'authenticated');

-- Seed default sections
insert into site_sections (id, title, content_type, content) values
('hero', 'Hero Banner', 'html', '<div><h1>Transform Your Workspace</h1><p>Premium workbench solutions for professionals</p><a href="#contact">Get a Quote</a></div>'),
('about', 'About Us', 'html', '<h2>About TMCI</h2><p>We are industry leaders in precision workbench manufacturing with over 20 years of experience.</p>'),
('cta', 'Call To Action', 'html', '<h2>Ready to Build Your Perfect Workbench?</h2><p>Contact us today for a free consultation</p>');

-- Seed default FAQs
insert into faqs (question, answer, category, sort_order) values
('What materials are used in your workbenches?', 'We use industrial-grade steel frames with solid hardwood or MDF tops, depending on your requirements.', 'Products', 1),
('Can I customize the workbench dimensions?', 'Absolutely! Every workbench we build is made to your exact specifications.', 'Customization', 2),
('What is the delivery timeline?', 'Standard delivery is 3-4 weeks. Rush orders may be available, please contact us.', 'Orders', 3),
('Do you offer installation services?', 'Yes, we offer professional installation in select regions. Contact us for availability.', 'Services', 4),
('What warranty do you provide?', 'All our workbenches come with a 5-year structural warranty.', 'Products', 5),
('Can I see samples before ordering?', 'Yes, we have a showroom and can also send material samples on request.', 'Sales', 6);
