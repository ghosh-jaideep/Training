let TodoCollection = []
$(document).ready(() => {
    // Fetch tasks from API, and Render them in List-view when document is ready
    fetchTasks()
    // Change the list-view to input field whenever a list item is clicked.
    $(document).on("click", ".todo-item" , (e) => {
        let id = $(e.target).data("id")
        let value = $(e.target).text()
        $(e.target).closest(".list-group-item").replaceWith(inLineEditorTemplate(value, id));
    })
    //Process the inline editor form submit
    $('#taskList').on("submit", ".editor", function(e) {
            e.preventDefault()
            let caption = e.target['caption'].value
            let id = e.target['id'].value
            if(TodoCollection[id].caption!=caption){
                TodoCollection[id].caption = caption
                updateTask(id)
            }
            // $(e.target).closest(".list-group-item").replaceWith(listTemplate(caption, id, TodoCollection[id].isCompleted));
    })

    //Manage Form submit for adding new task.
    $("#todoForm").submit(( e )=>{
        e.preventDefault()
        let item = $("#item").val();
        if(item){
            addTask(item)
        }else{
            alert("Enter task caption.")
        }
    })
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
 * It returns the html form template for inline editing.
 * @param {string} caption 
 */
let inLineEditorTemplate = (caption, id) => {
    return $('<li/>',{'class':'list-group-item'}).append(
        $('<form/>',{'name':'editor', class:'editor'}).append(
            $('<input/>',{type:'text', 'class':'form-control', 'name':'caption', 'value':caption})
        ).append(
            $('<input/>',{type:'hidden', 'name':'id', 'value':id})
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
async function fetchTasks(){
    //Get data from API
    await fetch('api.php?method=get')
        .then(response => response.json())
        .then(data => {
            let tasks = data.data
            tasks.forEach((value,index)=>{
                TodoCollection[value.id]=value
            });
            render(TodoCollection)
        })
        .catch(error => console.error(error))
}

/**
 * To add Task in the list.
 * @param {string} caption 
 * @return null
 */
let addTask = async (caption) => {
    await fetch("api.php",{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({method: 'save', item: caption})
    })
    .then(response => response.json())
    .then(data => {
        let status = data.status
        if(status===true){
            alert("Task added.")
            $('#item').val("")
            fetchTasks()
            // $("#taskList").append(listTemplate(caption, TodoCollection.length, false));
        }else{
            alert(data.message)
        }
    })
    .catch(error => console.error(error))
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
    // $(e.target).closest(".list-group-item").replaceWith(listTemplate(TodoCollection[taskId].caption, taskId, TodoCollection[taskId].isCompleted));
}

/**
 * For updating the task.
 * @param {integer} id 
 */
let updateTask = async (id) => {
    await fetch("api.php",{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({method: 'update', id: id, data: TodoCollection[id]})
    })
    .then(response => response.json())
    .then(data => {
        let status = data.status
        if(status===true){
            alert("Task Updated.")
            $('#item').val("")
            fetchTasks()
        }else{
            alert(data.message)
        }
    })
    .catch(error => console.error('Error:', error));
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