create table orders(
    id serial primary key,
    status varchar(10),
    user_id integer references users(id)
);