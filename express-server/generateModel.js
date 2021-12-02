var lda = require('./lda/lib/lda');
const fs = require('fs');
var dataJson = require('./dataset.json');


const sw = require('stopword');
var prediction_lda = require('./lda/lib/prediction_lda');

const newData = {};

const createNewModels = () => {
    // Remove stop words
    var fileName = "";
    Object.keys(dataJson).map(r => {
        newData[r] = dataJson[r].map(k => {
            const oldString = k.split(' ');
            const newString = sw.removeStopwords(oldString);
            return newString.join(' ');
        });
    })


    // Create new models
    Object.keys(newData).map(r => {
        function createNewModel(sentences, name) {
            //// Run LDA to get terms for 1 topics (5 terms each).
            var lda_model = lda('direct', sentences, 2, 5, ['th']);
            fileName = `${name}-${Date.now()}.json`;
            fs.writeFileSync(fileName, JSON.stringify(lda_model));
        }
        createNewModel(newData[r], r);
    });
    return fileName;
}

const predict = function(fileName, sentence) {
    var lda_model = JSON.parse(fs.readFileSync(fileName, 'utf8'))
    var sampling_lda = prediction_lda(lda_model.topicModel, [sentence], ['th']);
    console.log(Object.keys(sampling_lda), 'sampling_lda')
    fs.writeFileSync("predition.json", JSON.stringify(sampling_lda));
}

const newModel = createNewModels();
predict(newModel, 'Debited from account');