

const singleButton=document.querySelector("#showNotes");
singleButton.addEventListener('submit', singleRequest);

function singleRequest(event){
    event.preventDefault();
    var noteId=event.target.noteId.value;
    fetch(`/notes/${noteId}`)
        .then((res)=>{
            return res.json();
        })
        .then((data)=>{
            if(!noteId){
                document.getElementsByClassName("results").innerHTML +=" ";
                for(var i in data){
                document.querySelector(".results").innerHTML +=data[i].noteTitle + '<br/>';
            // document.querySelector("#results").innerHTML +=JSON.stringify(d) + '<br/>';
                }
            }
            else{
                document.querySelector(".results").innerHTML +=data.noteTitle ;
            }
            console.log(data);
        })
}




// const getNotesButton=document.querySelector("#showNotes");
// getNotesButton.addEventListener("submit",getNotes);

// function getNotes(event){
//     event.preventDefault();
//     fetch('/notes')
//         .then((res)=>{
//             return res.json();
//         })
//         .then((data)=>{
//             data.map((d)=> {
//             console.log(d)
//             const nt=d.noteTitle;
//             document.querySelector(".results").innerHTML +=nt + '<br/>';
//             // document.querySelector("#results").innerHTML +=JSON.stringify(d) + '<br/>';

//             })
//             // console.log(data);
//         })
// }


const deleteButton=document.querySelector("#deleteNote");
deleteButton.addEventListener('submit', deleteRequest);

function deleteRequest(event){
    event.preventDefault();
    var noteId=event.target.noteId.value;
    console.log('Note: ',noteId);
    const options ={
        method:"DELETE",
        headers:new Headers({
            'Content-Type':'application/json'
        }),
        body:JSON.stringify({noteId:noteId})
    }
    console.log(options);
    const URL=`/notes/${noteId}`;
    console.log(URL);
    fetch(URL,options)
    .then(res=>res.json())
    .then(data=>console.log('Notes to delete',data))
}


const updateButton=document.querySelector("#updateNote");
updateButton.addEventListener('submit',updateRequest);

function updateRequest(event){
    event.preventDefault();
    var noteId=event.target.noteId.value;
    var noteTitle=event.target.noteTitle.value;
    var noteDescription=event.target.noteDescription.value;
    console.log(noteId);
    console.log(noteTitle);
    console.log(noteDescription);
    post ={
        noteId:noteId,
        noteTitle:noteTitle,
        noteDescription:noteDescription
    }
    const options ={
        method:"PATCH",
        headers:new Headers({
            'Content-Type':'application/json'
        }),
        body:JSON.stringify(post)
    }
    const URL=`/notes/${noteId}`;
    fetch(URL,options)
    .then(res=>res.json())
    .then(data=>console.log('Notes to Update',data))
}



const postButton=document.querySelector("#newNote");
postButton.addEventListener('submit', postRequest);

function postRequest(event,post){
    event.preventDefault();
    var noteTitle=event.target.noteTitle.value;
    var noteDescription=event.target.noteDescription.value;
    // var movieDate=event.target.movieDate.value;
    post={
        noteDescription:noteDescription,
        noteTitle:noteTitle,
        // movieDate:movieDate
    }
    const options={
        method:'POST',
        body:JSON.stringify(post),
        headers:new Headers({
            'Content-Type':'application/json'
        })
    }
    return fetch('/notes',options)
    .then(res=>res.json())
    .then(res =>console.log(res))
    .then(error=>console.error("error : ",error))
}