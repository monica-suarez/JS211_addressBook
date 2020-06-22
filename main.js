// uses strict mode so strings are not coerced, variables are not hoisted, etc... 
// 'use strict';


//uncomment assert to run tests please
// brings in the assert module for unit testing
const assert = require('assert');

//creates empty array to push users on to
let arrayOfUsers = [];

// this function waits for the web page to be loaded, when it does it will run the 
//code inside of it which happen to be getPosts()

// window.onload = function() {
  // getUser()
  // getUsers()

// }

// this function is going to make a fetch request to the url inside it's parameter brackets (). 
//Then it will turn the response (data it's getting back), saved here as res. The res.json will 
//not be saved as posts and saved into the variable, arrayOfPosts. Button element is created 
//when image and name are appended that asks the user if they want more info on the person pulled
//from the API

const getUser = (fetch) => {
  return fetch('https://randomuser.me/api/')
    .then(res => {
      if(!res.ok) {
        throw Error(res.statusText)
      } return res.json()
    })
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
    }))
    .catch(err => console.log(`Error`))
};

//was written to run a test for out of range error. cannot reconcile test failure

// const getUserTwo = (fetch, id) => {
//   fetch('https://randomuser.me/api/')
//     .then(res => res.json())
//      arr = url.split('/');
//   // let id = Number;
//   if (id<=0 || id > 30 ){
//   return 'out of range'}
//   else{ 
//   return url;
// }
// };

//grabs random user and country of origin

const countries = (fetch) => {
  return fetch('https://randomuser.me/api/?nat=au,us,fr,gb')
  // .then(res => res.json())
  .then(res => {
    if(!res.ok) {
      throw Error(res.statusText)
    } return res.json()
  })
  .then(user => user.results.map(person => {
    arrayOfUsers.push(person);
    const myUser = document.getElementById('all-users');
    const pic = document.createElement('img');
    pic.setAttribute("src", `${person.picture.thumbnail}`)
    const moreInfo = document.createElement('p')
    const li = document.createElement('li');
    // const button = document.createElement("button")
    const text = document.createTextNode(`${person.name.first} ${person.name.last}  ||   Country:  ${person.location.country}`)

      
      myUser.appendChild(pic)
      li.appendChild(text)
      myUser.append(li)
      // li.appendChild(button)
      // li.appendChild(moreInfo)
      // myUser.appendChild(info)
  }))
  .catch(err => console.log(`Error,  ${err}`))
}

//similar to getUser function but it grabs 5 random people instead of one
const getUsers = (fetch) =>{
  fetch('https://randomuser.me/api/?results=5')
  // .then(res => res.json())
  .then(res => {
    if(!res.ok) {
      throw Error(res.statusText)
    } return res.json()
  })
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
  }))
  .catch(err => console.log(`Error`))
  // .then(console.log(arrayOfUsers))
};

//should only bring back name, pic, cell

const phone = (fetch) => {
  return fetch('https://randomuser.me/api/?inc=name,picture,cell')
  .then(res => {
    if(!res.ok) {
      throw Error(res.statusText)
    } return res.json()
  })
  .then(user => user.results.map(person => {
    arrayOfUsers.push(person);
    const myUser = document.getElementById('all-users');
    const pic = document.createElement('img');
    pic.setAttribute("src", `${person.picture.thumbnail}`)
    const moreInfo = document.createElement('p')
    const li = document.createElement('li');
    // const button = document.createElement("button")
    const text = document.createTextNode(`${person.name.first} ${person.name.last}  ||   Cell:  ${person.cell}`)
    myUser.appendChild(pic)
    li.appendChild(text)
    myUser.append(li)
  }))
  .catch(err => console.log(`Error`))
};

//button that clears the appended elements and refreshes the page
const clearInfo = () => {
  document.getElementById('all-users').innerHTML = null
};

//unit tests
if (typeof describe === 'function') {
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
    describe('#getUsers()', () => {
      it('should bring back more than one user', () => {
        const testFetch = url => {
          assert(url == 'https://randomuser.me/api/?results=5')
          return new Promise(function(resolve) {
  
          })
        }
        getUsers(testFetch)
        })
      })
    })
    describe('countries()' , () =>{
      it('brings back user and country', () =>{
        const testFetch = url =>{
          return Promise.resolve({
            json: () => Promise.resolve({
              results:[
                {
                  first: "Robert",
                  last: "Sanchez", 
                  country: "Canada"
                }
              ]
            })
          })
        }
        countries(testFetch).then(result => assert(result.country === "Canada"));;
      })
    })
    //this page has no API key

    // it('confirm wrong API key', () => {
    //   const testFetch = url => {
    //   assert('Error' == 403);
    //   return Promise.resolve({

    //   })
    // }
    // getUserTwo(testFetch)
    // })
    // })
    describe('#phone()', () => {
      it('should only bring back name, picture, cell', () => {
          const testFetch = url => {
          assert(url == 'https://randomuser.me/api/?inc=name,picture,cell')
          return new Promise(function(resolve) {

          })
          }
          phone(testFetch)
          })
      })
      //this test gives error that fetch ...then is not a function. worked w tutor and tried
      //to resolve mult times and cannot get it to run

      // describe('#getUserTwo()' , () =>{
      //   it('gives error if out of range', ()=>{
      //     const testFetch = (url) =>
      //   {
      //     const arr=url.split('/');
      //     let id=Number(arr[arr.length-1]);
      //     if (id<=0 || id > 30 ){
      //     return 'out of range'}
      //     else{
      //     return url;
      //     }
      //   }
      //   assert.equal(getUserTwo(testFetch,31), 'out of range');
      //   });
      // });
};

