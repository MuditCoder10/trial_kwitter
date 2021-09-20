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

room_name = localStorage.getItem("room_name")
user_name = localStorage.getItem("user_name")


function send() {
  msg = document.getElementById("msg").value;
  firebase.database().ref(room_name).push({
    name: user_name,
    message: msg,
    like: 0
  });

  document.getElementById("msg").value = "";
}

function getData() {

  firebase.database().ref("/" + room_name).on('value', function (snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      childData = childSnapshot.val()

      if (childKey != "purpose") {

        firebase_message_id = childKey;
        message_data = childData;

        console.log(firebase_message_id);
        console.log(message_data);

        name = message_data['name']
        message = message_data['message']
        like = message_data['like']
        name_with_tag = "<hr>" + name + "<img class='user_tick' src='tick.png'></h4>";
        message_with_tag = "<h4 class= 'message_h4'>" + message + "</h4>";
        like_button = "<button class = 'btn btn-primary' id=" + firebase_message_id + " value=" + like + "onclick='updateLike(this.id)'>";
        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'> Like: " + like + "</span></button><hr>";

        row = name_with_tag + message_with_tag + like_button + span_with_tag;

        document.getElementById("output").innerHTML += row;
      }
    })
  })
}

getData()

function updateLike(message_id) {
  console.log("clicked on like button - " + message_id);
  button_id = message_id;
  likes = document.getElementById(button_id).value;
  updated_likes = Number(likes) + 1;
  console.log(updated_likes)

  firebase.database().ref(room_name).child(message_id).update({
    likes: updated_likes
  })
}






function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "index.html";
}