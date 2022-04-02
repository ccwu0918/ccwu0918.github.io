//2020 Arduino首次接觸就上手, CAVEDU

//01 LED digital
Blockly.Arduino['led_digital']=function(block){
	var a = Blockly.Arduino.valueToCode(block, 'pin', Blockly.Arduino.ORDER_ATOMIC);
    var b = block.getFieldValue('mode'); //下拉式選單取值方式
	Blockly.Arduino.setups_["setup_output_"+a]="pinMode("+a+", OUTPUT);";
	console.log(a);
	console.log(b);
    var code = 'digitalWrite('+a+', '+b+');\n';  //write要換行, read 不必
    return code;
};

//01 LED analog
Blockly.Arduino['led_analog']=function(block){
	var a = Blockly.Arduino.valueToCode(block, 'pin', Blockly.Arduino.ORDER_ATOMIC);
    var b = Blockly.Arduino.valueToCode(block, 'pwm', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.setups_["setup_output_"+a]="pinMode("+a+", OUTPUT);";
	console.log(a);
	console.log(b);
    var code = 'analogWrite('+a+', '+b+');\n';  //write要換行, read 不必
    return code;
};

//02  button
Blockly.Arduino['buttonRead']=function(block){
	var a = Blockly.Arduino.valueToCode(block, 'pin', Blockly.Arduino.ORDER_ATOMIC);
	var statements_setup = Blockly.Arduino.statementToCode(block, 'setup');
    Blockly.Arduino.setups_["setup_input_"+a]="pinMode("+a+", INPUT);";

	//Blockly.Arduino.setups_.manual_add = "pinMode("+a+", INPUT);\n" + statements_setup;
	console.log(a);
    var code = 'digitalRead('+a+ ')';  //輸入值的部分不能加 ;\n
    return [code, Blockly.Arduino.ORDER_NONE]; //注意read / write 的 return 型態不一樣
};

//03 rotary potentiometer
Blockly.Arduino['rotaryRead']=function(block){
	var a = Blockly.Arduino.valueToCode(block, 'pin', Blockly.Arduino.ORDER_ATOMIC);
	console.log(a);
    var code = 'analogRead('+a+ ')';
    return [code, Blockly.Arduino.ORDER_NONE];
};

//04 buzzer noTone
Blockly.Arduino['buzzer_noTone'] = function(block) {
	var a = Blockly.Arduino.valueToCode(block, 'pin', Blockly.Arduino.ORDER_ATOMIC);
	console.log(a);
	var code = 'noTone(' + a + ');\n';
	return code;
};

//04 buzzer tone_pwm 刪除
Blockly.Arduino['buzzer_tone_pwm']=function(block){
	var a = Blockly.Arduino.valueToCode(block, 'pin', Blockly.Arduino.ORDER_ATOMIC);
    var b = Blockly.Arduino.valueToCode(block, 'pwm', Blockly.Arduino.ORDER_ATOMIC); 
	//這邊要對應 xml pwm 欄位名稱
	var statements_setup = Blockly.Arduino.statementToCode(block, 'setup');
	Blockly.Arduino.setups_.manual_add = "pinMode("+a+", OUTPUT);\n" + statements_setup;
	console.log(a);
	console.log(b);
    var code = 'analogWrite('+a+', '+b+');\n';  //write要換行, read 不必
    return code;
};

//04 buzzer customTone
Blockly.Arduino['buzzer_tone_custom']=function(block){
	var a = Blockly.Arduino.valueToCode(block, 'pin', Blockly.Arduino.ORDER_ATOMIC);
    var b = Blockly.Arduino.valueToCode(block, 'freq', Blockly.Arduino.ORDER_ATOMIC); 
	//這邊要對應 xml freq 欄位名稱
	var statements_setup = Blockly.Arduino.statementToCode(block, 'setup');
	Blockly.Arduino.setups_.manual_add = "pinMode("+a+", OUTPUT);\n" + statements_setup;
	console.log(a);
	console.log(b);
    var code = 'tone('+a+', '+b+');\n';  //write要換行, read 不必
    return code;
};

//05 light sensor
Blockly.Arduino['lightRead']=function(block){
	var a = Blockly.Arduino.valueToCode(block, 'pin', Blockly.Arduino.ORDER_ATOMIC);
	console.log(a);
    var code = 'analogRead('+a+ ')';
    return [code, Blockly.Arduino.ORDER_NONE];
};

//06 sound sensor
Blockly.Arduino['soundRead']=function(block){
	var a = Blockly.Arduino.valueToCode(block, 'pin', Blockly.Arduino.ORDER_ATOMIC);
	console.log(a);
    var code = 'analogRead('+a+ ')';
    return [code, Blockly.Arduino.ORDER_NONE];
};

//07 OLED_print 
Blockly.Arduino['OLED_print']=function(block){
	var a = Blockly.Arduino.valueToCode(block, 'x', Blockly.Arduino.ORDER_ATOMIC);
    var b = Blockly.Arduino.valueToCode(block, 'y', Blockly.Arduino.ORDER_ATOMIC);
	var c = Blockly.Arduino.valueToCode(block, 'content', Blockly.Arduino.ORDER_ATOMIC);
   	Blockly.Arduino.definitions_['oled_print'] = "#include <Arduino.h>\n#include <U8x8lib.h>\n" 
	+ "U8X8_SSD1306_128X64_ALT0_HW_I2C u8x8(/* reset=*/ U8X8_PIN_NONE);";//匯入函式庫放在最上面

	var statements_setup = Blockly.Arduino.statementToCode(block, 'setup');
	Blockly.Arduino.setups_.manual_add = "u8x8.begin();\n  u8x8.setFlipMode(1);\n  " 	
	+ "u8x8.setFont(u8x8_font_chroma48medium8_r);\n" + statements_setup;
    Blockly.Arduino.setups_.manual_add = "u8x8.begin();\n  u8x8.setFlipMode(1);\n  u8x8.setFont(u8x8_font_chroma48medium8_r);\n" + statements_setup;
   	//Blockly.Arduino.setups_["setup_output_"+a]="u8x8.begin();\n  u8x8.setFlipMode(1);\n  u8x8.setFont(u8x8_font_chroma48medium8_r);\n"
	console.log(a);
	console.log(b);
	console.log(c);
    var code = "u8x8.setCursor("+a+ ", " +b+ ");\n" + "u8x8.print(" + c + ");\n";  //write要換行, read 不必
    return code;
};

//07 OLED clear
Blockly.Arduino['OLED_clear'] = function(block) {
	var a = Blockly.Arduino.valueToCode(block, 'pin', Blockly.Arduino.ORDER_ATOMIC);
    var b = Blockly.Arduino.valueToCode(block, 'y', Blockly.Arduino.ORDER_ATOMIC);
	var c = Blockly.Arduino.valueToCode(block, 'content', Blockly.Arduino.ORDER_ATOMIC);
   	Blockly.Arduino.definitions_['oled_print'] = "#include <Arduino.h>\n#include <U8x8lib.h>\n" 
	+ "U8X8_SSD1306_128X64_ALT0_HW_I2C u8x8(/* reset=*/ U8X8_PIN_NONE);";//匯入函式庫放在最上面

	var statements_setup = Blockly.Arduino.statementToCode(block, 'setup');
	Blockly.Arduino.setups_.manual_add = "u8x8.begin();\n  u8x8.setFlipMode(1);\n  " 	
	+ "u8x8.setFont(u8x8_font_chroma48medium8_r);\n" + statements_setup;
	var code = 'u8x8.clear();\n';
	return code;
};

//08 dht read
Blockly.Arduino['dhtRead']=function(block){
	var a = Blockly.Arduino.valueToCode(block, 'pin', Blockly.Arduino.ORDER_ATOMIC);
	var b = block.getFieldValue('mode');
	var statements_setup = Blockly.Arduino.statementToCode(block, 'setup');
	Blockly.Arduino.definitions_['dht'] = '#include "DHT.h"\n'
	+ "DHT dht11_p" + a +"(" + a + ", DHT11);\n"; //匯入dht11函式庫放在最上面
    Blockly.Arduino.setups_["setup_input_"+a]="dht11_p" + a + ".begin();\n";
	console.log(a);
    var code = "dht11_p" + a +".read" + b +"()";
    return [code, Blockly.Arduino.ORDER_NONE]; //注意read / write 的 return 型態不一樣
};

//09 bmp280 pressure
Blockly.Arduino['airPressureRead']=function(block){
	var a = Blockly.Arduino.valueToCode(block, 'pin', Blockly.Arduino.ORDER_ATOMIC);
	var statements_setup = Blockly.Arduino.statementToCode(block, 'setup');
	Blockly.Arduino.definitions_['airPressure'] = '#include "Seeed_BMP280.h"\n#include <Wire.h>;\n'
	+ 'BMP280 bmp280;'; //匯入氣壓感測器函式庫
	Blockly.Arduino.setups_.manual_add = "bmp280.init();\n" + statements_setup;
	console.log(a);
    var code = "bmp280.getPressure()";
    return [code, Blockly.Arduino.ORDER_NONE]; //注意read / write 的 return 型態不一樣
};

//09 bmp280 - altitude
Blockly.Arduino['altitudeRead']=function(block){
	var a = Blockly.Arduino.valueToCode(block, 'pin', Blockly.Arduino.ORDER_ATOMIC);
	var statements_setup = Blockly.Arduino.statementToCode(block, 'setup');
	Blockly.Arduino.definitions_['airPressure'] = '#include "Seeed_BMP280.h"\n#include <Wire.h>\n'
	+ 'BMP280 bmp280;'; //匯入氣壓感測器函式庫
	Blockly.Arduino.setups_.manual_add = "bmp280.init();\n" + statements_setup;
	console.log(a);
    var code = "bmp280.calcAltitude(bmp280.getPressure())";
    return [code, Blockly.Arduino.ORDER_NONE]; //注意read / write 的 return 型態不一樣
};

//10 accel
Blockly.Arduino['accelRead']=function(block){
	var a = Blockly.Arduino.valueToCode(block, 'pin', Blockly.Arduino.ORDER_ATOMIC);
	var b = block.getFieldValue('mode');
	var statements_setup = Blockly.Arduino.statementToCode(block, 'setup');
	Blockly.Arduino.definitions_['accel'] = '#include "LIS3DHTR.h"\n#include <Wire.h>\n'
    + 'LIS3DHTR<TwoWire> LIS;\n#define WIRE Wire\n'; 
	//新版函式庫 LIS(I2C_MODE) --> LIS
	Blockly.Arduino.setups_["setup_input_"+a]="LIS.begin(WIRE, 0x19);\n  delay(100);\n"
    + "  LIS.setOutputDataRate(LIS3DHTR_DATARATE_50HZ);\n";
	console.log(a);
    var code = "LIS.getAcceleration" + b +"()";
    return [code, Blockly.Arduino.ORDER_NONE]; //注意read / write 的 return 型態不一樣
};

//11 sgp30Set
Blockly.Arduino['sgp30Set'] = function(block) {
	var a = Blockly.Arduino.valueToCode(block, 'pin', Blockly.Arduino.ORDER_ATOMIC);
    var b = Blockly.Arduino.valueToCode(block, 'y', Blockly.Arduino.ORDER_ATOMIC);
	var c = Blockly.Arduino.valueToCode(block, 'content', Blockly.Arduino.ORDER_ATOMIC);
   	Blockly.Arduino.definitions_['sgp30Set'] = '#include <Arduino.h>\n#include "sensirion_common.h"\n#include "sgp30.h"';//匯入函式庫放在最上面
    //匯入函式庫
	var statements_setup = Blockly.Arduino.statementToCode(block, 'setup');
	Blockly.Arduino.setups_.manual_add = "" + statements_setup;
	var code = 's16 err = 0;\nu16 tvoc_ppb, co2_eq_ppm;\nerr = sgp_measure_iaq_blocking_read(&tvoc_ppb, &co2_eq_ppm);\n';
	return code;
};

//12 sgp30 - CO2
Blockly.Arduino['sgp30ReadCO2']=function(block){
	var a = Blockly.Arduino.valueToCode(block, 'pin', Blockly.Arduino.ORDER_ATOMIC);
	var statements_setup = Blockly.Arduino.statementToCode(block, 'setup');
	Blockly.Arduino.definitions_['sgp30ReadCO2'] = ''; //匯入函式庫已在 sgp30Set 中完成
    Blockly.Arduino.setups_.manual_add = 's16 err;\n  u16 scaled_ethanol_signal, scaled_h2_signal;\n'
	+'  while (sgp_probe() != STATUS_OK){\n'
	+'    Serial.println("SGP failed");\n    while (1);\n  }\n'
    +'err = sgp_measure_signals_blocking_read(&scaled_ethanol_signal,&scaled_h2_signal);' + statements_setup; 
	console.log(a);
    var code = "co2_eq_ppm"; //這邊應該還是不對
    return [code, Blockly.Arduino.ORDER_NONE]; //注意read / write 的 return 型態不一樣
};

//13 ble_setup
Blockly.Arduino['ble_setup']=function(block){
	var a = Blockly.Arduino.valueToCode(block, 'RXpin', Blockly.Arduino.ORDER_ATOMIC);
    var b = Blockly.Arduino.valueToCode(block, 'TXpin', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_['ble_setup'] = '#include <SoftSerial.h>\nSoftSerial HM10(7,8);\nchar appData;\nString inData = "";';//匯入函式庫放在最上面
    //匯入函式庫
	var statements_setup = Blockly.Arduino.statementToCode(block, 'setup');
	Blockly.Arduino.setups_.manual_add = "" + statements_setup;
	var code = 'HM10.begin(9600);\n';
	return code;
};


//14 ble listen

//14 ble available

//14 ble_read
Blockly.Arduino['ble_read']=function(block){
	var a = Blockly.Arduino.valueToCode(block, 'pin', Blockly.Arduino.ORDER_ATOMIC);
	var statements_setup = Blockly.Arduino.statementToCode(block, 'setup');
    //Blockly.Arduino.setups_["setup_input_"+a]="";
    
	Blockly.Arduino.setups_["ble_read"]= "HM10.listen();\nwhile (HM10.available()>0){\n  appData = HM10.read();\n" + statements_setup;
	
	console.log(a);
    var code = 'appData';  //輸入值的部分不能加 ;\n
    return [code, Blockly.Arduino.ORDER_NONE]; //注意read / write 的 return 型態不一樣   
};

/**
//15 ble_write
Blockly.Arduino['ble_write'] = function(block) {
	var a = Blockly.Arduino.valueToCode(block, 'pin', Blockly.Arduino.ORDER_ATOMIC);
    var b = Blockly.Arduino.valueToCode(block, 'y', Blockly.Arduino.ORDER_ATOMIC);
	var c = Blockly.Arduino.valueToCode(block, 'content', Blockly.Arduino.ORDER_ATOMIC);
   	Blockly.Arduino.definitions_['oled_print'] = "#include <Arduino.h>\n#include <U8x8lib.h>\n" 
	

};
**/