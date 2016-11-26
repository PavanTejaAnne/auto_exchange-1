/**
 * Created by rishi on 11/24/16.
 */

var carMakes = {manufacturer: [
    {id:0, value: 'AUDI', name: 'AUDI', models: [{value: 'DB9 COUPE', name: 'DB9 COUPE'},
        {value: 'DB9 COUPE MANUAL', name: 'DB9 COUPE MANUAL'},
        {value: 'DB9 VOLANTE', name: 'DB9 VOLANTE'},
        {value: 'V12 VANQUISH S', name: 'V12 VANQUISH S'},
        {value: 'V8 VANTAGE', name: 'V8 VANTAGE'}]},

    {id: 1, value: 'BENTLEY', name: 'BENTLEY', models: [{value: 'BENTLEY ARNAGE', name: 'BENTLEY ARNAGE'},
        {value: 'CONTINENTAL FLYING SPUR', name: 'CONTINENTAL FLYING SPUR'},
        {value: 'CONTINENTAL GT', name: 'CONTINENTAL GT'}]},

    {id: 2, value: 'BMW', name: 'BMW', models: [{value: '325CI CONVERTIBLE', name: '325CI CONVERTIBLE'},
        {value: '325I', name: '325I'}, {value: '325XI', name: '325XI'}, {value: '325XI SPORT WAGON', name: '325XI SPORT WAGON'},
        {value: '330CI CONVERTIBLE', name: '330CI CONVERTIBLE'}, {value: '330I', name: '330I'},{value: '330XI', name: '330XI'},
        {value: '525I', name: '525I'},{value: '525XI', name: '525XI'},{value: '530I', name: '530I'}, {value: '530XI', name: '530XI'},
        {value: '530XI SPORT WAGON', name: '530XI SPORT WAGON'},{value: '550I', name: '550I'},{value: '650CI', name: '650CI'},
        {value: '650CI CONVERTIBLE', name: '650CI CONVERTIBLE'},{value: '750LI', name: '750LI'},{value: '760LI', name: '760LI'},
        {value: 'M3', name: 'M3'},{value: 'M3 CONVERTIBLE', name: 'M3 CONVERTIBLE'},{value: 'M5', name: 'M5'},{value: 'M6', name: 'M6'},
        {value: 'MINI COOPER', name: 'MINI COOPER'},{value: 'MINI COOPER CONVERTIBLE', name: 'MINI COOPER CONVERTIBLE'},
        {value: 'MINI COOPER S', name: 'MINI COOPER S'},{value: 'MINI COOPER S CONVERTIBLE', name: 'MINI COOPER S CONVERTIBLE'},
        {value: 'X3', name: 'X3'},{value: 'X5', name: 'X5'},{value: 'X5 4.8IS', name: 'X5 4.8IS'},
        {value: 'Z4 3.0 SI COUPE', name: 'Z4 3.0 SI COUPE'},{value: 'Z4 3.0I', name: 'Z4 3.0I'},{value: 'Z4 3.0SI', name: 'Z4 3.0SI'},
        {value: 'Z4 M ROADSTER', name: 'Z4 M ROADSTER'}]},

    {id: 3, value: 'FERRARI', name: 'FERRARI', models:[{value: 'F430', name: 'F430'},{value: '612 SCAGLIETTI', name: '612 SCAGLIETTI'},
        {value: 'F141', name: 'F141'}]},

    {id: 4, value: 'FORD', name: 'FORD', models: [{value: 'B4000 4WD', name: 'B4000 4WD'},{value: 'CROWN VICTORIA POLICE', name: 'CROWN VICTORIA POLICE'},
        {value: 'E150 CLUB WAGON', name: 'E150 CLUB WAGON'},{value: 'E150 ECONOLINE 2WD', name: 'E150 ECONOLINE 2WD'},
        {value: 'ESCAPE 4WD', name: 'ESCAPE 4WD'},{value: 'ESCAPE FWD', name: 'ESCAPE FWD'},{value: 'ESCAPE HYBRID 4WD', name: 'ESCAPE HYBRID 4WD'},
        {value: 'ESCAPE HYBRID FWD', name: 'ESCAPE HYBRID FWD'},{value: 'EXPEDITION 2WD', name: 'EXPEDITION 2WD'},
        {value: 'EXPLORER 2WD', name: 'EXPLORER 2WD'},{value: 'EXPLORER 4WD', name: 'EXPLORER 4WD'},{value: 'F150 FFV  2WD', name: 'F150 FFV  2WD'},
        {value: 'F150 FFV  4WD', name: 'F150 FFV  4WD'},{value: 'F150 PICKUP 2WD', name: 'F150 PICKUP 2WD'},{value: 'F150 PICKUP 4WD', name: 'F150 PICKUP 4WD'},
        {value: 'FIVE HUNDRED AWD', name: 'FIVE HUNDRED AWD'},{value: 'FIVE HUNDRED FWD', name: 'FIVE HUNDRED FWD'},{value: 'FOCUS FWD', name: 'FOCUS FWD'},
        {value: 'FOCUS STATION WAG', name: 'FOCUS STATION WAG'},{value: 'FREESTAR WAGON FWD', name: 'FREESTAR WAGON FWD'},{value: 'FREESTYLE AWD', name: 'FREESTYLE AWD'},
        {value: 'FREESTYLE FWD', name: 'FREESTYLE FWD'},{value: 'GRAND MARQUIS', name: 'GRAND MARQUIS'},{value: 'GT 2WD', name: 'GT 2WD'},{value: 'LS', name: 'LS'},
        {value: 'MARK LT', name: 'MARK LT'},{value: 'MILAN', name: 'MILAN'},{value: 'MONTEREY WAGON FWD', name: 'MONTEREY WAGON FWD'},{value: 'MOUNTAINEER 4WD', name: 'MOUNTAINEER 4WD'},
        {value: 'MUSTANG', name: 'MUSTANG'},{value: 'NAVIGATOR 2WD', name: 'NAVIGATOR 2WD'},{value: 'RANGER PICKUP 2WD', name: 'RANGER PICKUP 2WD'},{value: 'RANGER PICKUP 4WD', name: 'RANGER PICKUP 4WD'},
        {value: 'TAURUS', name: 'TAURUS'},{value: 'TAURUS ETHANOL FFV', name: 'TAURUS ETHANOL FFV'},{value: 'THUNDERBIRD', name: 'THUNDERBIRD'},{value: 'TOWN CAR', name: 'TOWN CAR'},
        {value: 'ZEPHYR', name: 'ZEPHYR'}]},

    {id: 5, value: 'GMC', name: 'GMC', models: [{value: '9-3 CONVERTIBLE', name: '9-3 CONVERTIBLE'},{value: '9-3 SPORT SEDAN', name: '9-3 SPORT SEDAN'},
        {value: '9-5 SEDAN', name: '9-5 SEDAN'},{value: 'C15 SILVERADO HYBRID 2WD', name: 'C15 SILVERADO HYBRID 2WD'},
        {value: 'C1500 SILVERADO 2WD', name: 'C1500 SILVERADO 2WD'},{value: 'C1500 SUBURBAN 2WD', name: 'C1500 SUBURBAN 2WD'},
        {value: 'C1500 TAHOE 2WD', name: 'C1500 TAHOE 2WD'},{value: 'C1500 YUKON 2WD', name: 'C1500 YUKON 2WD'},
        {value: 'COBALT', name: 'COBALT'},{value: 'COLORADO 2WD', name: 'COLORADO 2WD'},{value: 'COLORADO 4WD', name: 'COLORADO 4WD'},
        {value: 'COLORADO CAB CHASSIS INC 2WD', name: 'COLORADO CAB CHASSIS INC 2WD'},{value: 'COLORADO CREW CAB 2WD', name: 'COLORADO CREW CAB 2WD'},
        {value: 'COLORADO CREW CAB 4WD', name: 'COLORADO CREW CAB 4WD'},{value: 'CORVETTE', name: 'CORVETTE'},{value: 'CTS', name: 'CTS'},
        {value: 'DTS', name: 'DTS'},{value: 'ENVOY 2WD', name: 'ENVOY 2WD'},{value: 'ENVOY XL 4WD', name: 'ENVOY XL 4WD'},{value: 'EQUINOX AWD', name: 'EQUINOX AWD'},
        {value: 'EQUINOX FWD', name: 'EQUINOX FWD'},{value: 'ESCALADE 2WD', name: 'ESCALADE 2WD'},{value: 'ESCALADE ESV AWD', name: 'ESCALADE ESV AWD'},
        {value: 'G15/25CHEV VAN 2WD CONV', name: 'G15/25CHEV VAN 2WD CONV'},{value: 'G1500/2500 CHEVY EXPRESS 2WD', name: 'G1500/2500 CHEVY EXPRESS 2WD'},
        {value: 'G1500/2500 CHEVY VAN 2WD', name: 'G1500/2500 CHEVY VAN 2WD'},{value: 'G6', name: 'G6'},{value: 'G6 GT/GTP CONVERTIBLE', name: 'G6 GT/GTP CONVERTIBLE'},
        {value: 'GRAND PRIX', name: 'GRAND PRIX'},{value: 'GTO', name: 'GTO'},{value: 'H3 4WD', name: 'H3 4WD'},{value: 'HHR FWD', name: 'HHR FWD'},{value: 'I-280 2WD EXT CAB', name: 'I-280 2WD EXT CAB'},
        {value: 'IMPALA', name: 'IMPALA'},{value: 'K15 SILVERADO HYBRID 4WD', name: 'K15 SILVERADO HYBRID 4WD'},{value: 'K1500 AVALANCHE 4WD', name: 'K1500 AVALANCHE 4WD'},
        {value: 'K1500 SILVERADO 4WD', name: 'K1500 SILVERADO 4WD'},{value: 'K1500 TAHOE 4WD', name: 'K1500 TAHOE 4WD'},{value: 'LACROSSE/ALLURE', name: 'LACROSSE/ALLURE'},
        {value: 'LIMOUSINE', name: 'LIMOUSINE'},{value: 'MALIBU', name: 'MALIBU'},{value: 'MONTANA SV6 AWD', name: 'MONTANA SV6 AWD'},{value: 'MONTE CARLO', name: 'MONTE CARLO'},
        {value: 'RENDEZVOUS AWD', name: 'RENDEZVOUS AWD'},{value: 'RENDEZVOUS FWD', name: 'RENDEZVOUS FWD'},{value: 'SOLSTICE', name: 'SOLSTICE'},{value: 'SRX 2WD', name: 'SRX 2WD'},
        {value: 'SRX AWD', name: 'SRX AWD'},{value: 'SSR PICKUP 2WD', name: 'SSR PICKUP 2WD'},{value: 'STS', name: 'STS'},{value: 'STS AWD', name: 'STS AWD'},{value: 'TERRAZA FWD', name: 'TERRAZA FWD'},
        {value: 'TRAILBLAZER 2WD', name: 'TRAILBLAZER 2WD'},{value: 'TRAILBLAZER 4WD', name: 'TRAILBLAZER 4WD'},{value: 'TRAILBLAZER AWD', name: 'TRAILBLAZER AWD'},
        {value: 'TRAILBLAZER EXT 4WD', name: 'TRAILBLAZER EXT 4WD'},{value: 'UPLANDER FWD', name: 'UPLANDER FWD'},{value: 'VUE AWD', name: 'VUE AWD'},{value: 'VUE FWD', name: 'VUE FWD'},
        {value: 'XLR', name: 'XLR'}]},

    {id: 6, value: 'HONDA', name: 'HONDA', models: [{value: 'ACCORD', name: 'ACCORD'},{value: 'ACCORD HYBRID', name: 'ACCORD HYBRID'},
        {value: 'CIVIC', name: 'CIVIC'},{value: 'CIVIC HYBRID', name: 'CIVIC HYBRID'},{value: 'CR-V 2WD', name: 'CR-V 2WD'},
        {value: 'CR-V 4WD', name: 'CR-V 4WD'},{value: 'ELEMENT 2WD', name: 'ELEMENT 2WD'},{value: 'ELEMENT 4WD', name: 'ELEMENT 4WD'},
        {value: 'INSIGHT', name: 'INSIGHT'},{value: 'MDX 4WD', name: 'MDX 4WD'},{value: 'ODYSSEY 2WD', name: 'ODYSSEY 2WD'},
        {value: 'PILOT 2WD', name: 'PILOT 2WD'},{value: 'PILOT 4WD', name: 'PILOT 4WD'},{value: 'RIDGELINE 4WD', name: 'RIDGELINE 4WD'},
        {value: 'RL', name: 'RL'},{value: 'RSX', name: 'RSX'},{value: 'S2000', name: 'S2000'},{value: 'TL', name: 'TL'}, {value: 'TSX', name: 'TSX'}]},

    {id: 7, value: 'JAGUAR', name: 'JAGUAR', models: [{value: 'S-TYPE 3.0 LITRE', name: 'S-TYPE 3.0 LITRE'},{value: 'S-TYPE 4.2 LITRE', name: 'S-TYPE 4.2 LITRE'},
        {value: 'S-TYPE R', name: 'S-TYPE R'},{value: 'VDP LWB', name: 'VDP LWB'},{value: 'XJ8', name: 'XJ8'},{value: 'XK8 CONVERTIBLE', name: 'XK8 CONVERTIBLE'},
        {value: 'XKR CONVERTIBLE', name: 'XKR CONVERTIBLE'},{value: 'X-TYPE', name: 'X-TYPE'},{value: 'X-TYPE SPORT BRAKE', name: 'X-TYPE SPORT BRAKE'}]},

    {id: 8, value: 'MERCEDES-BENZ', name: 'MERCEDES-BENZ', models: [{value: 'C230', name: 'C230'},{value: 'C280', name: 'C280'},
        {value: 'C280 4MATIC', name: 'C280 4MATIC'},{value: 'C350', name: 'C350'},{value: 'C350 4MATIC', name: 'C350 4MATIC'},
        {value: 'C55 AMG', name: 'C55 AMG'},{value: 'CL65 AMG', name: 'CL65 AMG'},{value: 'CLK350', name: 'CLK350'},
        {value: 'CLK350 (CABRIOLET)', name: 'CLK350 (CABRIOLET)'},{value: 'CLK55 AMG (CABRIOLET)', name: 'CLK55 AMG (CABRIOLET)'},
        {value: 'CLS500', name: 'CLS500'},{value: 'CLS55 AMG', name: 'CLS55 AMG'},{value: 'E320 CDI', name: 'E320 CDI'},
        {value: 'E350', name: 'E350'},{value: 'E350 (WAGON)', name: 'E350 (WAGON)'},{value: 'E350 4MATIC', name: 'E350 4MATIC'},
        {value: 'E350 4MATIC (WAGON)', name: 'E350 4MATIC (WAGON)'},{value: 'E500', name: 'E500'},{value: 'E55 AMG', name: 'E55 AMG'},
        {value: 'E55 AMG (WAGON)', name: 'E55 AMG (WAGON)'},{value: 'MAYBACH 57S', name: 'MAYBACH 57S'},
        {value: 'MAYBACH 62', name: 'MAYBACH 62'},{value: 'ML350', name: 'ML350'},{value: 'ML500', name: 'ML500'},
        {value: 'R350', name: 'R350'},{value: 'R500', name: 'R500'},{value: 'S350', name: 'S350'},{value: 'S430', name: 'S430'},
        {value: 'SL500', name: 'SL500'},{value: 'SL600', name: 'SL600'},{value: 'SL65 AMG', name: 'SL65 AMG'},
        {value: 'SLK280', name: 'SLK280'},{value: 'SLK350', name: 'SLK350'},{value: 'SLR', name: 'SLR'}]},

    {id: 9, value: 'NISSAN', name: 'NISSAN', models: [{value: '350Z', name: '350Z'},{value: '350Z ROADSTER', name: '350Z ROADSTER'},
        {value: 'ALTIMA', name: 'ALTIMA'},{value: 'ARMADA 2WD', name: 'ARMADA 2WD'},{value: 'ARMADA 4WD', name: 'ARMADA 4WD'},
        {value: 'FRONTIER 2WD', name: 'FRONTIER 2WD'},{value: 'FRONTIER V6-2WD', name: 'FRONTIER V6-2WD'},
        {value: 'FRONTIER V6-4WD', name: 'FRONTIER V6-4WD'},{value: 'FX35 AWD', name: 'FX35 AWD'},{value: 'FX35 RWD', name: 'FX35 RWD'},
        {value: 'FX45 AWD', name: 'FX45 AWD'},{value: 'G35', name: 'G35'},{value: 'M35', name: 'M35'},{value: 'M35X', name: 'M35X'},
        {value: 'M45', name: 'M45'},{value: 'MAXIMA', name: 'MAXIMA'},{value: 'MURANO AWD', name: 'MURANO AWD'},
        {value: 'MURANO FWD', name: 'MURANO FWD'},{value: 'PATHFINDER 2WD', name: 'PATHFINDER 2WD'},{value: 'PATHFINDER 4WD', name: 'PATHFINDER 4WD'},
        {value: 'Q45', name: 'Q45'},{value: 'Q45 SPORT', name: 'Q45 SPORT'},{value: 'QUEST', name: 'QUEST'},
        {value: 'QX56 4WD', name: 'QX56 4WD'},{value: 'SENTRA', name: 'SENTRA'},{value: 'TITAN 2WD', name: 'TITAN 2WD'},
        {value: 'TITAN 4WD', name: 'TITAN 4WD'},{value: 'XTERRA 2WD', name: 'XTERRA 2WD'},{value: 'XTERRA 4WD', name: 'XTERRA 4WD'}]},

    {id: 10, value: 'PORSCHE', name: 'PORSCHE', models: [{value: 'BOXSTER', name: 'BOXSTER'},{value: 'BOXSTER S', name: 'BOXSTER S'},
        {value: 'CARRERA 2 COUPE', name: 'CARRERA 2 COUPE'},{value: 'CAYENNE', name: 'CAYENNE'},{value: 'CAYENNE S', name: 'CAYENNE S'},
        {value: 'CAYENNE TURBO', name: 'CAYENNE TURBO'},{value: 'CAYMAN S', name: 'CAYMAN S'}]},

    {id: 11, value: 'TOYOTA', name: 'TOYOTA', models: [{value: '4RUNNER 2WD', name: '4RUNNER 2WD'},{value: '4RUNNER 4WD', name: '4RUNNER 4WD'},
        {value: 'AVALON', name: 'AVALON'},{value: 'CAMRY', name: 'CAMRY'},{value: 'CAMRY SOLARA', name: 'CAMRY SOLARA'},
        {value: 'CAMRY SOLARA CONVERTIBLE', name: 'CAMRY SOLARA CONVERTIBLE'},{value: 'COROLLA', name: 'COROLLA'},
        {value: 'COROLLA MATRIX', name: 'COROLLA MATRIX'},{value: 'ES 330', name: 'ES 330'},{value: 'GS 300 4WD', name: 'GS 300 4WD'},
        {value: 'GS 300/GS 430', name: 'GS 300/GS 430'},{value: 'GX 470', name: 'GX 470'},{value: 'HIGHLANDER 2WD', name: 'HIGHLANDER 2WD'},
        {value: 'HIGHLANDER 4WD', name: 'HIGHLANDER 4WD'},{value: 'HIGHLANDER HYBRID 2WD', name: 'HIGHLANDER HYBRID 2WD'},
        {value: 'HIGHLANDER HYBRID 4WD', name: 'HIGHLANDER HYBRID 4WD'},{value: 'IS 250', name: 'IS 250'},
        {value: 'IS 250 AWD', name: 'IS 250 AWD'},{value: 'IS 350', name: 'IS 350'},{value: 'LS 430', name: 'LS 430'},
        {value: 'LX 470', name: 'LX 470'},{value: 'PRIUS', name: 'PRIUS'},{value: 'RAV4 2WD', name: 'RAV4 2WD'},
        {value: 'RAV4 4WD', name: 'RAV4 4WD'},{value: 'RX 330 2WD', name: 'RX 330 2WD'},{value: 'RX 330 4WD', name: 'RX 330 4WD'},
        {value: 'RX 400H 4WD', name: 'RX 400H 4WD'},{value: 'SC 430', name: 'SC 430'},{value: 'SCION TC', name: 'SCION TC'},
        {value: 'SCION XA', name: 'SCION XA'},{value: 'SCION XB', name: 'SCION XB'},{value: 'SEQUOIA 2WD', name: 'SEQUOIA 2WD'},
        {value: 'SEQUOIA 4WD', name: 'SEQUOIA 4WD'},{value: 'SIENNA 2WD', name: 'SIENNA 2WD'},{value: 'SIENNA 4WD', name: 'SIENNA 4WD'},
        {value: 'TACOMA 2WD', name: 'TACOMA 2WD'},{value: 'TACOMA 4WD', name: 'TACOMA 4WD'},{value: 'TUNDRA 2WD', name: 'TUNDRA 2WD'},
        {value: 'TUNDRA 4WD', name: 'TUNDRA 4WD'},{value: 'YARIS', name: 'YARIS'}]},

    {id: 12, value: 'VOLKSWAGEN', name: 'VOLKSWAGEN', models: [{value: 'A3 QUATTRO', name: 'A3 QUATTRO'},{value: 'GOLF', name: 'GOLF'},
        {value: 'JETTA', name: 'JETTA'},{value: 'NEW BEETLE', name: 'NEW BEETLE'},{value: 'NEW BEETLE CONVERTIBLE', name: 'NEW BEETLE CONVERTIBLE'},
        {value: 'PASSAT WAGON 4MOTION', name: 'PASSAT WAGON 4MOTION'},{value: 'PHAETON', name: 'PHAETON'},{value: 'RABBIT', name: 'RABBIT'},
        {value: 'TOUAREG', name: 'TOUAREG'},{value: 'TT COUPE QUATTRO', name: 'TT COUPE QUATTRO'},{value: 'TT ROADSTER QUATTRO', name: 'TT ROADSTER QUATTRO'}]},

    {id: 13, value: 'VOLVO', name: 'VOLVO', models: [{value: 'C70 CONVERTIBLE', name: 'C70 CONVERTIBLE'},{value: 'S40 AWD', name: 'S40 AWD'},
        {value: 'S40 FWD', name: 'S40 FWD'},{value: 'S60 AWD', name: 'S60 AWD'},{value: 'S60 FWD', name: 'S60 FWD'},{value: 'S60 R AWD', name: 'S60 R AWD'},
        {value: 'S80 FWD', name: 'S80 FWD'},{value: 'V50 AWD', name: 'V50 AWD'},{value: 'V70 FWD', name: 'V70 FWD'},{value: 'V70 R AWD', name: 'V70 R AWD'},
        {value: 'XC 70 AWD', name: 'XC 70 AWD'},{value: 'XC 90 AWD', name: 'XC 90 AWD'},{value: 'XC 90 FWD', name: 'XC 90 FWD'}]}]};

var year = [{value: 1980, name: 1980}, {value: 1981, name: 1981}, {value: 1982, name: 1982}, {value: 1983, name: 1983}, {value: 1984, name: 1984},
    {value: 1985, name: 1985}, {value: 1986, name: 1986}, {value: 1987, name: 1987}, {value: 1988, name: 1988}, {value: 1989, name: 1989},
    {value: 1990, name: 1990}, {value: 1991, name: 1991}, {value: 1992, name: 1992}, {value: 1993, name: 1993}, {value: 1994, name: 1994},
    {value: 1995, name: 1995}, {value: 1996, name: 1996}, {value: 1997, name: 1997}, {value: 1998, name: 1998}, {value: 1999, name: 1999},
    {value: 2000, name: 2000}, {value: 2001, name: 2001}, {value: 2002, name: 2002}, {value: 2003, name: 2003}, {value: 2004, name: 2004},
    {value: 2005, name: 2005}, {value: 2006, name: 2006}, {value: 2007, name: 2007}, {value: 2008, name: 2008}, {value: 2009, name: 2009},
    {value: 2010, name: 2010}, {value: 2011, name: 2011}, {value: 2012, name: 2012}, {value: 2013, name: 2013}, {value: 2014, name: 2014},
    {value: 2015, name: 2015}, {value: 2016, name: 2016}];

function getCars() {
    return carMakes;
}

function getYears(){
    return year;
}
