var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('2-Nl7XnWZFDqQj6m9ypyfg');

var mailer = {

	sendTemplate: function(template_name, template_content, merge_vars, mailto, callback) {

	    var message = {
		    "from_email": "no-reply@p2pappreciate.com",
		    "from_name": "p2pappreciate",
		    "to": [{
	            "email": mailto,
	            "type": "to"
	        }],
	        "merge_vars": merge_vars,
		    "important": false
		};

		mandrill_client.messages.sendTemplate({"template_name": template_name, "template_content": template_content, "message": message}, function(result) {
		    console.log(result);
		    callback();
		    /*
		    [{
		            "email": "recipient.email@example.com",
		            "status": "sent",
		            "reject_reason": "hard-bounce",
		            "_id": "abc123abc123abc123abc123abc123"
		        }]
		    */
		}, function(e) {
		    // Mandrill returns the error as an object with name and message keys
		    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
		    // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
		});

	},

	send: function(subject, html, mailto, callback) {

		var message = {
		    "html": html,
		    "text": "",
		    "subject": subject,
		    "from_email": "no-reply@p2pappreciate.com",
		    "from_name": "p2pappreciate",
		    "to": [{
		            "email": mailto,
		            "type": "to"
		        }],
		    "important": false,
		};

		mandrill_client.messages.send({"message": message}, function(result) {
		    console.log(result);
		    callback();

		}, function(e) {
		    // Mandrill returns the error as an object with name and message keys
		    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
		    // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
		});

	}
};

module.exports = mailer;