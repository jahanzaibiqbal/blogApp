import { addDoc, updateDoc, deleteDoc, collection, db, doc, getDoc, getDocs } from "./firebase.js";

// Authentication check function
const authCheck = async () => {
    const userUid = localStorage.getItem("uid");
    console.log("userUid", userUid);

    if (!userUid) {
        window.location.replace("./index.html"); // Redirect to login page if not authenticated
    }

    const fname = document.getElementById("fname");
    const lname = document.getElementById("lname");

    // Fetch user data from Firestore
    const userData = await getDoc(doc(db, "users", userUid));
    console.log(userData.data());
}

// Function to fetch blog posts
const getPost = async () => {
    console.log("getPost get");
    try {
        const parent = document.getElementById("parent");
        const snapShot = await getDocs(collection(db, "blogs"));

        // Clear the parent container before displaying new posts
        parent.innerHTML = "";

        // Get the current user's UID from localStorage
        const currentUserUid = localStorage.getItem("uid");

        snapShot.forEach((doc) => {
            const postData = doc.data();
            const postUid = postData.uid;

            // Only show the post if the post belongs to the current user
            if (postUid === currentUserUid) {
                parent.innerHTML += `
                    <div id="post-${doc.id}">
                        <li>${postData.title}</li>
                        <li>${postData.desc}</li>
                        <li>${postData.isPrivate ? "Private" : "Public"}</li>
                        <button onclick="editPost('${doc.id}')">EDIT</button> <br> <br>
                        <input type="button" value="Delete" onclick="deletePost('${doc.id}')">
                        <hr />
                    </div>`;
            }
        });

    } catch (error) {
        console.error("Error fetching posts: ", error);
    }
}

// Function to edit a blog post
const editPost = async (postId) => {
    try {
        const postRef = doc(db, "blogs", postId);
        const postSnap = await getDoc(postRef);

        if (postSnap.exists()) {
            const postData = postSnap.data();

            // Populate the edit form with the current post data
            document.getElementById("edit-title").value = postData.title;
            document.getElementById("edit-desc").value = postData.desc;
            document.getElementById("edit-private").checked = postData.isPrivate;

            // Display the edit form
            const editForm = document.getElementById("edit-form");
            editForm.style.display = "block";

            // Handle saving changes
            const saveButton = document.getElementById("save-button");
            saveButton.onclick = async () => {
                const updatedPost = {
                    title: document.getElementById("edit-title").value,
                    desc: document.getElementById("edit-desc").value,
                    isPrivate: document.getElementById("edit-private").checked,
                };

                // Update the post in Firestore
                await updateDoc(postRef, updatedPost);
                alert("Blog updated successfully!");

                // Hide the edit form and reload posts
                editForm.style.display = "none";
                getPost();
            };
        } else {
            console.log("No such post found!");
        }

    } catch (error) {
        console.error("Error editing post: ", error);
    }
}

// Function to delete a blog post
const deletePost = async (postId) => {
    try {
        const postRef = doc(db, "blogs", postId);

        // Delete the post from Firestore
        await deleteDoc(postRef);
        alert("Blog deleted successfully!");

        // Reload the posts
        getPost();

    } catch (error) {
        console.error("Error deleting post: ", error);
    }
}

// Expose the functions to the global scope
window.authCheck = authCheck;
window.getPost = getPost;
window.editPost = editPost;
window.deletePost = deletePost;
