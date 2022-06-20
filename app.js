showNotes();
let btn = document.getElementById('addBtn');

btn.addEventListener('click', addNotesFunction);
function addNotesFunction() {
    let addTxt = document.getElementById('addTxt');
    let notes=localStorage.getItem('notes');
    let notesObj = JSON.parse(notes);
    notesObj.push(addTxt.value);
    addTxt.value = "";
    localStorage.setItem('notes', JSON.stringify(notesObj));
    console.log(localStorage);
    showNotes();
}
function showNotes() {
    let showNotes = JSON.parse(localStorage.getItem('notes'));
    let html = "";
    showNotes.forEach(function (element, index) {
        html += `
            <div class="mx-2 my-2 noteCard card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Note ${index+1}</h5>
                    <p class="card-text">${element}</p>
                    <button id="${index}" onclick="deleteNotes(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
            </div>
        `
    });
    let notesBlock=document.getElementById('notes');
    notesBlock.innerHTML=html;
}
function deleteNotes(index){
    console.log("running",index)
    let showNote = JSON.parse(localStorage.getItem('notes'));
    showNote.splice(index,1);
    localStorage.setItem('notes',JSON.stringify(showNote));
    showNotes();
}

let searchTxt=document.getElementById('searchTxt');
searchTxt.addEventListener('input',searchFuntion);
function searchFuntion(){
    let searchVal= searchTxt.value;
    let contentClasses=document.getElementsByClassName('noteCard');
    Array.from(contentClasses).forEach(function(element){
        let el=element.getElementsByTagName('p')[0].innerText;
        if(el.includes(searchVal))
            element.style.display='block';
        else 
            element.style.display='none';
    });
}