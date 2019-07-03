//global Variables
var gl_items = ['Ganapati','Fire works','Stars','Programming','Peacocks','Flamingo','Flowers','Butterfly'];
var gl_rows = 3;
var gl_searchfor = [];
var gl_rating = "G";


//Main Programming
dynamicadd();

//dynamically add form input elements for the array
function dynamicadd()
{
        for ( var i =0; i < gl_items.length ; i++)
        {
          var  additem = (`<input id = "${i}option"
          class = "optionvalue" name ="name${i}"
          type = "checkbox"
          value = "${gl_items[i]}" > ${gl_items[i]}<br />`);
          $("#First-form").append(additem);
          console.log("value is");
        }
}
//Add Search text to the form elements
$("#getit").on("click",function(event){
           event.preventDefault() ;
           var inputtext = $("#search").val().trim();
           console.log("the input text is"+inputtext)
           var l = gl_items.length ;
           gl_items[l]= inputtext;
           var  additem = (`<input id = "${l}option"
           class = "optionvalue" name ="name${l}"
           type = "checkbox"
           value = "${gl_items[l]}" > ${gl_items[l]}<br />`);
           $("#First-form").append(additem);
           $("#search").val("") ;
});

//Clear all selections
$("#reset").on("click",function(){
        for ( var i =0 ; i< gl_items.length; i++)
        {
          $(`#${i}option`).attr("checked",false);
        }
        $("#vfiles").html(' ');
});

//Capture Rating value to global variable
$("#rating").on("change",function(){
       gl_rating = this.value;
});

// adding the search string
$("#First-form").on("click","input",function()
{
    //var removestr =[] ;
    //console.log('deletestr before if checking is :'+removestr); //this does not get printed
       var yesno = this.checked ;
     console.log("yesno :",yesno);
     if (yesno)
     {
           console.log("yesno in if part:",yesno);
           gl_searchfor = this.value ;
           console.log('search str',gl_searchfor);
           callapigifvid(gl_searchfor);
     }
     else {
          var removestr = this.value ;
          console.log("deletestr is :"+removestr); // this statement is ignored
          console.log("yesno in else part :",yesno);
          $(`.${removestr}`).remove();
     }

});

function callapigifvid(searchstr)
{
      //Api call
          var querstr1 = "https://api.giphy.com/v1/gifs/search?api_key=01f8ebd24dd04b98b407dd4b30d3443e" ;
          var noofgifs = gl_rows;
          var var_rating = gl_rating;
            var querstr2 = "&q="+ searchstr +"&limit="+noofgifs+"&offset=0&rating="+gl_rating+"&lang=en";
            var queryURL = querstr1 + querstr2 ;
            console.log(querstr1+querstr2);
            var category = searchstr;
            $.ajax({
              url : queryURL ,
              method: "GET"
            }).then(function(response){
              console.log(response);
              var img_array = response.data;
              var len = img_array.length;

              console.log('length',len);
              console.log('res data',response.data);
              for( var i =0; i < len ; i++)
              {
                var in1 = img_array[i].images.fixed_height.url ;
                var in2 = img_array[i].images.fixed_height_still.url ;
                var ifrele = $("<img>");
              //  ifrele.addClass(".videos");
                ifrele.addClass(`${searchstr}`);
                ifrele.attr("video-file",in1);
                ifrele.attr("image-file",in2);
                ifrele.attr("status","movie");
                ifrele.attr("src",in1);
                ifrele.attr("category",category);
                $("#vfiles").prepend(ifrele);
              } //end of for
            }).catch(function(errmsg){
              console.log('Encountered Error: ',errmsg);
            });//end of ajax response
}

$("#vfiles").on("click","img",function(event)
{
          event.preventDefault();
           console.log('inside click');
           var state = $(this).attr('status');
          if ( state === 'pic')
          {
            var change = $(this).attr('video-file');
            $(this).attr('src',change);
            $(this).attr('status','movie');
          }
          else if (state === 'movie')
          {
            var change = $(this).attr('image-file');
            $(this).attr('src',change);
            $(this).attr('status','pic');
          }
});
$("#Second-form").on("click","input",function(event){
          //event.preventDefault();
          gl_rows = this.value ;
});


//Not used
function callapi(searchstr)
{
      //Api call
          var querstr1 = "https://api.giphy.com/v1/gifs/search?api_key=01f8ebd24dd04b98b407dd4b30d3443e" ;
            var querstr2 = "&q="+ searchstr +"&limit=5&offset=0&rating=G&lang=en";
            //var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=01f8ebd24dd04b98b407dd4b30d3443e&q=stars&limit=25&offset=0&rating=G&lang=en";
            var queryURL = querstr1 + querstr2 ;
            console.log(querstr1+querstr2);
            $("#vfiles").html("");

            $.ajax({
              url : queryURL ,
              method: "GET"
            }).done(function(response){
              console.log(response);
              var img_array = response.data;
              var len = img_array.length;

              console.log('length',len);
              console.log('res data',response.data);
              for( var i =0; i < len ; i++)
              {
                var in1 = img_array[i].images.fixed_height.url ;
                var in2 = img_array[i].images.fixed_height_still.url ;
                var ifrele = $("<iframe>");
                ifrele.addClass(".videos");
                ifrele.attr("video-file",in1);
                ifrele.attr("image-file",in2);
                ifrele.attr("status","movie");
                ifrele.attr("src",in1);
                $("#vidfiles").append(ifrele);
              } //end of for
            }).error(function(errmsg){
              console.log('Encountered Error: ',errmsg);
            });//end of ajax response
}