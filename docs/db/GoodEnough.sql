
/*
To reset the database

DROP TABLE shop_list_item;
DROP TABLE item;
DROP TABLE user_product;
DROP TABLE verification_code;
DROP TABLE user_product;
DROP TABLE product;
DROP TABLE category;
DROP TABLE "user";
*/

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS category(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "name" TEXT
);

CREATE TABLE IF NOT EXISTS product(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID REFERENCES category (id)  ON DELETE CASCADE,
    "name" TEXT NOT NULL,
    barcode TEXT NOT NULL,
    barcode_type TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "user" (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    "password" TEXT,
    is_activated BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS verification_code(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    "user_id" UUID REFERENCES "user" (id) ON DELETE CASCADE,
    code CHAR(6) NOT NULL
);

CREATE TABLE IF NOT EXISTS user_product(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    "user_id" UUID REFERENCES "user" (id) ON DELETE CASCADE,
    category_id UUID REFERENCES category (id) ON DELETE CASCADE,
    barcode TEXT NOT NULL,
    barcode_type TEXT NOT NULL,
    "name" TEXT NOT NULL,
    alias TEXT,
    "description" TEXT,
    brand TEXT,
    manufacturer TEXT,
    created_at TIMESTAMP DEFAULT NOW() 
);

CREATE TABLE IF NOT EXISTS item(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES product (id) ON DELETE CASCADE,
    expiration_date DATE NOT NULL,
    quantity INT NOT NULL,
    initial_quantity INT NOT NULL,
    "cost" FLOAT NOT NULL,
    is_used BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW() 
);

CREATE TABLE IF NOT EXISTS shop_list_item (
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	product_id UUID REFERENCES product (id) ON DELETE CASCADE,
	quantity INT NOT NULL,
	"cost" FLOAT NOT NULL,
	created_at TIMESTAMP DEFAULT NOW()
);