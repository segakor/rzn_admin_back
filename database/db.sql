create TABLE users(user_name VARCHAR(50), password VARCHAR(100), created_at timestamp with time zone NOT NULL DEFAULT now(), updated_at timestamp with time zone NOT NULL DEFAULT now());

create TABLE news_art(id SERIAL PRIMARY KEY, title VARCHAR(200), body_text TEXT, date timestamp with time zone, image_id SERIAL, created_at timestamp with time zone NOT NULL DEFAULT now(), updated_at timestamp with time zone NOT NULL DEFAULT now());

create TABLE news_region(id SERIAL PRIMARY KEY, title VARCHAR(200), body_text TEXT, date timestamp with time zone, image_id SERIAL, created_at timestamp with time zone NOT NULL DEFAULT now(), updated_at timestamp with time zone NOT NULL DEFAULT now());

create TABLE storage_image (id SERIAL PRIMARY KEY, image_path VARCHAR(500), created_at timestamp with time zone NOT NULL DEFAULT now(), updated_at timestamp with time zone NOT NULL DEFAULT now());

create TABLE long_read (id SERIAL PRIMARY KEY, title VARCHAR(200), body_text TEXT, created_at timestamp with time zone NOT NULL DEFAULT now(), updated_at timestamp with time zone NOT NULL DEFAULT now());

create TABLE chto_posmotret (id SERIAL PRIMARY KEY, title VARCHAR(400), sub_title VARCHAR(400), address VARCHAR(100), contacts TEXT, image_id SERIAL, category VARCHAR(100), tags VARCHAR(100), template TEXT );

create TABLE samostoyatelnye_marshruty (id SERIAL PRIMARY KEY, title VARCHAR(400), sub_title VARCHAR(400), image_id SERIAL, category VARCHAR(100), tags VARCHAR(100), template TEXT, link_path VARCHAR(400) );

create TABLE organizovannye_marshruty (id SERIAL PRIMARY KEY, title VARCHAR(400), image_id SERIAL, email VARCHAR(100), dates VARCHAR(400), include_price VARCHAR(200), price VARCHAR(200), days VARCHAR(200), template TEXT );

create TABLE answers (id SERIAL PRIMARY KEY, title VARCHAR(400) , category VARCHAR(100), keywords VARCHAR(400), answers TEXT );