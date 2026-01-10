-- Create Users Table (Optional if using Supabase Auth, but good for custom profile)
create table public.profiles (
  id uuid references auth.users not null primary key,
  username text unique not null,
  avatar_url text,
  full_name text,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Create Rooms Table
create table public.rooms (
  id uuid default gen_random_uuid() primary key,
  room_code text unique not null,
  name text,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  created_by uuid references auth.users
);

-- Create Messages Table
create table public.messages (
  id uuid default gen_random_uuid() primary key,
  room_code text references public.rooms(room_code) not null,
  user_id uuid references auth.users not null,
  username text not null, -- denormalized for speed
  content_encrypted text not null, -- The final ciphertext
  content_hash text not null, -- MD5 hash of original message
  signature text not null, -- RSA signature of the hash
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable RLS (Row Level Security)
alter table public.profiles enable row level security;
alter table public.rooms enable row level security;
alter table public.messages enable row level security;

-- Policies for Messages
create policy "Public messages are viewable by everyone in room"
  on public.messages for select
  using (true);

create policy "Users can insert their own messages"
  on public.messages for insert
  with check (auth.uid() = user_id);

-- Policies for Rooms
create policy "Rooms are viewable by everyone"
  on public.rooms for select
  using (true);
  
create policy "Authenticated users can create rooms"
  on public.rooms for insert
  with check (auth.role() = 'authenticated');
