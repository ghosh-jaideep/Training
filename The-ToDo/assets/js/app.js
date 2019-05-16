let TodoCollection = []
$(document).ready(() => {
    // Fetch tasks from API, and Render them in List-view when document is ready
    fetchTasks()
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
 * For updating the task status.
 * @param {event} e 
 */
let updateStatus = (e) => {
    console.log("Updating Status")
}
