// import React, { useEffect } from "react";
// import firebase from "firebase";

// const db = firebase.firestore();

// function App() {
//   const [users, setUsers] = React.useState([]);

 

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     const username = e.target.username.value;
//     if (!username || !fileUrl) {
//       return;
//     }
//     await db.collection("notes")
//     .add({  name: username,
//       avatar: fileUrl,});
     
    
//   };

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const usersCollection = await db.collection("notes").get();
//       setUsers(
//         usersCollection.docs.map((doc) => {
//           return doc.data();
//         })
//       );
//     };
//     fetchUsers();
//   }, []);

//   return (
//     <>
//     {fileUrl && <span>
      
//       ok
//       </span>}
//       <form onSubmit={onSubmit}>
//         <input type="text" name="username" placeholder="NAME" />
//         <button disabled={!fileUrl} >Submit</button>
//       </form>
//       <ul>
//         {users.map((user) => {
//           return (
//             <li key={user.name}>
//               <img width="100" height="100" src={user.avatar} alt={user.name} />
//               <p>{user.name}</p>
//             </li>
//           );
//         })}
//       </ul>
//     </>
//   );
// }

// export default App;