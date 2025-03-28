create TABLE users(user_name VARCHAR(50), password VARCHAR(100), created_at timestamp with time zone NOT NULL DEFAULT now(), updated_at timestamp with time zone NOT NULL DEFAULT now());

create TABLE news_art(id SERIAL PRIMARY KEY, title VARCHAR(200), body_text TEXT, date timestamp with time zone, image_id SERIAL, created_at timestamp with time zone NOT NULL DEFAULT now(), updated_at timestamp with time zone NOT NULL DEFAULT now());

create TABLE news_region(id SERIAL PRIMARY KEY, title VARCHAR(200), body_text TEXT, date timestamp with time zone, image_id SERIAL, created_at timestamp with time zone NOT NULL DEFAULT now(), updated_at timestamp with time zone NOT NULL DEFAULT now());

create TABLE storage_image (id SERIAL PRIMARY KEY, image_path VARCHAR(500), created_at timestamp with time zone NOT NULL DEFAULT now(), updated_at timestamp with time zone NOT NULL DEFAULT now());

create TABLE long_read (id SERIAL PRIMARY KEY, title VARCHAR(200), body_text TEXT, created_at timestamp with time zone NOT NULL DEFAULT now(), updated_at timestamp with time zone NOT NULL DEFAULT now());

create TABLE chto_posmotret (id SERIAL PRIMARY KEY, title VARCHAR(400), sub_title VARCHAR(400), address VARCHAR(100), contacts TEXT, image_id SERIAL, category VARCHAR(100), tags VARCHAR(100), template TEXT );

create TABLE samostoyatelnye_marshruty (id SERIAL PRIMARY KEY, title VARCHAR(400), sub_title VARCHAR(700), image_id SERIAL, category VARCHAR(100), tags VARCHAR(100), template TEXT, link_path VARCHAR(400), sequence INTEGER );

create TABLE organizovannye_marshruty (id SERIAL PRIMARY KEY, title VARCHAR(400), image_id SERIAL, email VARCHAR(100), dates VARCHAR(400), include_price VARCHAR(200), price VARCHAR(200), days VARCHAR(200), template TEXT );

create TABLE answers (id SERIAL PRIMARY KEY, title VARCHAR(400) , category VARCHAR(100), keywords VARCHAR(400), answers TEXT );

create TABLE gid(id SERIAL PRIMARY KEY, fio VARCHAR(50), title VARCHAR(200), body_text TEXT, phone VARCHAR(100), image_id SERIAL, is_active BOOLEAN );

create TABLE promturizm (id SERIAL PRIMARY KEY, title VARCHAR(400), sub_title VARCHAR(700), address VARCHAR(100), age_limit VARCHAR(10), tags VARCHAR(100), image_id SERIAL, template TEXT );

create TABLE banner (id SERIAL PRIMARY KEY, title VARCHAR(400), sub_title VARCHAR(700), is_active BOOLEAN, sequence INTEGER, link_path VARCHAR(400), image_id SERIAL );

create TABLE nasledie (id SERIAL PRIMARY KEY, category VARCHAR(100), title VARCHAR(400), sub_title VARCHAR(200), image_id SERIAL,  template TEXT );

create TABLE storage_file (id SERIAL PRIMARY KEY, file_path VARCHAR(500), created_at timestamp with time zone NOT NULL DEFAULT now(), updated_at timestamp with time zone NOT NULL DEFAULT now());

create TABLE biblioteka_pochitat (id SERIAL PRIMARY KEY, title VARCHAR(400), sub_title VARCHAR(700), image_id SERIAL, link_path_ozon VARCHAR(400), link_path_litres VARCHAR(400), link_path VARCHAR(400));

create TABLE biblioteka_poslushat (id SERIAL PRIMARY KEY, title VARCHAR(400), sub_title VARCHAR(700), prolongation VARCHAR(100), date VARCHAR(400), link_path_ya VARCHAR(400), link_path_izi VARCHAR(400), image_id SERIAL);

create TABLE biblioteka_posmotret (id SERIAL PRIMARY KEY, title VARCHAR(400), sub_title VARCHAR(700), prolongation VARCHAR(100), date VARCHAR(400), link_name VARCHAR(400), link_path VARCHAR(400), image_id SERIAL);