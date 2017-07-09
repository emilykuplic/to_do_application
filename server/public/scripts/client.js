console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );

  $( '#submitTask' ).on( 'click', function(){
      console.log( 'in submitTask on click' );
      // create object out of user input
      var sendTask = {};
        sendTask.task = $('#task').val();

      // call saveTask with the new obejct
      saveTask(sendTask);
    }); //end addButton on click
});

function saveTask( newTask){
  console.log( 'in saveTask', newTask );
  // ajax call to server to get koalas
  $.ajax({
    url: '/todo',
    type: 'POST',
    data: newTask,
    success: function(data){
      console.log( 'A new to do: ', data);
    } // end success
  }); //end ajax
}
