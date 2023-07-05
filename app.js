console.log("Welcome to notes app");
shownotes();
// If user adds a notes,add it to the localstorage
let addbtn = document.getElementById('addbtn');
addbtn.addEventListener("click", function (e) {
    let addtitle = document.getElementById('addtitle');
    let addtxt = document.getElementById('addtext');
    let title = localStorage.getItem("title");
    let notes = localStorage.getItem("notes");
    if (addtitle.value != "" && addtxt.value != "") {
        if (notes == null && title == null) {
            titlesobj = [];
            notesobj = [];
        }
        else {
            titlesobj = JSON.parse(title);
            notesobj = JSON.parse(notes);
        }
        titlesobj.push(addtitle.value);
        localStorage.setItem("title", JSON.stringify(titlesobj));
        notesobj.push(addtxt.value);
        localStorage.setItem("notes", JSON.stringify(notesobj));
        addtxt.value = "";
        addtitle.value = "";
        shownotes();
    }

})
function shownotes() {
    let title = localStorage.getItem("title");
    let notes = localStorage.getItem("notes");
    if(notes==null && title==null){
        notesobj=[];
        titlesobj=[];
    }
    else{
        notesobj=JSON.parse(notes);
        titlesobj=JSON.parse(title);
    }
    let html = "";
    notesobj.forEach(function (element, index) {
        html += `<div class="noteCard m-2 card " id="cardwritten" style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title"> <strong><u>${titlesobj[index]}</u> (Note ${index+1})</strong></h5>
            <p class="card-text">${notesobj[index]}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete this</button>
            </div>
            </div>`
    });
    let notesElm=document.getElementById('savednotes');
    if(notesobj.length!=0){
        notesElm.innerHTML=html;
    } 
    else{
        notesElm.innerHTML=`<h5 style="text-align: center; font-family:Arial, Helvetica, sans-serif; color:green"><i>Nothing to show You <br> Please add some Notes from above</i>☝️ <i>section</i></h5>`
    }
}
function deleteNote(index){
        console.log('I am deleting',index);
        let title = localStorage.getItem("title");
        let notes = localStorage.getItem("notes");
        if(notes==null && title==null){
            notesobj=[];
            titlesobj=[];
        }
        else{
            notesobj=JSON.parse(notes);
            titlesobj=JSON.parse(title);
        }
        notesobj.splice(index,1);
        titlesobj.splice(index,1);
        localStorage.setItem("notes", JSON.stringify(notesobj));
        localStorage.setItem("title", JSON.stringify(titlesobj));
        shownotes();
}

let search=document.getElementById('searchtxt');
search.addEventListener("input",function(){
    let inputval=search.value.toLowerCase();
    // console.log('Input Event fired' , inputval);
    let noteCards=document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
    let cardtxt=element.getElementsByTagName("p")[0].innerText;
    a=cardtxt.toLowerCase();
    // console.log(a);
    if(a.includes(inputval)){
        element.style.display="block";
    }
    else{
        element.style.display="none";
    }
    })
})