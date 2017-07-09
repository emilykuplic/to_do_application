console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );

getTasks();

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

function getTasks(){
  console.log( 'in getTasks' );
  // ajax call to server to get tasks
  $.ajax({
    url: '/todo',
    type: 'GET',
    //sending back an object with an array of objects (tasks)
    success: function(data){
      console.log( 'Tasks: ', data );
      var task = data.task; // Array of task
      appendToDom(task);
    } // end success
  }); //end ajax
  // display on DOM with buttons that allow edit of each
} // end getTasks

// Append array of tasks to the DOM
function appendToDom(task){
  $('#viewTasks').empty();
  for(var i = 0; i < task.length; i += 1) {
    var tasks = task[i];
    console.log(task[i]);
    // For each task, append a new row to our table
    $tr = $('<tr></tr>');
    $tr.data('task', task);
    $tr.append('<td>' + tasks.task + '</td>');
    $('#viewTasks').append($tr);
}
}
