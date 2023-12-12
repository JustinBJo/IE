var express = require('express');
var router = express.Router();
var database = require('../database');

router.get("/", function(request, response, next){
  const query = `SELECT * FROM current_topic`;
  
  database.query(query, function(error, data) {
    if (error) {
      throw error;
    }
    else {
      response.render("index", {title:data[0].current_topic_text, action:'main'})
    }
  });
});

router.get("/comment", function(request, response, next) {
  const query = `SELECT * FROM current_topic`;
  
  database.query(query, function(error, data) {
    if (error) {
      throw error;
    }
    else {
      response.render("index", {title:data[0].current_topic_text, action:'comment'})
    }
  });
});

router.post("/comment", function(request, response, next) {
  var comment = request.body.comment;
  
  if (!comment.trim()) {
    return response.send('<script>alert("Please type something."); window.history.back();</script>');
  }

  if (comment.length > 500) {
    return response.send(`<script>alert("Please write below the limit (500 characters). You wrote ${comment.length} characters."); window.history.back();</script>`);
  }

  var query = `SELECT * FROM current_topic`;
  
  database.query(query, function(error, data) {
    if (error) {
      throw error;
    }
    else {
      query = `INSERT INTO comments_waiting (topic_no, comment_waiting_text) VALUES (?, ?)`;
      database.query(query, [data[0].current_topic_no, comment], function(error, data) {
        if (error) {
          throw error;
        } 
        else {
          response.render("index", {action: "thanks"});
        }
      });
    }
  });
});


module.exports = router;
