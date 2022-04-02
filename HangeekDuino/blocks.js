//2020 Arduino首次接觸就上手, CAVEDU

//01 LED digital
Blockly.Blocks['led_digital'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.led_digital);
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("(");
    this.appendDummyInput()
        .appendField(",")
        .appendField(new Blockly.FieldDropdown([["HIGH","1"], ["LOW","0"]]), "mode")
        .appendField(")");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(255);
    this.setTooltip(Blockly.Msg.led_digital_tooltip);
    this.setHelpUrl("https://cavedu.gitbook.io/cavedu/hangeekduino/hangeekduino_intro/output_module/led");
  }
};

//01 led analog
Blockly.Blocks['led_analog'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.led_analog);
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("(");
    
	this.appendValueInput("pwm")
        .setCheck("Number")
        .appendField(",");
		this.appendDummyInput()
        .appendField(")");
	
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(255);
    this.setTooltip(Blockly.Msg.led_analog_tooltip);
    this.setHelpUrl("https://cavedu.gitbook.io/cavedu/hangeekduino/hangeekduino_intro/output_module/led");
  }
};

//02 button
Blockly.Blocks['buttonRead'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.buttonRead);
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("(");
    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(60);
    this.setTooltip(Blockly.Msg.buttonRead_tooltip);
    this.setHelpUrl("https://cavedu.gitbook.io/cavedu/hangeekduino/hangeekduino_intro/input_module/button");
  }
};

//03 rotary potentiometer
Blockly.Blocks['rotaryRead'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.rotaryRead);
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("(");
    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(60);
    this.setTooltip(Blockly.Msg.rotaryRead_tooltip);
    this.setHelpUrl("https://cavedu.gitbook.io/cavedu/hangeekduino/hangeekduino_intro/input_module/rotarypotentiometer");
  }
};
//02 buzzer noTone
Blockly.Blocks['buzzer_noTone']={
	init:function(){
		this.appendDummyInput()
        .appendField(Blockly.Msg.buzzer_noTone);
		this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("(");
		this.appendDummyInput()
        .appendField(")");
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(255);
		this.setTooltip(Blockly.Msg.buzzer_noTone_tooltip);
		this.setHelpUrl("https://cavedu.gitbook.io/cavedu/hangeekduino/hangeekduino_intro/output_module/buzzer");
	}
};

//04 buzzer tone pwm
Blockly.Blocks['buzzer_tone_pwm']={
	init:function(){
		this.appendDummyInput()
        .appendField(Blockly.Msg.buzzer_tone_pwm);
		this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("(");
		
		this.appendValueInput("pwm")
        .setCheck("Number")
        .appendField(",");
		this.appendDummyInput()
        .appendField(")");
		
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(255);
		this.setTooltip(Blockly.Msg.buzzer_tone_pwm_tooltip);
		this.setHelpUrl("https://cavedu.gitbook.io/cavedu/hangeekduino/hangeekduino_intro/output_module/buzzer");
	}
};

//04 buzzer tone custom
Blockly.Blocks['buzzer_tone_custom']={
	init:function(){
		this.appendDummyInput()
        .appendField(Blockly.Msg.buzzer_tone_custom);
		this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("(");
		
		this.appendValueInput("freq")
        .setCheck("Number")
        .appendField(",");
		this.appendDummyInput()
        .appendField(")");
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(255);
		this.setTooltip(Blockly.Msg.buzzer_tone_custom_tooltip);
		this.setHelpUrl("https://cavedu.gitbook.io/cavedu/hangeekduino/hangeekduino_intro/output_module/buzzer");
	}
};

//05 light sensor
Blockly.Blocks['lightRead'] = { //here
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.lightRead);  //here
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("(");
    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(60);
    this.setTooltip(Blockly.Msg.lightRead_tooltip);
    this.setHelpUrl("https://cavedu.gitbook.io/cavedu/hangeekduino/hangeekduino_intro/input_module/lightsensor");
  }
};

//06 sound sensor
Blockly.Blocks['soundRead'] = { //這裡沒改的話，表單無法展開
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.soundRead);  //帶入積木名稱
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("(");
    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(60);
    this.setTooltip(Blockly.Msg.soundRead_tooltip);
    this.setHelpUrl("https://cavedu.gitbook.io/cavedu/hangeekduino/hangeekduino_intro/input_module/soundsensor");
  }
};

//07 OLED print
Blockly.Blocks['OLED_print']={
	init:function(){
		this.appendDummyInput()
        .appendField(Blockly.Msg.OLED_print);
		this.appendValueInput("x")
        .setCheck("Number")
        .appendField("(");
		this.appendDummyInput()
        .appendField(",");
		this.appendValueInput("y")
        .setCheck("Number");
		this.appendValueInput("content")
        //.setCheck("Text")
        .appendField(",");
		this.appendDummyInput()
        .appendField(")");
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(255);
		this.setTooltip(Blockly.Msg.OLED_print_tooltip);
		this.setHelpUrl("https://cavedu.gitbook.io/cavedu/hangeekduino/hangeekduino_intro/output_module/oled");
	}
};

//07 OLED clear
Blockly.Blocks['OLED_clear']={
	init:function(){
		this.appendDummyInput()
        .appendField(Blockly.Msg.OLED_clear);
		this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("(");
		this.appendDummyInput()
        .appendField(")");
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(255);
		this.setTooltip(Blockly.Msg.OLED_clear_tooltip);
		this.setHelpUrl("https://cavedu.gitbook.io/cavedu/hangeekduino/hangeekduino_intro/output_module/oled");
	}
};

//08 dht read
Blockly.Blocks['dhtRead'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.dhtRead_tooltip);
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("(");
    this.appendDummyInput()
        .appendField(",")
        .appendField(new Blockly.FieldDropdown([["溫度","Temperature"], ["濕度","Humidity"]]), "mode")
        .appendField(")");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(60);
    this.setTooltip(Blockly.Msg.dhtRead_tooltip);
    this.setHelpUrl("https://cavedu.gitbook.io/cavedu/hangeekduino/hangeekduino_intro/input_module/dht11sensor");
  }
};

//09  bmp280 - air Pressure
Blockly.Blocks['airPressureRead'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.airPressureRead);
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("(");
    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(60);
    this.setTooltip(Blockly.Msg.airPressureRead_tooltip);
    this.setHelpUrl("https://cavedu.gitbook.io/cavedu/hangeekduino/hangeekduino_intro/input_module/airpressuresensor");
  }
};

//09  bmp280 - altitude
Blockly.Blocks['altitudeRead'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.altitudeRead);
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("(");
    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(60);
    this.setTooltip(Blockly.Msg.altitudeRead_tooltip);
    this.setHelpUrl("https://cavedu.gitbook.io/cavedu/hangeekduino/hangeekduino_intro/input_module/airpressuresensor");
  }
};

//10 accelerometer
Blockly.Blocks['accelRead'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.accelRead);
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("("); // pin 還不知道怎麼拿掉
    
	this.appendDummyInput()
        .appendField(",")
        .appendField(new Blockly.FieldDropdown([["X","X"], ["Y","Y"],["Z","Z"]]), "mode")
        .appendField(")");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(60);
    this.setTooltip(Blockly.Msg.accelRead_tooltip);
    this.setHelpUrl("https://cavedu.gitbook.io/cavedu/hangeekduino/hangeekduino_intro/input_module/accelerometer");
  }
};

//11 sgp30Set
Blockly.Blocks['sgp30Set']={
	init:function(){
		this.appendDummyInput()
        .appendField(Blockly.Msg.sgp30Set);
		this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("(");
		this.appendDummyInput()
        .appendField(")");
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(255);
		this.setTooltip(Blockly.Msg.sgp30Set_tooltip);
		this.setHelpUrl("xx");
	}
};

//12  sgp30 - CO2
Blockly.Blocks['sgp30ReadCO2'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.sgp30ReadCO2);
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("(");
    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(60);
    this.setTooltip(Blockly.Msg.sgp30ReadCO2_tooltip);
    this.setHelpUrl("XX");
  }
};

//13 ble_setup
Blockly.Blocks['ble_setup'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.ble_setup);
    this.appendValueInput("RXpin")
        .setCheck("Number")
        .appendField("(");
    
	this.appendValueInput("TXpin")
        .setCheck("Number")
        .appendField(",");
		this.appendDummyInput()
        .appendField(")");
	
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(255);
    this.setTooltip(Blockly.Msg.ble_setup_tooltip);
    this.setHelpUrl("XX");
  }
};


//14 ble_read
Blockly.Blocks['ble_read'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.ble_read);
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("(");
    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(60);
    this.setTooltip(Blockly.Msg.ble_read_tooltip);
    this.setHelpUrl("");
  }
};
/**
//15 ble_write
Blockly.Blocks['ble_write']={
	init:function(){
		this.appendDummyInput()
        .appendField(Blockly.Msg.ble_write);
		this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("(");
		this.appendDummyInput()
        .appendField(")");
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(255);
		this.setTooltip(Blockly.Msg.ble_write_tooltip);
		this.setHelpUrl("");
	}
	
};  **/