var firebaseConfig = {
      apiKey: "AIzaSyDm1Y8346K_Oon4Z1D9Jbi3Qup3XkQ8y1A",
      authDomain: "project-practice-kwitter.firebaseapp.com",
      databaseURL: "https://project-practice-kwitter-default-rtdb.firebaseio.com",
      projectId: "project-practice-kwitter",
      storageBucket: "project-practice-kwitter.appspot.com",
      messagingSenderId: "1080606450723",
      appId: "1:1080606450723:web:04758025587a6677753d96",
      measurementId: "G-VLYDRS4XML"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

username = localStorage.getItem("user_name")
document.getElementById("user_name").innerHTML = "Welcome" + username +"!!"

function addRoom(){
      room_name = document.getElementById("room_name").value;

      firebase.database().ref("/").child(room_name).update({
            purpose : "adding a room"
      });
      localStorage.setItem("room_name" , room_name)

      window.location = "kwitter_page.html"
}


function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  
console.log("Room Name - " + Room_names);
row = "<div class='room_name' id="+Room_names+"onclick='redirectToRoomName(this.id)' >#" + Room_names +"</div><hr>";
                 document.getElementById("output").innerHTML+= row;

});});}
getData();

function redirectToRoomName(name){
      console.log(name);
      localStorage.setItem("room_name" , name);
      window.location = "kwitter_page.html"
}


function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}