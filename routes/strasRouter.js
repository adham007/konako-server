const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const cors = require('./cors');

const Strass = require('../models/strass');
const strasRouter = express.Router();
strasRouter.use(bodyParser.json());

const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/strass');
    },

    filename: (req, file, cb) => {
        cb(null, Math.random() + file.originalname)
    }
});

const imageFileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/)) {
        return cb(new Error('You can upload only image files!'), false);
    }
    cb(null, true);
};
const upload = multer({ storage: storage, fileFilter: imageFileFilter});


strasRouter.route('/upload')
.options(cors.cors, (req, res) => { res.sendStatus(200); })
.get(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /imageUpload');
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, upload.single('imageFile'), (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(req.file.filename);
});


strasRouter.route('/')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200); })
.get(cors.cors, (req, res, next) => {
    Strass.find(req.query)
    .then((stras) => {
        res.statusCode =200;
        res.setHeader('Content-Type', 'application/json');
        res.json(stras);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Strass.create(req.body)
    .then((stras) => {
        console.log('Stras created', stras);
        res.statusCode =200;
        res.setHeader('Content-Type', 'application/json');
        res.json(stras);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('Put operation not supporter on /Stras');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Strass.remove({})
    .then((resp) => {
        res.statusCode =200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});


strasRouter.route('/:strasId')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    Strass.findById(req.params.strasId)
    .then((stras) => {
        console.log('Stras created', stras);
        res.statusCode =200;
        res.setHeader('Content-Type', 'application/json');
        res.json(stras);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /Stras/'+ req.params.strasId);
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Strass.findByIdAndUpdate(req.params.strasId, {
        $set: req.body
    }, { new: true})
    .then((stras) => {
        console.log('Stras created', stras);
        res.statusCode =200;
        res.setHeader('Content-Type', 'application/json');
        res.json(stras);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Strass.findByIdAndRemove(req.params.strasId)
    .then((Stras) => {
        console.log('Stras created', Stras);
        res.statusCode =200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Stras);
    }, (err) => next(err))
    .catch((err) => next(err));
});



module.exports = strasRouter;

