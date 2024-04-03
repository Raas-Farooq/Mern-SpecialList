const text = document.querySelector("#text");
let desire;

const addBtn = document.querySelector(".add");
const edit = document.querySelector(".edit");
const del = document.querySelector(".del");
let editing = false;
console.log('EDIT: ', edit);
const list = document.querySelector(".addingList");

console.log('LIst: ', list);


text.addEventListener("input", e => {
    console.log('your Keys: ', e.target.value);
    desire = e.target.value;
    

})
let specialId;

list.addEventListener("click", e => {
    if(e.target.classList.contains('edit')){
        editing = true;
        specialId = e.target.parentElement.id;
        console.log('parent', e.target.previousSibling.textContent);
        console.log('targer', e.target);
        
        text.value = e.target.previousSibling.textContent;
    }
    else if(e.target.classList.contains('add') && editing){
        if(!desire){
            alert("Enter Your Desire/Destination")
        }
        else{
            const items = document.querySelectorAll(".item");
            items.forEach(item => {
                if(item.id === specialId){
                    console.log("li: ",item.children[0].textContent);
                    item.children[0].textContent = desire;
                }
            })
            console.log('Clicked Under Edit Button', e.target.value);
            console.log('your goal under Edit: ', desire);
            console.log('specialId under Edit: ', specialId);

            fetch(`http://localhost:3000/updating?goal=${desire}&&id=${specialId}`).then(response => response.json()).then
            (data => {
                console.log("I Got the Data: ", data);
            }).catch(err =>  console.log("This is My Error: ", err))
            text.value = '';
            desire = '';
            editing = false
        }
    }
    else if(e.target.classList.contains('add') && !editing){
        
        console.log('LIst: ', list);
        // editing = true;
    
        // console.log('your Keys: ', desire);
        if(!desire){
            alert("Enter Your Desire/Destination")
        }
        else{
            console.log("INside The Add Click");
            const myId = new Date().getTime().toString();
            creatingElement(myId,desire);
    
        const message=[
        {
            id: myId,
            value: desire
        }];
    
        fetch('http://localhost:3000/addList',{
            
            method:'POST',
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify(message)
            }).then(response => response.json()).then(
                data => {
                    console.log("Show me Something Incredible: ", data);
                }
            ).catch(err => console.log("are You Ready For Utmost Effort: ", err))
            text.value = '';
    
        }

    }
    else if(e.target.classList.contains('del'))
    {
        const item = e.target.parentElement;
        console.log("item to be delted: ", item);
        list.removeChild(item);

        console.log('your Keys: ', desire);
    }

})

document.addEventListener('DOMContentLoaded', e => {
    fetch('http://localhost:3000/load').then(response => response.json()).
    then(data => {
        console.log("Ar Rehman: ", data);
        data.forEach(item => creatingElement(item.id, item.value));
    }).catch(err => console.log ("Be Deliberatee: ", err))
})


// addBtn.addEventListener("click", e => {
//     if(!desire){
//         alert("Enter Your Desire/Destination")
//     }
//     else{
//         console.log("I have also run");
//         const myId = new Date().getTime().toString();
//         creatingElement(myId,desire);

//     const message=[
//     {
//         id: myId,
//         value: desire
//     }];

//     fetch('http://localhost:3000/addList',{
        
//         method:'POST',
//         headers:{
//             "Content-Type": "application/json",
//         },
//         body:JSON.stringify(message)
//         }).then(response => response.json()).then(
//             data => {
//                 console.log("Show me Something Incredible: ", data);
//             }
//         ).catch(err => console.log("are You Ready For Utmost Effort: ", err))
//         text.value = '';

//     }
    
// })

const creatingElement = (id, value) => {
    const div = document.createElement('div');
    div.id = id;
    let li = document.createElement('li');
    li.textContent= value;
    const edit = document.createElement('button');
    const del = document.createElement('button');
    edit.textContent= "edit";
    del.textContent= "del";
    // const edit = document.createElement('button');
    edit.classList.add('edit');
    del.classList.add('del');
    div.classList.add('item');

    div.appendChild(li);
    div.appendChild(edit);
    div.appendChild(del);
    list.appendChild(div);
}
