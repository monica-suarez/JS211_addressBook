// uses strict mode so strings are not coerced, variables are not hoisted, etc... 
// 'use strict';


//uncomment assert to run tests please
// brings in the assert module for unit testing
// const assert = require('assert');

//creates empty array to push users on to
let arrayOfUsers = [];

// this function waits for the web page to be loaded, when it does it will run the code inside of it which happen to be getPosts()
// window.onload = function() {
  // getUser()
  // getUsers()

// }

// this function is going to make a fetch request to the url inside it's parameter brackets (). Then it will turn the response (data it's getting back), saved here as res. The res.json will not be saved as posts and saved into the variable, arrayOfPosts
const getUser = (fetch) => {
  return fetch('https://randomuser.me/api/')
    .then(res => res.json())
    .then(user => user.results.map(person => {
      arrayOfUsers.push(person)
      const list = document.getElementById("all-users");
      const li = document.createElement('li');
      const text = document.createTextNode(`${person.name.first} ${person.name.last}`)
      const pic = document.createElement('img');
      pic.setAttribute("src", `${person.picture.thumbnail}`);
      const infoButton = document.createElement('button');
      const moreInfo = document.createElement('p');
      moreInfo.innerHTML = ""
      infoButton.innerHTML = "More Info"
      infoButton.addEventListener('click', function(){
        info = document.createTextNode(`City: ${person.location.city} | Country: ${person.location.country} | 
        Age: ${person.dob.age} | Email: ${person.email} | Cell: ${person.cell}`)
        if(moreInfo.innerHTML === ""){
          return moreInfo.appendChild(info);
        }else{
          return moreInfo.innerHTML = "";
        }
      })
      li.appendChild(pic)
      li.appendChild(text)
      list.append(li)
      li.appendChild(infoButton);
      li.appendChild(moreInfo);
    }));
};
const getUsers = (fetch) =>{
  fetch('https://randomuser.me/api/?results=5')
  .then(res => res.json())
  .then(user => user.results.map(person => {
    arrayOfUsers.push(person)
    const list = document.getElementById("all-users");
    const li = document.createElement('li');
    const text = document.createTextNode(`${person.name.first} ${person.name.last}`)
    const pic = document.createElement('img');
    pic.setAttribute("src", `${person.picture.thumbnail}`);
    const infoButton = document.createElement('button');
    const moreInfo = document.createElement('p');
    moreInfo.innerHTML = ""
    infoButton.innerHTML = "More Info"
    infoButton.addEventListener('click', function(){
      info = document.createTextNode(`City: ${person.location.city} | Country: ${person.location.country} | 
        Age: ${person.dob.age} | Email: ${person.email} | Cell: ${person.cell}`)
      if(moreInfo.innerHTML === ""){
        return moreInfo.appendChild(info);
      }else{
        return moreInfo.innerHTML = "";
      }
    })
    li.appendChild(pic)
    li.appendChild(text)
    list.append(li)
    li.appendChild(infoButton);
    li.appendChild(moreInfo);
  }));
  // .then(console.log(arrayOfUsers))
};
// if (typeof describe === 'function') {
  describe('#getUser()', () => {
    it('return the correct url', () => {
    const testFetch = url =>{
      assert(
        url === 'https://randomuser.me/api/'
      )
      return new Promise(function(resolve){

      });
    }
    getUser(testFetch)
    });
    it('bring back a user', () => {
      const testFetch = url =>{
        return Promise.resolve({
          json: () => Promise.resolve({
            results:[
              {
                first: "Robert",
                last: "Sanchez"
              }
            ]
          })
        })
       
      }
      getUser(testFetch).then(result => assert(result.first === "Robert"));;
    })


});
// }
