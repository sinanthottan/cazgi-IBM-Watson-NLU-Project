const express = require('express');
const app = new express();
const dotenv = require('dotenv');
dotenv.config();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

function getNLUInstance(){
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: '2021-03-25',
  authenticator: new IamAuthenticator({
    apikey: api_key,
  }),
  serviceUrl: api_url,
});

   return naturalLanguageUnderstanding;
}

function textEmotion(textParam,res) {
    let nluInstance = getNLUInstance();

    const analyzeParams = {
        'text': textParam,
            'features': {
                'emotion': {
                
                }
            }
    };
    
    nluInstance.analyze(analyzeParams)
        .then(analysisResults => {
            res.send(JSON.stringify(analysisResults.result.emotion.document.emotion));
         })
        .catch(err => {
            console.log(err.toString());
        });
}

function textSentiment(textParam,res) {
    let nluInstance = getNLUInstance();

    const analyzeParams = {
        'text': textParam,
            'features': {
                'sentiment': {
                
                }
            }
    };
    
    nluInstance.analyze(analyzeParams)
        .then(analysisResults => {
            res.send(JSON.stringify(analysisResults.result.sentiment.document.label));
         })
        .catch(err => {
            console.log(err.toString());
        });
}
function urlEmotion(urlParam,res) {
    let nluInstance = getNLUInstance();

    const analyzeParams = {
        'url': urlParam,
            'features': {
                'emotion': {
                
                }
            }
    };
    
    nluInstance.analyze(analyzeParams)
        .then(analysisResults => {
            res.send(JSON.stringify(analysisResults.result.emotion.document.emotion));
         })
        .catch(err => {
            console.log(err.toString());
        });
}

function urlSentiment(urlParam,res) {
    let nluInstance = getNLUInstance();

    const analyzeParams = {
        'url': urlParam,
            'features': {
                'sentiment': {
                
                }
            }
    };
    
    nluInstance.analyze(analyzeParams)
        .then(analysisResults => {
            res.send(JSON.stringify(analysisResults.result.sentiment.document.label));
         })
        .catch(err => {
            console.log(err.toString());
        });
}
app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {

    let urlParam = req.query.url;
    urlEmotion(urlParam,res);
});

app.get("/url/sentiment", (req,res) => {
    let urlParam = req.query.url;
    urlSentiment(urlParam,res);
});

app.get("/text/emotion", (req,res) => {
    let textParam = req.query.text;
    textEmotion(textParam,res);
});

app.get("/text/sentiment", (req,res) => {
    let textParam = req.query.text;
    textSentiment(textParam,res);
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

