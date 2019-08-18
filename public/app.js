$.getJSON("/articles", function(data) {  
  for (var i = 0; i < data.length; i++) {
    $("#articles").append("<div class='card m-4' style='width: 18rem;'><div class='card-body d-flex flex-column'><p><b>" + data[i].title + "</b></p><a target='_blank'href="+ data[i].link +" class='mt-auto'><button type='button' class='btn btn-success w-100'>Link to sourse</button></a><button data-id='" + data[i]._id + "' type='button' class='btn btn-primary mt-1 w-100' data-toggle='modal' id='note_button' data-target='#exampleModal'>Make a Note</button></div></div>");
  }
});

$(document).on("click", "#note_button", function() {  
  $("#notes").empty();
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    .then(function(data) {
      console.log(data);
      $("#notes").append("<h3>" + data.title + "</h3>");
      $("#notes").append("<input id='titleinput' name='title' >");
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      $("#notes").append("<button type='button' class='btn btn-primary' data-id='" + data._id + "' id='savenote'>Save Note</button>");
      
      if (data.note) {
        // console.log(data.note);
        $("#titleinput").val(data.note.title);
        $("#bodyinput").val(data.note.body);
      }
    });
});


$(document).on("click", "#savenote", function() {
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: { 
      title: $("#titleinput").val(),
      body: $("#bodyinput").val()
    }
  })
    .then(function(data) {
      console.log(data);
      $("#notes").empty();
      $("#notes").append("<h2 class='text-center'>Note saved</h2>");
    });
  $("#titleinput").val("");
  $("#bodyinput").val("");
});