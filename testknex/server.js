
var express = require('express');
var app = express();
const PORT = process.env.PORT || 3001;
const knex = require('./knex/knex.js');


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


///////////////select all//////////////////
app.get('/papers', (req, res) => {
  knex.select().table('papers')
    .then(function (collection) {
      res.json({
        error: "get Data successfully",
        data: collection
      })


    })
    .catch(function (err) {
      res.status(500).json({
        error: true,
        data: {
          message: err.message
        }
      })

    })

});

////////////////select with id //////////////
app.get('/papers/:id', (req, res) => {
  let id = parseInt(req.params.id);
  knex.select().table('papers').where('id', id)
    .then(function (collection) {
      res.json({
        error: "get Data successfully",
        data: collection
      })

        .catch(function (err) {
          res.status(500).json({
            error: true,
            data: {
              message: err.message
            }
          })

        })
    });
});

/////////////////////////update/////////////////
app.put('/papers/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let title = req.body.title;
  let author = req.body.author;
  knex('papers').where('id', id)
    .update({
      title: title,
      author: author
    })
    .then(function () {
      res.json({
        error: "Data updated successfully",
      })

        .catch(function (err) {
          res.status(500).json({
            error: true,
            data: {
              message: err.message
            }
          })

        })
    });
});


//////////////////////////////insert///////
app.post('/papers', (req, res) => {

  knex('papers').insert({
    title: req.body.title,
    author: req.body.author
  })
    .then(function () {
      res.json({
        error: "Data inserted successfully"
      })

        .catch(function (err) {
          res.status(500).json({
            error: true,
            data: {
              message: err.message
            }
          })

        })
    });
});



///////////////////delete//////////////////////
app.delete('/papers/:id', (req, res) => {
  let id = parseInt(req.params.id);

  knex('papers').where('id', id)
    .delete()
    .then(function () {
      res.json({
        error: "Data Deleted successfully"
      })

        .catch(function (err) {
          res.status(500).json({
            error: true,
            data: {
              message: err.message
            }
          })

        })
    });
});




///////////////////////////\\\\\\\\\\\complexe query \\\\\\\\\\\\\\\\//////////////////////////////
app.get('/orderby', (req, res) => {
  knex('papers').join('footnotes', 'papers.id', '=', 'footnotes.paper_id')
    .select('papers.id', 'footnotes.note').where('note', 'like', '%ll%')
    .orderBy('id')
    .then(function (collection) {
      res.json({
        error: false,
        data: collection
      })

        .catch(function (err) {
          res.status(500).json({
            error: true,
            data: {
              message: err.message
            }
          })

        })
    });
});


app.get('/between', (req, res) => {
  knex('papers').join('footnotes', 'papers.id', '=', 'footnotes.paper_id')
  .select('id', 'note').whereBetween('paper_id', [20, 25])
    .orderBy('id')     
    .then(function (collection) {
      res.json({
        error: false,
        data: collection
      })

        .catch(function (err) {
          res.status(500).json({
            error: true,
            data: {
              message: err.message
            }
          })

        })
    });
});

//////////////////////multiple////////////////////////////


app.get('/multiple', (req, res) => {
  knex('papers').join('footnotes', 'papers.id', '=', 'footnotes.paper_id').select('papers.id', 'title')
    .groupBy('papers.id').having(knex.raw('count(*)>3'))
    .then(function (collection) {
      res.json({
        error: "get Data successfully",
        data: collection
      })

        .catch(function (err) {
          res.status(500).json({
            error: true,
            data: {
              message: err.message
            }
          })

        })
    });
});


//////////////////////////////
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
