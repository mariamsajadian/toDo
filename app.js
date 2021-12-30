const addForm = document.querySelector(".add");

// we have to inject th++e template html in ul so we need to get its class first

const list = document.querySelector('.todos');
// console.log ('list: ', list);
const searchs = document.querySelector('.search input')// we listen to input for keywords
// console.log("this is search:", searchs);

const generateTempalte = todo => {

    const html = `<li class="list-group-item d-flex justify-content-between align-items-center">
    <span>${todo}</span>
    <i class="far fa-trash-alt delete"></i>
  </li>`;
    list.innerHTML += html; // we add it if we use = alone it will be replace
};

addForm.addEventListener('submit', e => {
    e.preventDefault();
    const todo = addForm.add.value.trim(); //from addForm and add class get the vlaue and print it but before using trim delete spaces
    // console.log(todo);
    // here we need to add the html element to the list so we need a function above but we have to check that user filled the input by letters not spaces
    if (todo.length) { // do not store spaces 
        generateTempalte(todo);
        addForm.reset();
    }
});

// delete todos
list.addEventListener('click',
    e => {
        if (e.target.classList.contains('delete')) {
            e.target.parentElement.remove();
        }

    });

const filterTodos = term => { // get the user and filter and match 
    // console.log(Array.from(list.children));
    Array.from(list.children)//we get the childern of uls that is lists.
        .filter((todo) =>
            //These two lines return true and text content in tags that must be compare with terms
            !todo.textContent.toLowerCase().includes(term))// here we get the content in tags that we desire to match with term filled by user and inclues search in term to see whether there is match or not 
        //console.log(todo.textContent); return true;
        .forEach((todo) => todo.classList.add('filtered'));
    // we take list.childern and convert it to array

    //It is for if user type wrong and want to correct it 
    Array.from(list.children)
        .filter((todo) =>
            todo.textContent.toLowerCase().includes(term))
        .forEach((todo) => todo.classList.remove('filtered'));
};

//keyup event
searchs.addEventListener('keyup', () => {//search is input and we listen to keyup event. we get the terms from users
    const term = searchs.value.trim().toLowerCase();// here we get value from user and trim white spaces. Here search. is input 
    filterTodos(term);
});