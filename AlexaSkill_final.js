const AWS = require('aws-sdk');
const Alexa = require('alexa-sdk');
const uuid = require('uuid');
AWS.config.update({region: 'us-east-1'});
const dynamoDb = new AWS.DynamoDB({apiVersion: '2012-10-08'});

var countData = 0;
var countEmergency = 0;
var countEmergency2 = 0;
var user_ID = '';
var edad = 0;
var estatura = 0;
var peso = 0;
var alergias = 0;
var medicamento = 0;
var doc = 0;
var nombre = 0;
var direccion = 0;

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    var locale = event.request.locale;
        user_ID = event.session.user.userId;
        alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('asistenciaMedica');
    },
    'asistenciaMedica': function () {
        this.response.speak('Welcome to Aid. How can I help you?').listen('');
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = 'The option is not valid, try with: Call my attendant, Call a medicated ambulance, Call a basic ambulance or Enter personal information';
        const reprompt = 'The option is not valid, try with: Call my attendant, Call a medicated ambulance, Call a basic ambulance or Enter personal information';
        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak('Thanks for using my services');
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak('Thanks for using my services');
        this.emit(':responseReady');
    },
    'mensaje': function (){
                var getAnswer = this.event.request.intent.slots.respuesta.value;
                if('call my attendant'== getAnswer){
                  var dynamodbParams = {
                        TableName: 'registroAlexa',
        Item: {
          'registroID': {S: uuid.v1()},
          'userID': {S: user_ID},
          'tipo': {S: "contacto"},
        }
        
      };
 
    dynamoDb.putItem(dynamodbParams, function(err, data){
      if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
    });
                this.emit(':tell','Calling your attendant....');   
                }
                /////////////////////////////////////////////////
                                else if ('call a basic ambulance'== getAnswer){
                      this.emit(':ask','Are you having trouble breathing?'); 
                      countEmergency2 = 1;  
                }
                else if (1 == countEmergency2 && getAnswer == 'si'){
                      this.emit(':tell','Calling a basic ambulance ....');
                      var dynamodbParams = {
                        TableName: 'registroAlexa',
        Item: {
          'registroID': {S: uuid.v1()},
          'userID': {S: user_ID},
          'tipo': {S: "basica"},
        }
        
      };
 
    dynamoDb.putItem(dynamodbParams, function(err, data){
      if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
    }); 
                      countEmergency2 = 0;  
                }
                else if (1 == countEmergency2 && getAnswer == 'no'){
                      this.emit(':ask','Did you suffer any kind of trauma?'); 
                      countEmergency2 = 2;  
                }
                else if (2 == countEmergency2 && getAnswer == 'si'){
                      this.emit(':tell','Calling a basic ambulance ....');
                      var dynamodbParams = {
                        TableName: 'registroAlexa',
        Item: {
          'registroID': {S: uuid.v1()},
          'userID': {S: user_ID},
          'tipo': {S: "basica"},
        }
        
      };
 
    dynamoDb.putItem(dynamodbParams, function(err, data){
      if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
    }); 
                      countEmergency2 = 0;  
                }
                else if (2 == countEmergency2 && getAnswer == 'no'){
                      this.emit(':ask','Ambulance to transport?'); 
                      countEmergency2 = 3;  
                }
                else if (3 == countEmergency2 && getAnswer == 'si'){
                      this.emit(':tell','Calling a basic ambulance ....');
                      var dynamodbParams = {
                        TableName: 'registroAlexa',
        Item: {
          'registroID': {S: uuid.v1()},
          'userID': {S: user_ID},
          'tipo': {S: "basica"},
        }
        
      };
 
    dynamoDb.putItem(dynamodbParams, function(err, data){
      if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
    }); 
                      countEmergency2 = 0;  
                }
                else if (3 == countEmergency2 && getAnswer == 'no'){
                  var dynamodbParams = {
                        TableName: 'registroAlexa',
        Item: {
          'registroID': {S: uuid.v1()},
          'userID': {S: user_ID},
          'tipo': {S: "medicada"},
        }
        
      };
 
    dynamoDb.putItem(dynamodbParams, function(err, data){
      if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
    });
                      this.emit(':tell','Maybe it is more appropriate to call a medicated ambulance ....., I will communicate you with it...'); 
                      countEmergency2 = 0;  
                }
                /////////////////////////////////////////////////
                //////// traumatismo, desmayos, fractura, dolor fuerte 
               else if ('call a medicated ambulance'== getAnswer){
                      this.emit(':ask','Are you suffering from a hemorrhage from a deep wound?');
                      countEmergency = 1;   
                }
                else if (1 == countEmergency && getAnswer == 'no'){
                      this.emit(':ask','Is your emergency related to a chronic illness?'); 
                      countEmergency = 2;  
                }
                else if (1 == countEmergency && getAnswer == 'si'){
                  var dynamodbParams = {
                        TableName: 'registroAlexa',
        Item: {
          'registroID': {S: uuid.v1()},
          'userID': {S: user_ID},
          'tipo': {S: "medicada"},
        }
        
      };
 
    dynamoDb.putItem(dynamodbParams, function(err, data){
      if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
    });
                      this.emit(':tell','Calling a medicated ambulance ....'); 
                      countEmergency = 0;  
                }
                else if (2 == countEmergency && getAnswer == 'no'){
                      this.emit(':ask','Did you suffer a burn?'); 
                      countEmergency = 3;  
                }
                else if (2 == countEmergency && getAnswer == 'si'){
                  var dynamodbParams = {
                        TableName: 'registroAlexa',
        Item: {
          'registroID': {S: uuid.v1()},
          'userID': {S: user_ID},
          'tipo': {S: "medicada"},
        }
        
      };
 
    dynamoDb.putItem(dynamodbParams, function(err, data){
      if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
    });
                      this.emit(':tell','Calling a medicated ambulance ....'); 
                      countEmergency = 0;  
                }
                else if (3 == countEmergency && getAnswer == 'no'){
                      this.emit(':ask','Are you suffering any allergy or medical condition previously diagnosed?'); 
                      countEmergency = 4;  
                }
                else if (3 == countEmergency && getAnswer == 'si'){
                  var dynamodbParams = {
                        TableName: 'registroAlexa',
        Item: {
          'registroID': {S: uuid.v1()},
          'userID': {S: user_ID},
          'tipo': {S: "medicada"},
        }
        
      };
 
    dynamoDb.putItem(dynamodbParams, function(err, data){
      if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
    });
                      this.emit(':tell','Calling a medicated ambulance ....'); 
                      countEmergency = 0;  
                }
                else if (4 == countEmergency && getAnswer == 'no'){
                  var dynamodbParams = {
                        TableName: 'registroAlexa',
        Item: {
          'registroID': {S: uuid.v1()},
          'userID': {S: user_ID},
          'tipo': {S: "basica"},
        }
        
      };
 
    dynamoDb.putItem(dynamodbParams, function(err, data){
      if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
    });
                      this.emit(':tell','Maybe it is more appropriate to call a basic ambulance ...., I will communicate you with it ....'); 
                      countEmergency = 0;  
                }
                else if (4 == countEmergency && getAnswer == 'si'){
                  var dynamodbParams = {
                        TableName: 'registroAlexa',
        Item: {
          'registroID': {S: uuid.v1()},
          'userID': {S: user_ID},
          'tipo': {S: "medicada"},
        }
        
      };
 
    dynamoDb.putItem(dynamodbParams, function(err, data){
      if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
    });
                      this.emit(':tell','Calling a medicated ambulance ....'); 
                      countEmergency = 0;  
                }
                ///////
                else if ('enter personal information'==getAnswer){
                    countData = 1;
                      this.emit(':ask','Number of your ID?');   
                }
                else if (1==countData){
                    doc=getAnswer;
                    countData = 2;
                      this.emit(':ask','What is your name?');   
                }
                else if (2==countData){
                    nombre=getAnswer;
                    countData = 3;
                      this.emit(':ask','How old are you?');   
                }
                else if (3==countData){
                    edad=getAnswer;
                    countData = 4;
                      this.emit(':ask','What is your height?');   
                }
                else if (4==countData){
                    estatura=getAnswer;
                    countData = 5;
                      this.emit(':ask','What is your weight?');   
                }
                else if (5==countData){
                    peso=getAnswer;
                    countData = 6;
                      this.emit(':ask','You have allergies?');   
                }
                else if (6==countData){
                    alergias=getAnswer;
                    countData = 7;
                      this.emit(':ask','Do you use any prescription medication?');   
                }
                else if (7==countData){
                    medicamento=getAnswer;
                    countData = 8;
                      this.emit(':ask','What is your address?');   
                }
                else if (8==countData){
                    direccion=getAnswer;
                    countData = 0;

                    var dynamodbParams = {
                        TableName: 'asistencia_Medica_DB',
        Item: {
          'doc_clie': {S: doc},
          'nombre': {S: nombre},
          'edad': {S: edad},
          'estatura': {S: estatura},
          'peso': {S: peso},
          'alergias': {S: alergias},
          'medicamento': {S: medicamento},
          'user_ID': {S: user_ID},
          'direccion': {S: direccion},
        }
        
      };
 
    dynamoDb.putItem(dynamodbParams, function(err, data){
      if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
    });
    this.emit(':ask', 'Can I help you with something else?');
                }
                else if('data'==getAnswer){
                    this.emit(':tell','Edad '+edad+'-Estatura '+estatura+'-Peso '+peso+'-Alergias '+alergias+'-Medicamento '+medicamento);
                }
                      else{
                         this.emit(':ask','The option is not valid, try with: Call my attendant, Call a medicated ambulance, Call a basic ambulance or Enter personal information');
                      }
                },
};