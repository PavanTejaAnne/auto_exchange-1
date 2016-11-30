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
    address varchar(60) not null,
    primary key(ssn),
    unique(driving_license_number)
);

CREATE TABLE company_branch(
    branch_id int not null auto_increment,
    phone_number char(10) not null,
    address varchar(60) not null,
    email varchar(60) not null,
    location varchar(30) not null,
    primary key(branch_id)
);

CREATE TABLE car(
    vin char(17) not null,
    manufacturer varchar(25) not null,
    model_no varchar(25) not null,
    manufactured_year year not null,
    car_type varchar(15) not null,
    primary key(vin)
);

CREATE TABLE in_stock_car(
    in_stock_vin char(17) unique not null,
    in_stock_id int not null auto_increment,
    in_stock_price float not null,
    in_stock_branch_id int not null,
    primary key(in_stock_vin, in_stock_id),
    constraint fk_in_stock_branch_id foreign key(in_stock_branch_id) references company_branch(branch_id) on delete cascade on update cascade,
    constraint fk_in_stock_vin foreign key(in_stock_vin) references car(vin) on delete cascade on update cascade
)ENGINE=MyISAM;

CREATE TABLE transaction(
    transaction_vin char(17) not null,
    transaction_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
    sells_vin char(17) not null,
    selling_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    primary key(sells_ssn, sells_vin, selling_date),
    constraint fk_sells_ssn foreign key(sells_ssn) references customer(ssn) on delete cascade on update cascade,
    constraint fk_sells_vin foreign key(sells_vin) references car(vin) on delete cascade on update cascade
);

CREATE TABLE buys(
    buys_ssn char(9) not null,
    buys_vin char(17) not null,
    buying_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    primary key(buys_ssn, buys_vin, buying_date),
    constraint fk_buys_ssn foreign key(buys_ssn) references customer(ssn) on delete cascade on update cascade,
    constraint fk_buys_vin foreign key(buys_vin) references car(vin) on delete cascade on update cascade
);

CREATE TABLE cus_mobile (
    cus_mobile_ssn char(9) not null,
    mobile_no char(10) not null,
    primary key(cus_mobile_ssn, mobile_no),
    constraint fk_cus_mobile_ssn foreign key(cus_mobile_ssn) references customer(ssn) on delete cascade on update cascade
);


CREATE TABLE cus_email(
    cus_email_ssn char(9) not null,
    email char(60) not null,
    primary key(cus_email_ssn, email),
    constraint fk_cus_email_ssn foreign key(cus_email_ssn) references customer(ssn) on delete cascade on update cascade
);

SET foreign_key_checks = 1;

INSERT INTO company_branch (phone_number, address, email, location) VALUES ('6982388234', 'Fourth street, San Fernando, Sacramento', 'sacramento@autoexchange.com', 'Sacramento');
INSERT INTO company_branch (phone_number, address, email, location) VALUES ('4434232342', 'Third street San Jose', 'sanjose@autoexchange.com', 'San Jose');
INSERT INTO company_branch (phone_number, address, email, location) VALUES ('6037323234', 'Third street Santa Clara', 'santaclara@autoexchange.com', 'Santa Clara');
INSERT INTO company_branch (phone_number, address, email, location) VALUES ('6003323234', 'Jackson St', 'cupertino@autoexchange.com', 'Cupertino');

INSERT INTO customer VALUES ('774623423', 'John', 'Doe', '32', 'M', 'A1234567','33 South Third Street Apt 105');
INSERT INTO customer VALUES ('847347232', 'Mary', 'Jane', '28', 'F', 'A34212345','23 Baker street, WA');
INSERT INTO customer VALUES ('123456784', 'Phill', 'Mark', '23', 'M', 'Y1123984', 'Cupertino');
INSERT INTO customer VALUES ('603456783', 'James', 'Yo', '23', 'M', 'C1123983', 'San Francisco');
INSERT INTO customer VALUES ('123456782', 'Ron', 'Cheg', '23', 'M', 'B1123982', 'Santa Clara');

INSERT INTO cus_email VALUES ('774623423', 'johndoe@gmail.com');
INSERT INTO cus_mobile VALUES ('774623423', '6654334322');
INSERT INTO cus_email VALUES ('847347232', 'maryjane@gmail.com');
INSERT INTO cus_mobile VALUES ('847347232', '6702390012');
INSERT INTO cus_email VALUES ('123456784', 'phill@gmail.com');
INSERT INTO cus_mobile VALUES ('123456784', '6798390012');
INSERT INTO cus_email VALUES ('603456783', 'james@gmail.com');
INSERT INTO cus_mobile VALUES ('603456783', '6700390012');
INSERT INTO cus_email VALUES ('123456782', 'ron@gmail.com');
INSERT INTO cus_mobile VALUES ('123456782', '6654004322');

INSERT INTO car(vin, manufacturer, model_no, manufactured_year, car_type) VALUES ('1HJCM82633A674352', 'HONDA', 'ACCORD', '2010', 'Sedan');
INSERT INTO car(vin, manufacturer, model_no, manufactured_year, car_type) VALUES ('2JCCO82633A600350', 'HONDA', 'ACCORD', '2010', 'Wagon');