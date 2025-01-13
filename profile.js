import { addDoc, auth, collection, db, doc, getDoc, getDocs, onAuthStateChanged } from "./firebase.js"

const userProfile = async () => {
    const userUid = localStorage.getItem("uid")
    console.log("userUid", userUid)
    
    if (!userUid) {
        window.location.replace("./index.html")
    }
    const fname = document.getElementById("fname")
    const lname = document.getElementById("lname")
    const uemail = document.getElementById("uemail")
    const uid = document.getElementById("uid")

    // get Data 
    const userData = await getDoc(doc(db, "users", userUid))
    console.log(userData.data())
    fname.innerHTML = userData.data().firstName
    lname.innerHTML = userData.data().lastName
    uemail.innerHTML = userData.data().email
    uid.innerHTML = userUid;
}


window.userProfile = userProfile
