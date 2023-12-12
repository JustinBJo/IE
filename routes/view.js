var express = require('express');
var router = express.Router();
var database = require('../database');

router.get("/", function(request, response, next){

  const query1 = `SELECT * FROM current_topic`;

  database.query(query1, function(error, data) {
    if (error) {
      throw error;
    }
    else {
      const topic_no = data[0].current_topic_no;
      const topic_text = data[0].current_topic_text;

      const query2 = `SELECT * FROM comments WHERE topic_no = "${topic_no}"`;

      database.query(query2, function(error, data2) {
        if (error) {
          throw error;
        }
        else {
          var comment = "There are no responses yet! Please come back after a while."
          if (data2.length > 0) {
            var idx = Math.floor(Math.random() * data2.length)
            console.log(idx);
            comment = data2[idx].comment_text;
          }

          response.render("view", {topic:topic_text, comment:comment});
        }
      });
    }
  });

});

module.exports = router;
