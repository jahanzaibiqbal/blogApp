import { addDoc, auth, collection, db, doc, getDoc, getDocs, onAuthStateChanged } from "./firebase.js"

const authCheck = async () => {
    const userUid = localStorage.getItem("uid")
    console.log("userUid", userUid)
    
    if (!userUid) {
        window.location.replace("./index.html")
    }
    const fname = document.getElementById("fname")
    const lname = document.getElementById("lname")
    // get Data 
    const userData = await getDoc(doc(db, "users", userUid))
    console.log(userData.data())
}


const getPost = async () => {
    console.log("getPost get")
    try {
        const parent = document.getElementById("parent")
        const snapShot = await getDocs(collection(db, "blogs"))
        parent.innerHTML = ""
        snapShot.forEach((doc) => {
            if (doc.data().isPrivate) {
                if (doc.data().uid === localStorage.getItem("uid")) {
                    parent.innerHTML += ` 
                <div>
                <li> ${doc.data().title} </li>
                <li>${doc.data().desc}</li>
                <li> ${doc.data().isPrivate ? "Private" : "Public"} </li>
                ${doc.data().uid === localStorage.getItem("uid") ?
                            "<button>EDIT</button>" : ""
                        }
                <hr />
            </div>`
                }

            } else {
                parent.innerHTML += ` <div>
                <li> ${doc.data().title} </li>
                <li>${doc.data().desc}</li>
                <li> ${doc.data().isPrivate ? "Private" : "Public"} </li>
                ${doc.data().uid === localStorage.getItem("uid") ?

                        "<button>EDIT</button>" : ""
                    }
                
                <hr />
            </div>`
            }

        })

    } catch (error) {

    }

}
window.authCheck = authCheck
window.getPost = getPost