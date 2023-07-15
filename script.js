
let form= document.querySelector("#form")
let button=document.querySelector("button")



let queArray=[]

let recipeDate=JSON.parse(localStorage.getItem("data")) || []
   // checking if there is any thing in localstorge if it is null than store in array 
    let input= document.getElementById("fileEl")
    //putting my input inside a varabile
 input.addEventListener('change',()=>{
    // add an even "onchange" to the input onchange occurs when the value of an element changes
    const files= input.files
    // storing the value of the "type:file "inside files ,which is a file list that is a object but behaves like an array
    for (let index = 0; index < files.length; index++) {
        //using the length of the files to keep track on how many files coming through 
        let reader = new FileReader()
        // making a new object to read the file, using reader to break down image into dataURL
        reader.addEventListener('load',(e)=>{
            //setting adventlistener to reader to "onload" since file reader is asyncerous. ONLOAD event occurs when object has been loaded
            const dataUrl= e.target.result
            // using the result property of reader to get the dataURL then storing it in var
            let nameV=document.querySelector("#name").value
            //grabing input value from type text of name
            let recipe={
             nameV,
            image:dataUrl
            }
            //made a recipe object inside the loop for every new file loaded there will be a new object created
            recipeDate.push(recipe)
            //pusing every new object into array
            localStorage.setItem("data",JSON.stringify(recipeDate))
            //immediately store inside local storage then turn array into a string now you can get get them from the parsed json recipeData array
            console.log(recipeDate)
        })  
            reader.readAsDataURL(files[index]);
            //a method of reader to read the file as a URL for everyindex of the fileList that is a  object but behaves like an array 

        }

            form.reset()
            display()
         })





button.addEventListener("click",display())


function display() {
const container = document.createElement('div');
container.id = 'imageContainer';

for (const recipe of recipeDate) {
const recipeElement = document.createElement('div');
const nameElement = document.createElement('p');
nameElement.textContent = recipe.nameV;
const imageElement = document.createElement('img');
imageElement.src = recipe.image;

recipeElement.appendChild(nameElement);
recipeElement.appendChild(imageElement);
container.appendChild(recipeElement);
}

const existingContainer = document.getElementById('imageContainer');
if (existingContainer) {
existingContainer.remove();

}
// at every interation of the array there would be the old container with old data then a new container with new data 
// to avoid that if the first interation has the same id at the second interation remove the old one 
// the old would be removed first because the array starts at zero witch you will find the first container whcih the the condition wil check 
//the first run through will be falsy then the secound run through will be true 
const main= document.querySelector("main")
main.append(container);
}





