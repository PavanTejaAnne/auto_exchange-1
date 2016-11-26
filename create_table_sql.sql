SET foreign_key_checks = 0;
DROP database if exists auto_exchange;
CREATE database auto_exchange;
use auto_exchange;

CREATE TABLE customer(
    ssn CHAR(9) not null,
    first_name varchar(15) not null,
    last_name varchar(15) not null,
    age int not null,
    gender char not null,
    driving_license_number char(10) not null,
    address varchar(40) not null,
    primary key(ssn),
    unique(driving_license_number)
);

CREATE TABLE company_branch(
    branch_id int not null auto_increment,
    phone_number char(10) not null,
    address varchar(40) not null,
    email varchar(60) not null,
    location varchar(10) not null,
    primary key(branch_id)
);

CREATE TABLE car(
    vin char(17) not null,
    manufacturer varchar(15) not null,
    model_no int not null,
    manufactured_year year not null,
    car_type varchar(15) not null,
    primary key(vin)
);

CREATE TABLE in_stock_car(
    in_stock_vin char(17) not null,
    in_stock_id int not null,
    in_stock_price float not null,
    in_stock_branch_id int not null,
    primary key(in_stock_vin, in_stock_id),
    constraint fk_in_stock_branch_id foreign key(in_stock_branch_id) references company_branch(branch_id) on delete cascade on update cascade,
    constraint fk_in_stock_vin foreign key(in_stock_vin) references car(vin) on delete cascade on update cascade
);

CREATE TABLE transaction(
    transaction_vin char(17) not null,
    transaction_date date not null,
    list_price float not null,
    final_price float not null,
    old_license_plate varchar(15) not null,
    new_license_plate varchar(15) not null,
    is_sale boolean not null,
    primary key(transaction_vin, transaction_date),
    constraint fk_transaction_vin foreign key(transaction_vin) references car(vin) on delete cascade on update cascade
);


CREATE TABLE sells_to(
    sells_to_ssn char(9) not null,
    Sells_to_branch_id int not null,
    primary key(sells_to_ssn, sells_to_branch_id),
    constraint fk_sells_to_ss foreign key(sells_to_ssn) references customer(ssn) on delete cascade on update cascade,
    constraint fk_sells_to_branch_id foreign key(sells_to_branch_id) references company_branch(branch_id) on delete cascade on update cascade
);

CREATE TABLE buys_from(
    buys_from_ssn char(9) not null,
    buys_from_branch_id int not null,
    primary key(buys_from_ssn, buys_from_branch_id),
    constraint fk_buys_from_ssn foreign key(buys_from_ssn) references customer(ssn) on delete cascade on update cascade,
    constraint fk_buys_from_branch_id foreign key(buys_from_branch_id) references company_branch(branch_id) on delete cascade on update cascade
);

CREATE TABLE sells(
    sells_ssn char(9) not null,
    sells_vin char(10) not null,
    selling_date Date not null,
    primary key(sells_ssn, sells_vin),
    constraint fk_sells_ssn foreign key(sells_ssn) references customer(ssn),
    constraint fk_sells_vin foreign key(sells_vin) references car(vin)
);

CREATE TABLE buys(
    buys_ssn char(9) not null,
    buys_vin char(17) not null,
    buying_date Date not null,
    primary key(buys_ssn, buys_vin),
    constraint fk_buys_ssn foreign key(buys_ssn) references customer(ssn) on delete cascade on update cascade,
    constraint fk_buys_vin foreign key(buys_vin) references car(vin) on delete cascade on update cascade
);

CREATE TABLE cus_moblie (
    cus_moblie_ssn char(9) not null,
    mobile_no char(10) not null,
    primary key(cus_moblie_ssn),
    constraint fk_cus_mobile_ssn foreign key(cus_moblie_ssn) references customer(ssn) on delete cascade on update cascade
);


CREATE TABLE cus_email(
    cus_email_ssn char(9) not null,
    email char(10) not null,
    primary key(cus_email_ssn),
    constraint fk_cus_email_ssn foreign key(cus_email_ssn) references customer(ssn) on delete cascade on update cascade
);

SET foreign_key_checks = 1;
