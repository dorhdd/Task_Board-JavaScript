var arr = []
var container;
//loadind prosses in order to keep the data from local storage on the page
function onLoad() {
    const getItem = localStorage.getItem("objNote");
    container = document.getElementById('note-container');

    if (getItem) { //ckeck if ther is a data in local storage
        arr = JSON.parse(getItem);
        arr.forEach(function(element){
            createNote(element.info,element.deadline,element.time);
        })
    }

  
}

onLoad()

//function that updateing local storage
function updateLS() {
        var jsonStringify = JSON.stringify(arr)
        localStorage.setItem("objNote", jsonStringify);
}

//create tasks
function createNote(text, date, time){
    var noteContainer = document.createElement('div');
    noteContainer.classList.add("noteBag");

    var btn = document.createElement("btn");
    btn.setAttribute("class", "fas fa-times")
    btn.classList.add("hoverC")
    btn.addEventListener("click", remove) //delete note event

    noteContainer.appendChild(btn);
    var noteText = document.createElement('p');
    noteText.classList.add("scroll")
    noteContainer.appendChild(noteText);
    noteText.innerHTML = text
    var noteText2 = document.createElement('p');
    noteText2.classList.add("space")
    noteText2.innerHTML = date
    noteContainer.appendChild(noteText2);
    var noteText3 = document.createElement('p');

    noteText3.innerHTML = time
    noteContainer.appendChild(noteText3);
    container.appendChild(noteContainer);
}

//addind task after creation
function addTask() {
    var text = document.getElementById("text1").value
    var date = document.getElementById("date1").value
    var time = document.getElementById("time1").value

    var obj = {
        info: text,
        deadline: date,
        time: time,
    };

    arr.push(obj)
    updateLS();

    createNote(text, date, time);
}

// create notes for tasks (event)
var saveNote = document.querySelector("#save");
saveNote.addEventListener('click',function(){
    addTask() //activate two functions 'addTask' & add task activate 'createNote'
})


//clear all the info from inputs
var clear = document.querySelector("#clear")
 clear.addEventListener("click", function () {
    var cleanText = document.getElementById("text1");    
    cleanText.value = " ";
    var cleanDate = document.getElementById("date1");    
    cleanDate.value = " ";
    var cleanTime = document.getElementById("time1");    
    cleanTime.value = " ";
})

//delete objects from local storage
function remove(e) {
    var index;
    var elements = container.querySelectorAll('.noteBag');
    for(var i = 0; i < elements.length && !index; i++) {
        if(elements[i] === this.parentElement) {
            index = i;           
        }
    }
    container.removeChild(this.parentElement);
    arr.splice(index,1); //arr splice to take parts from local storage
    updateLS();
}