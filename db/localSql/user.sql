create table users
(
    "userId" int not null,
    username char,
    dob date,
    "registrationDate" timestamp not null,
    email char not null,
    pword char not null,
    "isActive" boolean not null,
    "pwordSalt" char not null
);

create unique index table_name_userid_uindex
    on users ("userId");

create unique index table_name_username_uindex
    on users (username);

alter table users
    add constraint table_name_pk
        primary key ("userId");

