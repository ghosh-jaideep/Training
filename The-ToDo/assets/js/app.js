let TodoCollection = []
$(document).ready(() => {
    // Fetch tasks from API, and Render them in List-view when document is ready
    fetchTasks()
    //Manage Form submit for adding new task.
    $("#todoForm").submit(( e )=>{
        e.preventDefault()
        let item = $("#item").val();
        if(item){
            addTask(item)
        }else{
            alert("Enter task caption.")
        }
    });
    // Trigger the Delete function whenever the delete button is cicked.
    $(document).on("click", ".btn-dlt" , (e) => {
        let id = $(e.target).attr("value");
        deleteData(id)
    })
})

/**
 * It returns the template for single row of list
 * @param {string} caption 
 * @param {integer} i 
 * @param {boolean} isCompleted 
 */
let listTemplate = (caption, i, isCompleted) => {
    if(isCompleted=="0" || isCompleted===0)
        return $('<li/>',{'class':'list-group-item'}).append(
            $('<div/>',{'class':'float-left'}).append(
                $('<div/>',{'class':'round'}).append(
                    $('<input/>',{'type':'checkbox', 'id':'item'+i, change:updateStatus, 'value':i})
                ).append(
                    $('<label/>',{'for':'item'+i})
                )
            )
        ).append(
            $('<div/>',{'class':'todo-item', text:caption, 'data-id':i})
        ).append(
            $('<div/>',{'class':'float-right'}).append(
                $('<button/>',{'class':'btn btn-light btn-dlt', 'value':i}).append(
                    $('<i/>',{'class':'fa fa-trash'})
                )
            )
        )
    else
        return $('<li/>',{'class':'list-group-item'}).append(
            $('<div/>',{'class':'float-left'}).append(
                $('<div/>',{'class':'round'}).append(
                    $('<input/>',{'type':'checkbox', 'id':'item'+i, click:updateStatus, 'checked':'checked', 'value':i})
                ).append(
                    $('<label/>',{'for':'item'+i})
                )
            )
        ).append(
            $('<div/>',{'class':'todo-item'}).append(
                $('<strike/>',{text:caption})
            )
        ).append(
            $('<div/>',{'class':'float-right'}).append(
                $('<button/>',{'class':'btn btn-light btn-dlt'}).append(
                    $('<i/>',{'class':'fa fa-trash'})
                )
            )
        )
}

/**
 * Renders the todo tasks on UI.
 * @param todoCollection
 */
let render = (TodoCollection) => {
    $('#taskList').empty();
    TodoCollection.forEach((value, index)=>{
        $("#taskList").append(listTemplate(value.caption, value.id, value.isCompleted));
    })
}

/**
 * Fetch all the Todo Tasks from API.
 * @return mixed
 */
function fetchTasks(){
    //Get data from API
    let response = $.get("api.php?method=get",(response, status)=>{
        if(response.status==true){
            let tasks = response.data
            tasks.forEach((value,index)=>{
                TodoCollection[value.id]=value
            });
            render(TodoCollection)
        }
    })
}

/**
 * To add Task in the list.
 * @param {string} caption 
 * @return null
 */
let addTask = (caption) => {
    $.get("api.php?method=save&item="+caption, (response, status) => {
            if(response.status==true){
                alert("Task added.");
                $('#item').val("");
                TodoCollection.push({
                    "id":  TodoCollection.length,
                    "caption" :  caption,
                    "isCompleted" :  false
                })
                $("#taskList").append(listTemplate(caption, TodoCollection.length, false));
            }else{
                alert(response.message);
            }
    });
}

/**
 * For deleting the task from record.
 * @param {integer} id 
 */
let deleteData = (id) => {
    $.get("api.php?method=delete&id="+id, (response, status) => {
            // let response = JSON.parse(data);
            if(response.status==true){
                alert(response.message);
                TodoCollection = TodoCollection.filter((elem) => {
                    return elem.id != id; 
                });
                render(TodoCollection)
            }else{
                alert(response.message);
            }
    });
}

/**
 * For updating the task status.
 * @param {event} e 
 */
let updateStatus = (e) => {
    if(e.currentTarget.checked == true){
        TodoCollection[e.currentTarget.value].isCompleted = true
    }else{
        TodoCollection[e.currentTarget.value].isCompleted = false
    }
    let taskId = e.currentTarget.value
    updateTask(taskId)
    $(e.target).closest(".list-group-item").replaceWith(listTemplate(TodoCollection[taskId].caption, taskId, TodoCollection[taskId].isCompleted));
}

/**
 * For updating the task.
 * @param {integer} id 
 */
let updateTask = (id) => {
    $.post(
        "api.php?method=update&id="+id,
        { data: TodoCollection[id] },
        (response, status)=>{
            if(response.status==true){
                console.log("Task Updated.");
            }else{
                alert(response.message);
            }
    });
    // render(TodoCollection)
}

/**
 * For sorting the TodoCollection
 * @param {string|bool} type
 * @return null 
 */
let sortTask = (type) => {
    if(type=="all")
        sortedTask = TodoCollection
    else{
        sortedTask = TodoCollection.filter((elem) => {
            return type === elem.isCompleted; 
        });
    }
    render(sortedTask)
}