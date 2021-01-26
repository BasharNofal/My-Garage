'use strict';

var arrayOfCars = [];

var table = document.getElementById("cars-list");

var form = document.getElementById("form");

var arrayOfPaths = ['bmw.png','chevrolet.png','hyundai.png','kia.png','lexus.png','tesla.png','toyota.png'];

function Cars(name,category,year,path) {
    this.name = name;
    this.category = category;
    this.year = year;
    this.img ="../img/" + path;
    arrayOfCars.push(this);
}

Cars.prototype.render = function (){
    var tr = document.createElement('tr');
    table.appendChild(tr);

    var tdImage = document.createElement('td');
    tdImage.innerHTML = `<img src="${this.img}">`;
    tr.appendChild(tdImage);
    
    var tdNameAndYear = document.createElement('td')
    tdNameAndYear.innerHTML = `<p> Car Name: ${this.name}</p> <br> <p> Model Year: ${this.year}</p> `
    tr.appendChild(tdNameAndYear);
}

function store(){
    localStorage.setItem('arrayOfCars',JSON.stringify(arrayOfCars));
}

function retrieve (){
    if (localStorage.getItem('arrayOfCars')) {
        var newArrayOfCars = JSON.parse(localStorage.getItem('arrayOfCars'));
    }
    for (let index = 0; index < newArrayOfCars.length; index++) {
        var renderStoredCars = new Cars(newArrayOfCars[index].name,newArrayOfCars[index].category,newArrayOfCars[index].year,newArrayOfCars[index].img);
        renderStoredCars.render();
    }
}

function addData(event) {
    event.preventDefault()
    var name = event.target.name.value;
    var category = event.target.category.value;
    var year = event.target.year.value;

    for (let index = 0; index < arrayOfPaths.length; index++) {
        if (arrayOfPaths[index].split(".")[0] === category.toLowerCase()) {
            var path = arrayOfPaths[index];
        }
    }
    var addCar = new Cars(name,category,year,path);
    addCar.render();
    store();
    console.log(addCar);

}
retrieve();
form.addEventListener('submit',addData);