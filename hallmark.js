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
        desire =  e.target.previousSibling.textContent;
        console.log('desire  iin  edit', desire);
        
        text.value = e.target.previousSibling.textContent;
    }
    else if(e.target.classList.contains('add') && editing){
        console.log("desire in editing: ", desire);
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

            //     Second method
            //     fetch(`http://localhost:3001/updating?goal=${desire}&&id=${specialId}`).then(response => response.json()).then
            //     (data => {
            //         console.log("I Got the Data: ", data);
            //     }).catch(err =>  console.log("This is My Error: ", err))
            //     text.value = '';
            //     desire = '';
            //     editing = false
            // }



            const value = {
                value:desire
            };

            fetch(`http://localhost:3001/updating/${specialId}`,{
                method:'PUT',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(value)
            }).then(response => response.json()).then
            (data => console.log("here is your data: ", data)).
            catch(err => console.log("Work On Your Weaknesses: ", err));
            text.value = '';
            desire = '';
            editing = false
        }
    }
    else if(e.target.classList.contains('add') && !editing){
        
        console.log('LIst: ', list);
        if(!desire){
            alert("Enter Your Desire/Destination");
        }
        else{
            console.log("INside The Add Click");
            const myId = new Date().getTime().toString();
            creatingElement(myId,desire);
        data = [
            {
                id:myId,
                value:desire
            }
        ]
        fetch('http://localhost:3001/addList',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        }).then
        (response =>response.json()).then
        (data => console.log("get YOur Reward:  ", data)).
        catch(err => console.log("Eres are always there: ", err));
        text.value = '';
        }
    }
    else if(e.target.classList.contains('del'))
    {
        const item = e.target.parentElement;
        const itemId = item.id;
        console.log("item to be delted: ", item);
        list.removeChild(item);
        fetch(`http://localhost:3001/deleting/${itemId}`,{
            method:'DELETE' 
        }).then
        (response =>response.json()).then
        (data => console.log("get YOur Reward:  ", data)).
        catch(err => console.log("Eres are always there: ", err));
        console.log('your Keys: ', desire);
    }

})

document.addEventListener('DOMContentLoaded', e => {
    fetch('http://localhost:3001/load').then(response => response.json()).
    then(data => {
        console.log("Ar Rehman: ", data);
        data.forEach(item => creatingElement(item.id, item.value));
    }).catch(err => console.log ("Be Deliberatee: ", err))
})


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
