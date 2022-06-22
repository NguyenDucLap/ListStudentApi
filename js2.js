var studentApi = 'http://localhost:3000/list-student';
const form = document.querySelector("form");
function start(){
    getStudents(renderStudents);
    handleCreateForm();
}

start();

function getStudents(callback) {
    fetch(studentApi)
        .then(function(response){
            return response.json();
        })
        .then(callback);
}

function createStudent(data, callback) {
    var options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    };
    fetch(studentApi, options)
        .then(response => response.json())
        .then(callback)
}
let users = null;

function renderStudents(students) {
    users = students;
    var listStudentsBlock = document.querySelector('#datalist');
    var htmls = students.map(function(student){
        return `
            <tr>
                <td>${ student.id}</td>
                <td>${student.msv}</td>
                <td>${student.name}</td>
                <td>${student.classInp}</td>
                <td><button type= "button" class="btn btn-warning" onclick="clickDelete(${student.id})">Delete</button></td>
                <td><button type= "button" class="btn btn-info" onclick="clickFix(${student.id})">Fix</button></td>
                </tr>
        `;
    });
    listStudentsBlock.innerHTML = htmls.join('');
}

function handleCreateForm(){
    var createBtn = document.querySelector('#btn-save');
    createBtn.onclick = function() {
        var msv = document.getElementById("msv-input").value.trim();
        var name = document.getElementById("name-input").value.trim();
        var classInp = document.getElementById("class-input").value.trim();

        if(msv.length <= 0) {
            alert("Bạn phải nhập mã sinh viên");
            return;
        }
        if(name.length <= 0) {
            alert("Bạn phải nhập họ tên sinh viên");
            return;
        }
        if(classInp.length <= 0) {
            alert("Bạn phải nhập lớp");
            return;
        }

        var formData = {
            msv: msv,
            name: name,
            classInp: classInp
        }
        
        createStudent(formData, function(){
            getStudents(renderStudents);
        });
    }
    
}

function clickDelete(id){
    var options = {
        method:'DELETE',
        headers: {'Content-Type' : 'application/json'},
        
    };
    fetch(studentApi + '/' + id, options)
    .then(response => response.json())
    .then(id);
}

function fixStudent(data, callback) {
    var options = {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    };
    fetch(studentApi + "/" + data.id, options)
        .then(response => {return response.json();})
        .then(callback).catch(console.log)
}

function clickFix(id){

    document.getElementById("btn-fix").style.display = 'block';

    const updateUser = Array.isArray(users) && users.find((user => user.id === id));
    form.elements.msv.value = updateUser.msv;
    form.elements.name.value = updateUser.name;
    form.elements.class.value = updateUser.classInp;
    var fixBtn = document.querySelector('#btn-fix');
    fixBtn.onclick = function() {
        var msv = document.getElementById("msv-input").value.trim();
        var name = document.getElementById("name-input").value.trim();
        var classInp = document.getElementById("class-input").value.trim();
        if(msv.length <= 0) {
            alert("Bạn phải nhập mã sinh viên");
            return;
        }
        if(name.length <= 0) {
            alert("Bạn phải nhập họ tên sinh viên");
            return;
        }
        if(classInp.length <= 0) {
            alert("Bạn phải nhập lớp");
            return;
        }

        var formData = {
            id : updateUser.id,
            msv: msv,
            name: name,
            classInp: classInp
        }
        fixStudent(formData, function(){
            getStudents(renderStudents);
        });

        document.getElementById("btn-fix").style.display = 'none';
    }
}
