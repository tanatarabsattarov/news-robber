$.getJSON("/articles", function(data) {  
  for (var i = 0; i < data.length; i++) {
    $("#articles").append("<div class='card m-4' style='width: 18rem;'><div class='card-body'><p><b>" + data[i].title + "</b><br />" + data[i].link + "</p><button data-id='" + data[i]._id + "' type='button' class='btn btn-primary' data-toggle='modal' data-target='#exampleModal'>Make a Note</button></div></div>");
  }
});

$(document).on("click", "button", function() {  
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
    });
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})