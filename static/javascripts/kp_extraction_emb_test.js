function submit(input_text, number_keyphrases) {
	$("#last_group").append('<i class="fa fa-spinner fa-spin" id="spinner"></i>');
	$('#input_text').val('');
	url = "http://52.30.254.33:1277/api/kp";
	data = {'inp_url' : input_text,
	  'nbkp' : number_keyphrases
	  };
$.ajax({
  url: "http://52.30.254.33:1277/api/kp",
  type: "POST",
  contentType: 'application/json',
  dataType :"json",
  data: JSON.stringify(data),
  success: function(data) {
        //Process the JSON
        $("#spinner").remove();
        var Itemlist = document.getElementById("list-group");

        //Loop trough the JSON
        data.api_result.forEach(function(element) {
        element.relevance *= 100;
        var getProcent= element.relevance ;
        Itemlist.insertAdjacentHTML( 'beforeend',"<li data-time='"+getProcent+"' class='list-group-item' style='background : linear-gradient(90deg, #c6e3fd "+getProcent+"%, #FFFFFF 0%); text-shadow: none'>"+ "  " +"<b>"+element.label +"</b>"+ " </li>"); 
        if(element.aliases.length > 0){
            for(var i = 0; i < element.aliases.length; i++){
            getProcent -=0.000001;
            Itemlist.insertAdjacentHTML( 'beforeend',"<li data-time='"+getProcent+"' class='list-group-item' style='background : linear-gradient(90deg, #daedfd "+getProcent+"%, #FFFFFF 0%); text-shadow: none'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+element.aliases[i]+"</li>");
            }
        };
    });
    
    //Process text
    var textlist = document.getElementById("html_doc");
    var processed_text = data.processed_text;
    processed_text = processed_text.replace(/(\r\n\t|\n|\r\t)/gm, '</div><div class=start></br>');
    textlist.insertAdjacentHTML('beforeend',"<div class='start'>"+processed_text); 
    textlist.innerHTML = textlist.innerHTML.replace(/<phrase>/g, '<span class=kp>') .replace(/<\/phrase>/g, '</span>');
    textlist.style.paddingLeft = '10px';

    //Sort <li> elements
    var listitems = $('.list-group-item');
    listitems.sort(function(a, b){
    return +$(b).data('time') - +$(a).data('time');
  }); 
    listitems.appendTo('#list-group');

    //hide scrollbar
    var doc_height = $('#html_doc').height();
    var group_height = $('#list-group').height();

    if(doc_height < 700){
      document.getElementById("html_doc").style.overflowY = "hidden";
    }
    if(group_height < 700){
      document.getElementById("list-group").style.overflowY = "hidden";
    }
    if(group_height > doc_height){
      doc_height = group_height;
      document.getElementById("html_doc").style.height = group_height+'px';
    }
  },
  error : function(jqXHR, textStatus, errorThrown) {
  },
  timeout: 120000,
  });
}

  $(document).ready(function(){

    $('#input_text').keyup(function(e){
        if(e.keyCode == 13) {
            input_text = $('#input_text').val();
            number_keyphrases = $('#nbkp').val();
            if (input_text != '') submit(input_text, number_keyphrases);
        }
    });

    $('#search_button').click(function(e){
        input_text = $('#input_text').val();
        number_keyphrases = $('#nbkp').val();
        if (input_text != '') submit(input_text, number_keyphrases);
    })
  });