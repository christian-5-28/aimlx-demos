var image = document.getElementById("evolution"),
    button = document.getElementById("run");

if (image.classList && image && button) {
    button.onclick = function() {
        //console.log('INSIDEEEEE')
        if (this.value == "pause") {

            gif = document.getElementById("evolution")
            var src = gif.src;
            gif.src = src.replace(/\.png$/i, ".gif");

            this.value = 'play';
            this.innerHTML = 'Stop';
            console.log(this.innerHTML)
        }

        else {
            gif = document.getElementById("evolution")
            var src = gif.src;
            gif.src = src.replace(/\.gif$/i, ".png");
            this.value = "pause";
            this.innerHTML = 'Run Evolution';
        }
    };
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

document.addEventListener("DOMContentLoaded", function(event) {

  var data_init = {
    categories: [{
      title: "test set ppl",
      color: "turquoise"
    }],
    items: [{
      title: "LSTM",
      values: [0]
    },
    {
      title: "LSTM + skip connections",
      values: [0]
    },{
      title: "LSTM + 5 softmax experts",
      values: [0]
    },{
      title: "PSO Best cell so far",
      values: [0]
    }]
  }


  var barChart01 = new sdx.BarChartVertical(document.getElementById("barChart01"), data_init);

  document.getElementById("btnChartUpdate").addEventListener("click", function () {

    var data = {
    categories: [{
      title: "test set ppl",
      color: "turquoise"
    }],
    items: [{
      title: "LSTM",
      values: [58.8]
    },
    {
      title: "LSTM + skip connections",
      values: [58.3]
    },{
      title: "LSTM + 5 softmax experts",
      values: [57.4]
    },{
      title: "PSO Best cell so far",
      values: [58.4]
    }]
  }

    barChart01.update(data)
  });
});

/*
var static_img = ["static_8","static_s1_14","static_17","static_s2_55","static_s3_91","static_s3_2"];
var img_path = '/pso/static/pso_images/';

function new_message(message) {
    $('#upload_row').hide();
    $('#back_button').hide();
	$('#message_row').show();
	$('#spinner').show();
	$('#message').text(message);


}

function show_output(list){
    $('#upload_row').hide();
    $('#spinner').hide();
    $('#back_button').show();
    $('#message').text('Green and Blue Regions show groups and individual product detected');
    $('#suggestions_row1').hide();
    $('#suggestions_row3').hide();
    $('#suggestions_row2').show();

    $('#img_in').attr('src',img_path.concat(list[0]));
    $('#img_out1').attr('src',img_path.concat(list[1]));
    $('#img_out2').attr('src',img_path.concat(list[2]));

}


function submit(input_text,id) {


    id = static_img[parseInt(id)-1]
	new_message(input_text);
	url = "/pso/static";
    var data = {"image_list": id+'.jpg'};

	$.ajax({
	  type: "POST",
	  url: url,
	  contentType: 'application/json',
	  data: JSON.stringify(data),
	  success: function(data) {
        json = JSON.parse(data);
        console.log(json.list);
        show_output(json.list);

	  }
	});
}


function refresh() {
    $('#back_button').hide();
	$('#message_row').hide();
	$('#upload_row').show();
	$('#suggestions_row1').show();
    $('#suggestions_row3').show();
    $('#suggestions_row2').hide();
}

function upload(formData){
    new_message('Uploading and Processing Image... Get a coffee :P');

$.ajax({
       url: "/pso/upload",
       type: "POST",
       data: formData,
       processData: false,
       contentType: false,
       success: function(data) {
            json = JSON.parse(data);
            console.log(json.list);
            show_output(json.list);
       },
       error: function(jqXHR, textStatus, errorMessage) {
           console.log(errorMessage); // Optional
       }
    });
}
$(document).ready(function(){


	$('#message_row').hide();
	$('#suggestions_row2').hide();


    img_sug = '#img_sug';
    for (var i = 1; i <= 6; i++) {
        var elem = img_sug.concat(i.toString());
        $(elem).attr('src', img_path.concat('small_',static_img[i-1],'.jpg'));
        $(elem).click(function(e){
            console.log("Image clicked!!");
            var name = e.target.id;
            submit('Processing Image.. Take a breath',name.charAt(name.length-1));
        });
    }

    $('#upload_button').click(function(e){
        var input = document.getElementById('input_file')
        var formData = new FormData();
        console.log(input.files.length)
        if(input.files.length > 0 ){
            formData.append("fileToUpload", input.files[0]);
            upload(formData);
        }
    });



	$("#back_button").click(function(){
		refresh();
	})


});
*/
