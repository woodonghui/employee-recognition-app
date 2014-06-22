var map = {
	//Bad request 400

	"400": "bad request",

	"ValidationError": "message message %s message",

	// "http": {
	// 	"400": "bad request",
	// 	"404": "",
	// 	"500": ""
	// },
	
	"common.register.invalidlink": "invalid register link."
};

module.exports.getMessage = function getMessage(name){
	return map[name];
};