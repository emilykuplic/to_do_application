console.log( 'js' );
var doneTask = false;
var doneTaskId;

$( document ).ready( function(){
  console.log( 'JQ' );

getTasks();

  $( '#submitTask' ).on( 'click', function(){
      console.log( 'in submitTask on click' );
      // create object out of user input
      var sendTask = {};
        sendTask.task = $('#task').val();

      // call saveTask with the new obejct
      getTasks();
      saveTask(sendTask);

    }); //end addButton on click

    // Function called when delete button is clicked
    $('#updateTasks').on('click', '.deleteBtn', function(){
      // We attached the bookid as data on our button
      var taskId = $(this).data('taskid');
      console.log($(this));
      console.log('Delete task with id of', taskId);
      deleteTask(taskId);
    });

    // Function called when complete button is clicked
    $('#updateTasks').on('click', '.completeBtn', function(){
      console.log('completed button clicked');
      var taskId = $(this).data('completetask');
      console.log($(this));
      console.log('Delete task with id of', completetask);
      updateTask(completetask);
    });


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


// UPDATE a.k.a. PUT
function updateTask(completeTask) {
  console.log('In updateTask', completeTask);
  // YOUR AJAX CODE HERE
  $.ajax({
    type: 'PUT',
    url: '/todo',
    data: completeTask,
    success: function(data){
    console.log('Completed Task:', data);
    }
});
}

// DELETE
function deleteTask(taskId) {
  // When using URL params, your url would be...
  // YOUR AJAX CODE HERE
  $.ajax({
    type: 'DELETE',
    url: '/todo/' + taskId,
    success: function(response) {
      console.log(response);
      getTasks();
}
});

}

// Append array of tasks to the DOM
function appendToDom(task){
  $('#updateTasks').empty();
  for(var i = 0; i < task.length; i += 1) {
    var tasks = task[i];
    console.log(task[i]);
    // For each task, append a new row to our table
    $tr = $('<tr></tr>');
    $tr.data('task', task);
    $tr.append('<td>' + tasks.task + '</td>');
    $tr.append('<td><button class="completeBtn" data-completetask="' + tasks.id + '">Task Complete</button></td>');
    $tr.append('<td><button class="deleteBtn" data-taskid="' + tasks.id + '">Delete</button></td>');

    $('#updateTasks').append($tr);
}
}
