let tasks = [];

const tasklist = document.getElementById('list');
const addtaskinput = document.getElementById('inputtext');
const taskcounter = document.getElementById('taskcounter');

function addtasktodom(task)
{
    const li=document.createElement('li');

    li.innerHTML=`<input type="checkbox" id="${task.id}" value= "${task.done ? "checked" : ''}"  ${task.done ? 'checked' : ''} class="listinput" >  <label for = "${task.id}" class="listlabel" id="task-${task.id}" > ${task.text}  </label>  <i data-id="${task.id}" class="fas fa-trash-alt" style="margin-left:600px;"></i> `;

    tasklist.append(li);
}

function addtasktodom1(task)
{
    const li=document.createElement('li');

    li.innerHTML=`<input type="checkbox" id="${task.id}" value= "${task.done ? "checked" : ''}" ${task.done ? 'checked' : ''} class="listinput" >  <label for = "${task.id}" class="listlabel1" id="task-${task.id}" > ${task.text}  </label>  <i data-id="${task.id}" class="fas fa-trash-alt" style="margin-left:600px;"></i> `;

    tasklist.append(li);
}


function renderlist()
{
    tasklist.innerHTML= '';

    for(let i=0; i<tasks.length; i++)
    {
        if(tasks[i].value === 'checked')
        {
            console.log("checked");
            addtasktodom1(tasks[i]);
        }
        else
        {
            console.log("not checked");
            addtasktodom(tasks[i]);
        }
    }

    taskcounter.innerHTML = tasks.length;

}


function toggletask(taskid)
{
    const task=tasks.filter(function(task)
    {
        return task.id === taskid;
    })

    if(task.length > 0)
    {
        const currenttask = task[0];
        currenttask.done = !currenttask.done;
        renderlist();
        

        // for(let i=0; i<tasks.length; i++)
        // {
        //     if(tasks[i].id === taskid)
        //     {
        //         if(tasks[i].done === true)
        //         {
                    // let elem = 'task-'+taskid
                    // let a=document.getElementById(elem);
                    // let checkboxid=document.getElementById(taskid);
                    // console.log("check",checkboxid);

                    // console.log("hello",a);

                    // if(checkboxid.checked)
                    // {
                    //     a.style.color="green";
                    //     // a.classList.remove("listlabel");
                    // }
                    // else
                    // {
                    //     a.style.color='orange';
                    //     // a.classList.add('listlabel');
                    // }

                // }
                // else
                // {
                    // let elem = 'task-'+taskid
                    // a=document.getElementById(elem);

                    // console.log("hello",a);

                    // // a.style.color='#ff9900';
                    // a.classList.add("listlabel");
                    // taskid.style.color=;

        //         }
        //         break;
        //     }
        // }
        
        shownotification("Task toggled successfully");
        return;
    }
    
    shownotification('Task could not be toggled');
}

function deletetask(taskid)
{
    const newtask=tasks.filter(function(task)
    {
        return task.id !== taskid;
    })

    tasks=newtask;
    renderlist();

    shownotification("Task deleted successfully");

}

function addtask(task)
{
    if(task)
    {
        tasks.push(task);
        renderlist();
        alert("Task added successfully");
        return;
    }

    alert("Task can not be added");
}

function shownotification(text) {
    alert(text);
}


function handleinput(e) {
    if (e.key === 'Enter') {
        const text = e.target.value;
        console.log('text:', text);

        if (!text) {
            shownotification('Task text can not be empty');
            return;
        }

        const task = {
            text,
            id: Date.now().toString(),
            done: false
        }

        e.target.value = '';

        addtask(task);
    }
}


function handletheevent(e)
{
    const target=e.target;

    // console.log(target);

    if(target.className === 'listinput')
    {
        const taskid=target.id;
        toggletask(taskid);
        return;

    }
    else if(target.className === 'fas fa-trash-alt')
    {
        const taskid=target.dataset.id;
        deletetask(taskid);
        return;
    }

}

addtaskinput.addEventListener('keyup', handleinput);

document.addEventListener('click',handletheevent);