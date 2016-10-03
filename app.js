var express = require('express');
var path = require('path');
var _ = require('lodash');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var htmlencode = require('htmlencode');

var routes = require('./routes/index');
var users = require('./routes/users');
var request = require('request-promise');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);


app.post('/searchResult/:actionName',function(req,res){
	res.writeHead(200,{'Content-Type':'application/json'});
	console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&',req.body);
	res.end(JSON.stringify({"actionExecuted":req.params.actionName,"fieldSent":req.body}));

}); 


app.get('/abandendCart',function(req,res){
	//res.writeHead(200,{'Content-Type':'application/json'});
	console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&',req.body);
	var options=
 {
       url: 'https://kore02-tech-prtnr-na06-dw.demandware.net/dw/oauth2/access_token?client_id=92739519-521e-40b7-a099-03bd7718ddb8', //URL to hit
       method: 'POST',
       headers: {
        'Authorization' : 'Basic U3VkaGE6S29yZWNvbW1lcmNlMSE6S29yZUAxMjM=',
      },
      form : {
       grant_type: 'urn:demandware:params:oauth:grant-type:client-id:dwsid:dwsecuretoken'
     }
   };

   request(options).then(function(response){
     response = JSON.parse(response);
     console.log(response.access_token);
     var options2=
     {
       url: 'https://kore02-tech-prtnr-na06-dw.demandware.net/s/SiteGenesis/dw/shop/v16_8/customers/abZ0lu9ys35OlDtM27QFqlbvfT/baskets', //URL to hit
       method: 'GET',
       headers: {
        'Authorization' : 'Bearer '+response.access_token,
      }

    };
    request(options2).then(function(res2){
      console.log(res2);
      res.send(JSON.parse(res2));
    }).catch(function(err2){
		//console.log(err2);
    res.send(err2);
  });
  }).catch(function(err){
//console.log(err);
res.send(err);
});
});

app.get('/addItems/:basketId/:product_id',function(req,res){
	//res.writeHead(200,{'Content-Type':'application/json'});
	console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&',req.body);
	var options=
 {
       url: 'https://kore02-tech-prtnr-na06-dw.demandware.net/dw/oauth2/access_token?client_id=92739519-521e-40b7-a099-03bd7718ddb8', //URL to hit
       method: 'POST',
       headers: {
        'Authorization' : 'Basic U3VkaGE6S29yZWNvbW1lcmNlMSE6S29yZUAxMjM=',
      },
      form : {
       grant_type: 'urn:demandware:params:oauth:grant-type:client-id:dwsid:dwsecuretoken'
     }
   };

   request(options).then(function(response){
     response = JSON.parse(response);
     console.log(response.access_token);
     var options2=
     {
       url: 'https://kore02-tech-prtnr-na06-dw.demandware.net/s/SiteGenesis/dw/shop/v16_8/baskets/'+req.params.basketId+'/items', //URL to hit
       method: 'POST',
       headers: {
        'Authorization' : 'Bearer '+response.access_token,
      },
	  json:{
		  "product_id":req.params.product_id,
		  "quantity":1
	  }

    };
    return request(options2).then(function(res2){
      console.log(res2);
      return res.send(res2);
    }).catch(function(err2){
		//console.log(err2);
    res.send(err2);
  });
  }).catch(function(err){
//console.log(err);
res.send(err);
});
});

app.get('/orders',function(req,res){
	//res.writeHead(200,{'Content-Type':'application/json'});
	console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&',req.body);
	var options=
 {
       url: 'https://kore02-tech-prtnr-na06-dw.demandware.net/dw/oauth2/access_token?client_id=92739519-521e-40b7-a099-03bd7718ddb8', //URL to hit
       method: 'POST',
       headers: {
        'Authorization' : 'Basic U3VkaGE6S29yZWNvbW1lcmNlMSE6S29yZUAxMjM=',
      },
      form : {
       grant_type: 'urn:demandware:params:oauth:grant-type:client-id:dwsid:dwsecuretoken'
     }
   };

   request(options).then(function(response){
     response = JSON.parse(response);
     console.log(response.access_token);
     var options2=
     {
       url: 'https://kore02-tech-prtnr-na06-dw.demandware.net/s/SiteGenesis/dw/shop/v16_8/customers/abZ0lu9ys35OlDtM27QFqlbvfT/orders', //URL to hit
       method: 'GET',
       headers: {
        'Authorization' : 'Bearer '+response.access_token,
      }

    };
    request(options2).then(function(res2){
      console.log(res2);
      res.send(JSON.parse(res2));
    }).catch(function(err2){
		//console.log(err2);
    res.send(err2);
  });
  }).catch(function(err){
//console.log(err);
res.send(err);
});
});


app.get('/cancelOrder/:order_id',function(req,res){
	//res.writeHead(200,{'Content-Type':'application/json'});
	console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&',req.body);
	var options=
 {
       url: 'https://kore02-tech-prtnr-na06-dw.demandware.net/dw/oauth2/access_token?client_id=92739519-521e-40b7-a099-03bd7718ddb8', //URL to hit
       method: 'POST',
       headers: {
        'Authorization' : 'Basic U3VkaGE6S29yZWNvbW1lcmNlMSE6S29yZUAxMjM=',
      },
      form : {
       grant_type: 'urn:demandware:params:oauth:grant-type:client-id:dwsid:dwsecuretoken'
     }
   };

   return request(options).then(function(response){
     response = JSON.parse(response);
     console.log(response.access_token);
     var options2=
     {
       url: 'https://kore02-tech-prtnr-na06-dw.demandware.net/s/SiteGenesis/dw/shop/v16_8/orders/'+req.params.order_id, //URL to hit
       method: 'PATCH',
       headers: {
        'Authorization' : 'Bearer '+response.access_token,
      },
      json:{
       "status":"cancelled"
     }

   };
   return request(options2).then(function(res2){
    console.log(res2);
    return res.json(res2);
  }).catch(function(err2){
		//console.log(err2);
   res.send(err2);
 });
}).catch(function(err){
//console.log(err);
res.send(err);
});
console.log('===============================');
});

app.get('/orderDetails/:order_id',function(req,res){
	//res.writeHead(200,{'Content-Type':'application/json'});
	console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&',req.body);
	var options=
 {
       url: 'https://kore02-tech-prtnr-na06-dw.demandware.net/dw/oauth2/access_token?client_id=92739519-521e-40b7-a099-03bd7718ddb8', //URL to hit
       method: 'POST',
       headers: {
        'Authorization' : 'Basic U3VkaGE6S29yZWNvbW1lcmNlMSE6S29yZUAxMjM=',
      },
      form : {
       grant_type: 'urn:demandware:params:oauth:grant-type:client-id:dwsid:dwsecuretoken'
     }
   };

   return request(options).then(function(response){
     response = JSON.parse(response);
     console.log(response.access_token);
     var options2=
     {
       url: 'https://kore02-tech-prtnr-na06-dw.demandware.net/s/SiteGenesis/dw/shop/v16_8/orders/'+req.params.order_id, //URL to hit
       method: 'GET',
       headers: {
        'Authorization' : 'Bearer '+response.access_token,
      }
    };
    return request(options2).then(function(res2){
      console.log(res2);
      return res.send([JSON.parse(res2)]);
    }).catch(function(err2){
		//console.log(err2);
   res.send(err2);
 });
  }).catch(function(err){
//console.log(err);
res.send(err);
});
  console.log('===============================');
});

app.get('/basket',function(req,res){
	//res.writeHead(200,{'Content-Type':'application/json'});
	console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&',req.body);
	var options=
 {
       url: 'https://kore02-tech-prtnr-na06-dw.demandware.net/dw/oauth2/access_token?client_id=92739519-521e-40b7-a099-03bd7718ddb8', //URL to hit
       method: 'POST',
       headers: {
        'Authorization' : 'Basic U3VkaGE6S29yZWNvbW1lcmNlMSE6S29yZUAxMjM=',
      },
      form : {
       grant_type: 'urn:demandware:params:oauth:grant-type:client-id:dwsid:dwsecuretoken'
     }
   };

   request(options).then(function(response){
     response = JSON.parse(response);
     console.log(response.access_token);
     var options2=
     {
       url: 'https://kore02-tech-prtnr-na06-dw.demandware.net/s/SiteGenesis/dw/shop/v16_8/customers/abZ0lu9ys35OlDtM27QFqlbvfT/baskets',//URL to hit
       method: 'GET',
       headers: {
        'Authorization' : 'Bearer '+response.access_token,
      }
    };'[['
    request(options2).then(function(res2){
      res2 = JSON.parse(res2);
      console.log('%%%%%%%%%%%%%%',res2.total>0);
      if(res2.total <= 0){
       console.log("in if");
       var options3=
       {
       url: 'https://kore02-tech-prtnr-na06-dw.demandware.net/s/SiteGenesis/dw/shop/v16_8/baskets',//URL to hit
       method: 'POST',
       headers: {
        'Authorization' : 'Bearer '+response.access_token,
      }
    };
    return request(options3).then(function(res3){
      console.log('result*********',JSON.parse(res3));
      return res.send(JSON.parse(res3));
    }).catch(function(err3){
     res.send(err3);
   });
  }else{
   console.log("in else",res2);
			//console.log('&&&&&&&&&&&&',res2.baskets[0].basket_id);
			res.send(res2);
		}
	}).catch(function(err2){
		res.send(err2);
	});
}).catch(function(err){
//console.log(err);
res.send(err);
});
console.log('===============================');
});

app.get('/customerBasket/:basketId/:customerId',function(req,res){
	//res.writeHead(200,{'Content-Type':'application/json'});
	console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&',req.body);
	var token = '';
	var options=
 {
       url: 'https://kore02-tech-prtnr-na06-dw.demandware.net/dw/oauth2/access_token?client_id=92739519-521e-40b7-a099-03bd7718ddb8', //URL to hit
       method: 'POST',
       headers: {
        'Authorization' : 'Basic U3VkaGE6S29yZWNvbW1lcmNlMSE6S29yZUAxMjM=',
      },
      form : {
       grant_type: 'urn:demandware:params:oauth:grant-type:client-id:dwsid:dwsecuretoken'
     }
   };

   request(options).then(function(response){
    console.log('response1&&&&&&&&&&&&',response);
    response = JSON.parse(response);
    token = response.access_token;
    console.log('token************',token);
    var options2=
    {
       url: 'https://kore02-tech-prtnr-na06-dw.demandware.net/s/SiteGenesis/dw/shop/v16_8/customers/'+req.params.customerId,//URL to hit
       method: 'GET',
       headers: {
        'Authorization' : 'Bearer '+token,
      }
    };
    request(options2).then(function(res2){
     res2 = JSON.parse(res2);
     console.log(res2.customer_no);
     console.log(res2.email);
     var options3=
     {
       url: 'https://kore02-tech-prtnr-na06-dw.demandware.net/s/SiteGenesis/dw/shop/v16_8/baskets/'+req.params.basketId+'/customer',//URL to hit
       method: 'PUT',
       headers: {
        'Authorization' : 'Bearer '+token,
      },
      json:{
       "customer_no":res2.customer_no,
       "email":res2.email
     }
   };
   return request(options3).then(function(res3){
    console.log(res3);
    return res.json(res3);
  }).catch(function(err3){
    res.send(err3);
  });
}).catch(function(err2){
	res.send(err2);
});
}).catch(function(err){
//console.log(err);
res.send(err);
});
console.log('===============================');
});

app.get('/updateBasket/:basketId/:addressId',function(req,res){
	//res.writeHead(200,{'Content-Type':'application/json'});
	console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&',req.body);
	var options=
 {
       url: 'https://kore02-tech-prtnr-na06-dw.demandware.net/dw/oauth2/access_token?client_id=92739519-521e-40b7-a099-03bd7718ddb8', //URL to hit
       method: 'POST',
       headers: {
        'Authorization' : 'Basic U3VkaGE6S29yZWNvbW1lcmNlMSE6S29yZUAxMjM=',
      },
      form : {
       grant_type: 'urn:demandware:params:oauth:grant-type:client-id:dwsid:dwsecuretoken'
     }
   };

   request(options).then(function(response){
     response = JSON.parse(response);
     console.log(response.access_token);
     var options2=
     {
       url: 'https://kore02-tech-prtnr-na06-dw.demandware.net/s/SiteGenesis/dw/shop/v16_8/customers/abZ0lu9ys35OlDtM27QFqlbvfT/addresses/'+req.params.addressId,
       method: 'GET',
       headers: {
        'Authorization' : 'Bearer '+response.access_token,
      }
    };
    request(options2).then(function(res2){
      console.log(res2);
      var options3=
      {
       url: 'https://kore02-tech-prtnr-na06-dw.demandware.net/s/SiteGenesis/dw/shop/v16_8/baskets/'+req.params.basketId+'/shipments',
       method: 'POST',
       headers: {
        'Authorization' : 'Bearer '+response.access_token,
      },
      json:{
        "gift":false,
        "shipping_method": {
          "_type": "shipping_method",
          "description": "Order received within 7-10 business days",
          "id": "001",
          "name": "Ground"
        },
        "shipping_address" :
        {
          "first_name":"John",
          "last_name":"Smith",
          "city":"Boston",
          "country_code":"US",
        }
      }
    };
    request(options3).then(function(res3){
      console.log(res3);
      var options4=
      {
       url: 'https://kore02-tech-prtnr-na06-dw.demandware.net/s/SiteGenesis/dw/shop/v16_8/baskets/'+req.params.basketId+'/billing_address ',
       method: 'PUT',
       headers: {
        'Authorization' : 'Bearer '+response.access_token,
      },
      json:
      {
       "first_name":"John",
       "last_name":"Smith",
       "city":"Boston",
       "country_code":"US",
       "c_strValue":"cTest"
     }
   };
   return request(options4).then(function(res4){
    console.log(res4);
    return res.send(res4);
  }).catch(function(err4){
    res.send(err4);
  });		
}).catch(function(err3){
  res.send(err3);
});
}).catch(function(err2){
		//console.log(err2);
   res.send(err2);
 });
}).catch(function(err){
//console.log(err);
res.send(err);
});
console.log('===============================');
});

app.get('/updateBasketPayment/:basketId/payments',function(req,res){
	//res.writeHead(200,{'Content-Type':'application/json'});
	console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&',req.body);
	var options=
 {
       url: 'https://kore02-tech-prtnr-na06-dw.demandware.net/dw/oauth2/access_token?client_id=92739519-521e-40b7-a099-03bd7718ddb8', //URL to hit
       method: 'POST',
       headers: {
        'Authorization' : 'Basic U3VkaGE6S29yZWNvbW1lcmNlMSE6S29yZUAxMjM=',
      },
      form : {
       grant_type: 'urn:demandware:params:oauth:grant-type:client-id:dwsid:dwsecuretoken'
     }
   };

   return request(options).then(function(response){
     response = JSON.parse(response);
     console.log(response.access_token);
     var options2=
     {
       url: 'https://kore02-tech-prtnr-na06-dw.demandware.net/s/SiteGenesis/dw/shop/v16_8/baskets/'+req.params.basketId+'/payment_instruments',//URL to hit
       method: 'POST',
       headers: {
        'Authorization' : 'Bearer '+response.access_token,
      },
      json:{
        "payment_method_id": "CREDIT_CARD",
        "payment_card": {
         "card_type": "Visa"
       }
     }
   };
   return request(options2).then(function(res2){
    console.log(res2);
    return res.send([JSON.parse(res2)]);
  }).catch(function(err2){
		//console.log(err2);
   res.send(err2);
 });
}).catch(function(err){
//console.log(err);
res.send(err);
});
console.log('===============================');
});

app.get('/basketItems/:basketId',function(req,res){
	//res.writeHead(200,{'Content-Type':'application/json'});
	console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&',req.body);
	var options=
 {
       url: 'https://kore02-tech-prtnr-na06-dw.demandware.net/dw/oauth2/access_token?client_id=92739519-521e-40b7-a099-03bd7718ddb8', //URL to hit
       method: 'POST',
       headers: {
        'Authorization' : 'Basic U3VkaGE6S29yZWNvbW1lcmNlMSE6S29yZUAxMjM=',
      },
      form : {
       grant_type: 'urn:demandware:params:oauth:grant-type:client-id:dwsid:dwsecuretoken'
     }
   };

   return request(options).then(function(response){
     response = JSON.parse(response);
     console.log(response.access_token);
     var options2=
     {
       url: 'https://kore02-tech-prtnr-na06-dw.demandware.net/s/SiteGenesis/dw/shop/v16_8/baskets/'+req.params.basketId,//URL to hit
       method: 'GET',
       headers: {
        'Authorization' : 'Bearer '+response.access_token,
      }
   };
   return request(options2).then(function(res2){
    console.log(res2);
    return res.send([JSON.parse(res2)]);
  }).catch(function(err2){
		//console.log(err2);
   res.send(err2);
 });
}).catch(function(err){
//console.log(err);
res.send(err);
});
console.log('===============================');
});


app.get('/checkOut',function(req,res){
	//res.writeHead(200,{'Content-Type':'application/json'});
	console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&',req.body);
	var options=
 {
       url: 'https://kore02-tech-prtnr-na06-dw.demandware.net/dw/oauth2/access_token?client_id=92739519-521e-40b7-a099-03bd7718ddb8', //URL to hit
       method: 'POST',
       headers: {
        'Authorization' : 'Basic U3VkaGE6S29yZWNvbW1lcmNlMSE6S29yZUAxMjM=',
      },
      form : {
       grant_type: 'urn:demandware:params:oauth:grant-type:client-id:dwsid:dwsecuretoken'
     }
   };

   request(options).then(function(response){
     response = JSON.parse(response);
     console.log(response.access_token);
     var options2=
     {
       url: 'https://kore02-tech-prtnr-na06-dw.demandware.net/s/SiteGenesis/dw/shop/v16_8/customers/abZ0lu9ys35OlDtM27QFqlbvfT/baskets', //URL to hit
       method: 'GET',
       headers: {
        'Authorization' : 'Bearer '+response.access_token,
      }		
    };
    return request(options2).then(function(res2){
      console.log(res2);
      res.send(JSON.parse(res2));
    }).catch(function(err2){
		//console.log(err2);
   res.send(err2);
 });
  }).catch(function(err){
//console.log(err);
res.send(err);
});
  console.log('===============================');
});





app.post('/selctorTool',function(req,res){
	console.log('in selector call');
	res.writeHead(200,{'Content-Type':'application/json'});
 if(req.body.cardCategory === 'lowFeesCard'){
  if(req.body.payOffCategory === 'allOfIt'){
   res.end(JSON.stringify({
    "recommendedCard": "NAB Low Fee Card",
    "url": "https://microlandpoc.herokuapp.com/images/ccsel-LowFee.jpg",
    "web_url":"http://www.nab.com.au/personal/banking/credit-cards/checklist-nab-low-fee-card"
  }));
 }else{
  res.end(JSON.stringify({"recommendedCard":"NAB Low Rate Card","url":"https://microlandpoc.herokuapp.com/images/ccsel-LowRate.jpg","web_url":"http://www.nab.com.au/personal/banking/credit-cards/checklist-nab-low-rate-card"}));
}
}else if(req.body.cardCategory === 'servicesCard'){
  res.end(JSON.stringify({"recommendedCard":"NAB Premium Card","url":"https://microlandpoc.herokuapp.com/images/ccsel-Premium.jpg","web_url":"http://www.nab.com.au/personal/banking/credit-cards/checklist-nab-premium-card"}));
}else if(req.body.cardCategory === 'rewardsCard'){
  console.log('in rewards first if');
  if(req.body.rewardsProgram !== 'undefined' || req.body.rewardsProgram === 'qantasRewards'){
    console.log('in qantas card');
    if((req.body.monthlySpend === 'under1000' && req.body.payOffCategory === 'allOfIt') || (req.body.monthlySpend === 'under3000' && req.body.payOffCategory === 'allOfIt') || ((req.body.monthlySpend === 'under7000' && req.body.payOffCategory === 'allOfIt')|| (req.body.monthlySpend === 'under7000' && req.body.payOffCategory === 'itDepends')) || req.body.monthlySpend === 'over7000'){
     res.end(JSON.stringify({"recommendedCard":"NAB Qantas Rewards Premium Card","url":"https://microlandpoc.herokuapp.com/images/ccsel-QantasPremium.jpg","web_url":"http://www.nab.com.au/personal/banking/credit-cards/checklist-nab-qantas-rewards-premium-card"}));
   }else{
     res.end(JSON.stringify({"recommendedCard":"NAB Qantas Rewards Card","url":"https://microlandpoc.herokuapp.com/images/ccsel-Qantas.jpg","web_url":"http://www.nab.com.au/personal/banking/credit-cards/checklist-nab-qantas-rewards-card"}));
   }
 }
}else if(req.body.cardCategory === 'rewardsCard'){
  console.log('in rewards second if');
  if(req.body.rewardsProgram !== 'undefined' || req.body.rewardsProgram === 'velocityRewards'){
    console.log('in velocity card');
    if((req.body.monthlySpend === 'under1000' && req.body.payOffCategory === 'allOfIt') || (req.body.monthlySpend === 'under3000' && req.body.payOffCategory === 'allOfIt') || ((req.body.monthlySpend === 'under7000' && req.body.payOffCategory === 'allOfIt')|| (req.body.monthlySpend === 'under7000' && req.body.payOffCategory === 'itDepends')) || req.body.monthlySpend === 'over7000'){
     res.end(JSON.stringify({"recommendedCard":"NAB Velocity Rewards Premium Card","url":"https://microlandpoc.herokuapp.com/images/ccsel-VelocityPremium.jpg","web_url":"http://www.nab.com.au/personal/banking/credit-cards/checklist-nab-velocity-rewards-premium-card"}));
   }else{
     res.end(JSON.stringify({"recommendedCard":"NAB Velocity Rewards Card","url":"https://microlandpoc.herokuapp.com/images/ccsel-Velocity.jpg","web_url":"http://www.nab.com.au/personal/banking/credit-cards/checklist-nab-velocity-rewards-card"}));
   }
 }
}else if(req.body.cardCategory === 'rewardsCard'){
  if(req.body.rewardsProgram !== 'undefined' && req.body.rewardsProgram === 'flybuysRewards'){
    res.end(JSON.stringify({"recommendedCard":"NAB flybuys Rewards Card","url":"https://microlandpoc.herokuapp.com/images/ccsel-flybuys.jpg","web_url":"http://www.nab.com.au/personal/banking/credit-cards/checklist-nab-flybuys-rewards-card"}));
  }
}  

});

app.get('/doctorsAvailablity',function(req,res){
	res.writeHead(200,{'Content-Type':'application/json'});
	res.end(JSON.stringify({
    "availablity": [
    {
      "fromDate": "26/08/2016",
      "toDate": "30/08/2016",
      "times": [
      {
        "fromTime": "09:00",
        "toTime": "12:00"
      },
      {
        "fromTime": "14:00",
        "toTime": "16:00"
      }
      ]
    },
    {
      "fromDate": "09/09/2016",
      "toDate": "13/09/2016",
      "times": [
      {
        "fromTime": "08:30",
        "toTime": "10:30"
      },
      {
        "fromTime": "15:00",
        "toTime": "18:00"
      }
      ]
    },

    {
      "fromDate": "23/10/2016",
      "toDate": "27/10/2016",
      "times": [
      {
        "fromTime": "10:00",
        "toTime": "13:00"
      },
      {
        "fromTime": "16:00",
        "toTime": "18:00"

      }
      ]
    },
    {
      "fromDate": "10/11/2016",
      "toDate": "15/11/2016",
      "times": [
      {
        "fromTime": "09:30",
        "toTime": "12:30"
      },
      {
        "fromTime": "14:00",
        "toTime": "17:00"
      }
      ]
    }
    ]
  }));
});


app.get('/doctorsAvailable',function(req,res){
	res.writeHead(200,{'Content-Type':'application/json'});
	res.end(JSON.stringify({
    "doctorsDetails": [
    {
      "Name": "Dr X",
      "Qualification": "MBBS,MD,GYN,DGO,FICOG",
      "location": [
      {
        "Location1": "Kondapur",
        "Date1": {
          "fromDate": "26/08/2016",
          "toDate": "30/08/2016"
        },
        "Time1": {
          "fromTime": "09:00",
          "toTime": "12:00"
        }
      }
      ]
    },
    {
      "Location2": "Gachibowli",
      "Date2": {
        "fromDate": "09/09/2016",
        "toDate": "13/09/2016"
      },
      "Time2": {
        "fromTime": "15:00",
        "toTime": "18:00"
      }
    }
    ]
  }));
});

app.get('/patientCreate',function(req,res){
	res.writeHead(200,{'Content-Type':'application/json'});
	res.end(JSON.stringify({
    "patientId":"ABCD1234",
    "fullName":"Bill Gates",
    "gender":"male",
    "age":"35",
    "email":"billgates@microsoft.com",
    "mobile":"8179343535"
  }));
});

app.get('/appointmentCreate',function(req,res){
	res.writeHead(200,{'Content-Type':'application/json'});
	res.end(JSON.stringify({
    "location": "Kondapur",
    "doctorName":"Dr SubbaRao",
    "appointmentType": "New Consultation",
    "appointmentDate": "26-08-2016",
    "appointmentTime":"14:00",
    "patientName":"Bill Gates",
    "patientId":"ABCD1234",
    "mobile":"8179343535",
    "age":"30",
    "gender":"male",
    "department":"Cardiology"
  }));
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
