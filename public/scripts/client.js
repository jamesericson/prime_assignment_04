
$(document).ready(function(){
  console.log('JS & JQ');
  init();
});

function init(){
  updateList();
  $('#add-item-button').on('click', addItem);
  $(document).keypress(function(e){if(e.which == 13){addItem();} });
  $(document).on('click', '.completed-button', selectComplete);
} // end init()

function addItem(){
  console.log('add Item');
  $.ajax({
    type: 'POST',
    url: '/newItem',
    data: send = {
        newItem: $('#add-item').val()
      },
    success: (function(response){
      console.log('back from server', response);
      updateList();
    }),
    error: (function(err){
      console.log(err);
    })
  });//end ajax
  $('#add-item').val('');

} //end addItem()

function updateList(){
  $.ajax({
    type: 'GET',
    url: '/getList',
    success: (function(response){
      console.log('back from server', response);
      var outputText = '<table>'
      // <tr><td></td><td>check complete</td><td>delete</td></tr>
      for (var i = 0; i < response.length; i++) {
        outputText += '<tr><td>'+ response[i].item +'</td><td class="completed-button" >complete?</td><td>delete</td></tr>';
      }
      outputText += '</table>';
      $('#todoList').html(outputText);
    }),
    error: (function(err){
      console.log(err);
    })
  });//end ajax
} //end updateList()

function selectComplete(){
  console.log('in selectComplete');
  $(this).parent().addClass('completed');
} // end selectComplete()
