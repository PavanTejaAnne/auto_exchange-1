create database auto_exchange;
use auto_exchange;
create table Customer
(SSN CHAR(9) not null,
Fname varchar(15) not null,
Lname varchar(15) not null,
age int not null,
gender char not null,
driving_license_number char(10) not null,
address varchar(40) not null,
primary key(SSN),
unique(driving_license_number)
);



create table Company_branch
(branch_id CHAR not null,
number char(10) not null,
address varchar(40) not null,
email varchar(60) not null,
location varchar(10) not null,
primary key(branch_id)
);


create table Car
(vehicle_id CHAR(10) not null,
manufacture varchar(15) not null,
model_no int not null,
manufactured_year year not null,
car_type varchar(15) not null,
primary key(vehicle_id)
);

create table In_Stock_car(
In_Stock_vehicle_id CHAR(10) not null,
In_Stock_id CHAR(10) not null,
In_Stock_price float not null,
In_Stock_branch_id CHAR not null,

);

create table Transaction
(
transaction_vehicle_id CHAR(10) not null,
transaction_date date not null,
list_price float not null,
final_price float not null,
old_license_number varchar(10) not null,
new_license_number varchar(10) not null,
Operation varchar(6) not null,
primary key(transaction_vehicle_id, transaction_date),
foreign key(transaction_vehicle_id) references Car(vehicle_id) on delete cascade on update cascade
);


create table Sells_to
(
sells_to_SSN char(9) not null,
Sells_to_branch_id char not null,
primary key(sells_to_SSN, sells_to_branch_id),
foreign key(sells_to_SSN) references customer(SSN) on delete cascade on update cascade,
foreign key(Sells_to_branch_id) references Company_branch(branch_id) on delete cascade on update cascade
);

create table Buys_from
(
Buys_from_SSN char(9) not null,
Buys_from_branch_id char not null,
primary key(Buys_from_SSN, Buys_from_branch_id),
foreign key(Buys_from_SSN) references customer(SSN) on delete cascade on update cascade,
foreign key(Buys_from_branch_id) references Company_branch(branch_id) on delete cascade on update cascade
);

create table Sells
(
Sells_SSN char(9) not null,
Sells_vehicle_id char not null,
Selling_Date Date not null,
primary key(Sells_SSN, Sells_vehicle_id),
foreign key(Sells_SSN) references customer(SSN),
foreign key(Sells_vehicle_id) references Car(vehicle_id)
);

create table Buys_
(
Buys_SSN char(9) not null,
Buys_vehicle_id char not null,
Buying_Date Date not null,
primary key(Buys_SSN, Buys_vehicle_id),
foreign key(Buys_SSN) references customer(SSN) on delete cascade on update cascade,
foreign key(Buys_vehicle_id) references Car(vehicle_id) on delete cascade on update cascade
);

create table Cus_Moblie
(
Cus_Moblie_SSN char(9) not null,
mobile_no char(10) not null,
primary key(Cus_Moblie_SSN),
foreign key(Cus_Moblie_SSN) references customer(SSN) on delete cascade on update cascade
);


create table Cus_Email
(
Cus_Email_SSN char(9) not null,
Email char(10) not null,
primary key(Cus_Email_SSN),
foreign key(Cus_Email_SSN) references customer(SSN) on delete cascade on update cascade
);
