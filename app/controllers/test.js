const service = require('../services/test');

const TestRequest = require('../dto/testRequest');
const TestResponse = require('../dto/testResponse');

const ExecuteRequest = require('../dto/executeRequest');
const ExecuteResponse = require('../dto/executeResponse');

const InvalidParametersException = require('../exceptions/invalidParametersException');

exports.findAll = function (req,res){
	service.findAll(function(testModels) {
		var testsResponse = [];
		if(testModels){
			testModels.forEach(function(testModel,index){
				testsResponse.push(new TestResponse(testModel));
			});
		}
		var data={};
		data.tests = testsResponse;
	  res.json(data);
	});
}

exports.findById = function (req,res){
	service.findById(req.params.testId,function(testModel){
		res.json(new TestResponse(testModel));
	});
}

exports.insert = function (req,res){
	var testRequestDTO = new TestRequest(req.body);
	service.insert(testRequestDTO,function(testModel){
		res.json(new TestResponse(testModel));
	});
}

exports.update = function (req,res){
	var testId = req.params.testId;
	var testRequestDTO = new TestRequest(req.body);
	testRequestDTO.id = testId;
	service.update(testRequestDTO,function(testModel){
		if(testModel){
			res.json(new TestResponse(testModel));
		}else{
			res.sendStatus(404);
		}
	});
}

exports.delete = function (req,res){
	service.delete(req.params.testId);
	res.sendStatus(200);
}

exports.execute = function (req,res){
	var testId = req.params.testId;
	var transactionRef = req.query.transactionRef;
	try{
		service.execute(testId,transactionRef,function(testModel,candidateModel,error){
			if(error){
				if(error instanceof InvalidParametersException){
					res.status(412).send(error.message);
				}else{
					res.status(500).send(error);
				}
			}
			if(testModel){
				if(candidateModel){
					res.json(new ExecuteResponse(testModel.id,candidateModel));
				}else{
					res.sendStatus(200);
				}
			}else{
				res.sendStatus(404);
			}
		});
	}catch(err){
			res.sendStatus(500);
	}
}

exports.reset = function (req,res){
	var testId = req.params.testId;
	service.reset(testId,function(testModel){
		if(testModel){
			res.json(new TestResponse(testModel));
		}else{
			res.sendStatus(404);
		}
	});
}

exports.convert = function (req,res){
	var candidateId = req.params.candidateId;
	service.convert(candidateId);
	res.sendStatus(200);
}
