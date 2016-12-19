
$(document).ready(function(){
  console.log('JS & JQ');
  init();
});

function init(){
  $('.edit-input').hide();
  updateList();

  $('#add-item-button').on('click', addItem);
  $(document).keypress(function(e){if(e.which == 13){enter();} });

  $(document).on('click', '.ensureDelete', deleteItem);
  $(document).on('click', '.rank-button', selectRanking);
  $(document).on('click', '.editIcon', displayEdit);

  $(document).on('click', '.completed-button', changeComplete);
  $(document).on('click', '.delete-button', askDelete)
} // end init()

function displayEdit() {
  $('.edit-input').slideDown();
  $('#edit-item').attr('data', $(this).parent().parent().attr('data') );
  $('#edit-item').val($(this).parent().text() );
} // displayEdit()

function editItem() {
  console.log('this should be tableID', $('#edit-item').attr('data') );
  console.log('in editItem', $('#edit-item').val() );

  $.ajax({
    type: 'POST',
    url: '/editItem',
    data: send = {
        id: $('#edit-item').attr('data'),
        item:  $('#edit-item').val()
      },
    success: (function(response){
      console.log('back from server', response);
      updateList();
    }),
    error: (function(err){
      console.log(err);
    })
  });//end ajax
  $('#edit-item').val('');

}// end editItem()

function enter(){
  var addVal = $('#add-item').val();
  var editVal =  $('#edit-item').val();

  console.log("ENTER: edit-item = '" + editVal + "' and add-item = '" + addVal + "'");

  if (addVal !== ''){
    addItem()
  } else if (editVal !== ''){
    editItem();
    $('.edit-input').slideUp();
  } else {
    return;
  }// end if else

} // end enter()

function selectRanking() {
  console.log('in selectRanking, here:', $(this).parent().parent().attr('data') );
  $.ajax({
    type: 'POST',
    url: '/changeRank',
    data: send = {
        id: $(this).parent().parent().attr('data')
      },
    success: (function(response){
      console.log('back from server', response);
      updateList();
    }),
    error: (function(err){
      console.log(err);
    })
  });//end ajax

}// end selectRanking()

function addItem(){
  console.log('add Item');if( $('#add-item').val() == ''){console.log('nothing there');return;}

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
      for (var i = 0; i < response.length; i++) {
        outputText += '<tr data=' + response[i].id + ' ><td class=" completed-button ';
        if (response[i].completed){outputText += ' completed"';} else { outputText += ' toComplete"';}
        outputText += ' ></td><td class="item" ><div class="editIcon"></div>'+ response[i].item +'<div class="rank-button ranking'+ response[i].importance +'"></div></td><td class="ensureDelete">[ Delete? ]</td><td class="delete-button delete" ></td></tr>';
      }
      outputText += '</table>';
      $('#todoList').html(outputText);
        $('.ensureDelete').hide();
    }),
    error: (function(err){
      console.log(err);
    })
  });//end ajax
} //end updateList()

function changeComplete(){
  console.log('in changeComplete');

  $.ajax({
    type: 'POST',
    url: '/updateStatus',
    data: send = {
        id: $(this).parent().attr('data')
      },
    success: (function(response){
      console.log('back from server', response);
      updateList();
    }),
    error: (function(err){
      console.log(err);
    })
  });//end ajax
} // end selectComplete()

function askDelete(){
  console.log('in askDelete an item');
  address = this;
  $('.delete').removeClass('delete-button');
  $(this).parent().find('.ensureDelete').slideToggle();
  // $(this).text('Are you sure?');

  $(document).one('click', function(){
    $('.delete').addClass('delete-button')
    $(address).parent().find('.ensureDelete').slideToggle();
  }); //end one click
}// end askDelete()

function deleteItem(){
  console.log('in deleteItem');
  $.ajax({
    type: 'POST',
    url: '/delete',
    data: send = {
        id: $(this).parent().attr('data')
      },
    success: (function(response){
      console.log('back from server', response);
      updateList();
    }),
    error: (function(err){
      console.log(err);
    })
  });//end ajax

} // end deleteItem()
