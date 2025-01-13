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
    console.log("getPost get");
    try {
        const parent = document.getElementById("parent");
        const snapShot = await getDocs(collection(db, "blogs"));
        
        // Clear the parent container before displaying new posts
        parent.innerHTML = "";

        // Get the current user's uid from localStorage
        const currentUserUid = localStorage.getItem("uid");

        snapShot.forEach((doc) => {
            const postData = doc.data();
            const postUid = postData.uid;
            
            // Only show the post if the post belongs to the current user
            if (postUid === currentUserUid) {
                // Show the post, whether it's private or public
                parent.innerHTML += `
                    <div>
                        <li>${postData.title}</li>
                        <li>${postData.desc}</li>
                        <li>${postData.isPrivate ? "Private" : "Public"}</li>
                        <button>EDIT</button> <br> <br> 
                        <input type="button" value="Delete"></button> <!-- Only the current user can edit -->
                        <hr />
                    </div>`;
            }
        });

    } catch (error) {
        console.error("Error fetching posts: ", error);
    }
}

window.authCheck = authCheck
window.getPost = getPost