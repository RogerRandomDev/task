

function reloadList(){var x = new XMLHttpRequest();
x.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       document.getElementById("iframe").innerHTML=this.responseText
       
    }
};
x.open("GET", "http://localhost:3000/inputList",true);
x.send();}


function addToList(){
    var l = new XMLHttpRequest();
    
    l.onreadystatechange = function() {
    if (this.readyState == 4 && this.status !=404) {
        reloadList();
    }}
    
    l.open("POST", "http://localhost:3000/addInput");
    l.setRequestHeader("Content-Type", "text/plain");
    l.send(JSON.stringify({
        name:document.getElementById("name").value,
    }));
    completeTask(-1);
    
}
function completeTask(id){
    var l = new XMLHttpRequest();
    
    l.onreadystatechange = function() {
    if (this.readyState == 4 && this.status != 404) {
       reloadList()
    }}
    l.open("POST", "http://localhost:3000/completeTask",true);
    l.setRequestHeader("Content-Type", "text/plain");
    l.send(JSON.stringify({
        id:id}));
}
const removeComplete=()=>{
    var l = new XMLHttpRequest();
    
    l.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       reloadList()
    }}
    l.open("POST", "http://localhost:3000/removeTask",true);
    l.setRequestHeader("Content-Type", "text/plain");
    l.send();
}
reloadList()