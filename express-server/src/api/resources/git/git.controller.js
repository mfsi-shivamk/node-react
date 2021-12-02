var prediction_lda = require('../../../../lda/lib/prediction_lda');
var lda = require('../../../../lda/lib/lda');
const fs = require('fs');
const sw = require('stopword');

import { db } from '../../../models';



const createNewModels = ({ text, topics, terms }) => {
    // Remove stop words

    const sentences = text.map(k => {
        const oldString = k.split(' ');
        const newString = sw.removeStopwords(oldString);
        return newString.join(' ');
    });

    // Create new models
    // Run LDA to get terms for 1 topics (5 terms each).
    const d = lda('direct', sentences, topics, terms, ['th']);
    console.log(sentences.length, 'sentences')
    console.log(topics, terms, 'topics, terms,', typeof sentences)
    return d;

}

const predict = function(lda_model, sentence) {
    console.log(lda_model, sentence, 'lda_model, sentence')
    return prediction_lda(lda_model.topicModel, [sentence], ['th']);
}

export default {

    // To update git and build react and node app
    async index(req, res, next) {
        const { text, topics = 2, terms = 5, name } = req.body;
        const data = { text, topics, terms };
        const json = createNewModels(data);
        const customTopic = [];
        for (var i = 0; i < topics; i++) {
            customTopic.push("Topic " + i);
        }
        db.model.create({
            name,
            text: JSON.stringify(text),
            customTopic,
            topics,
            terms,
            json,
            userId: req.user.id
        }).then(r => {
            return res.status(200).json({ success: true, data: r })
        }).catch(e => {
            return res.status(400).json({ success: false, error: e })
        })
    },
    async list(req, res, next) {
        db.model.findAll({
            where: {
                userId: req.user.id
            },
            // attributes: ["name", "terms", "topics"]
        }).then(r => {
            return res.status(200).json({ success: true, data: r })
        }).catch(e => {
            return res.status(400).json({ success: false, error: e })
        })
    },
    async edit(req, res, next) {
        const {
            id,
            name,
            customTopic
        } = req.body;
        console.log(req.body)
        db.model.update({
            customTopic,
            name
        }, {
            where: {
                userId: req.user.id,
                id
            }
        }).then(r => {
            return res.status(200).json({ success: true, data: r })
        }).catch(e => {
            return res.status(400).json({ success: false, error: e })
        })
    },

    async predict(req, res, next) {
        const { id, sentence = "This is credit" } = req.body;
        console.log(req.body, 'sentence')
        db.model.findOne({
            where: { id, userId: req.user.id },
            attributes: ["json", "customTopic"]
        }).then(r => {
            if (r) {
                const prediction = predict(r.json, sentence);
                console.log(prediction.customTopic);
                const customTopic = (typeof r.customTopic === 'string') ? r.customTopic.split(',') : r.customTopic;
                const data = customTopic.filter((d, i) => prediction.topics.includes(i))
                return res.status(200).json({ success: true, data })
            }
            // return res.status(400).json({ success: false, error: e })

        }).catch(e => {
            console.log(e)
                // return res.status(400).json({ success: false, error: e })
        })
    }

};