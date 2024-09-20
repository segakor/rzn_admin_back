create TABLE users(user_name VARCHAR(50), password VARCHAR(100), created_at timestamp with time zone NOT NULL DEFAULT now(), updated_at timestamp with time zone NOT NULL DEFAULT now());

create TABLE news_art(id SERIAL PRIMARY KEY, title VARCHAR(200), body_text TEXT, date timestamp with time zone, image_id SERIAL, created_at timestamp with time zone NOT NULL DEFAULT now(), updated_at timestamp with time zone NOT NULL DEFAULT now());

create TABLE news_region(id SERIAL PRIMARY KEY, title VARCHAR(200), body_text TEXT, date timestamp with time zone, image_id SERIAL, created_at timestamp with time zone NOT NULL DEFAULT now(), updated_at timestamp with time zone NOT NULL DEFAULT now());

create TABLE storage_image (id SERIAL PRIMARY KEY, image_path VARCHAR(500), created_at timestamp with time zone NOT NULL DEFAULT now(), updated_at timestamp with time zone NOT NULL DEFAULT now());