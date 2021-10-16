import React, { useState, useEffect } from "react";
// import db from './firebase-config'
import firebase from "firebase";
import { auth, db, logout } from "../firebase";
import back from'../image/back.jpg'

import {
  AddCircleOutlineRounded,
  DeleteOutlineRounded,
  Edit,
} from "@material-ui/icons";

import {
  Button,
  TextField,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Dialog,
  DialogContent,
  DialogActions,
} from "@material-ui/core";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [price, setprice] = useState("0");
  const [phone, setphone] = useState("");
  const [show, setshow] = useState(true);
  const [title, setitle] = useState("+");
  const [fileUrl, setFileUrl] = React.useState(null);

  const [updateprice, setUpdateprice] = useState("");

  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState("");
  const [toUpdateId, setToUpdateId] = useState("");
  const handleperson = () => {
    if (show) {
      setshow(false);
      setitle("-");
    } else {
      setshow(true);
      setitle("+");
    }
  };
  const onFileChange = async (e) => {
    const file = e.target.files[0];
    if(!file){
      return console.log("please select image");;
    }
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
  };
  useEffect(() => {
    console.log("useEffect Hook!!!");

    db.collection("products")
      .orderBy("price", "desc")
      .onSnapshot((snapshot) => {
        console.log("Firebase Snap!");
        setTodos(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              product_name: doc.data().product_name,
              datatime: doc.data().datatime,
              price: doc.data().price,
              phone: doc.data().phone,
            };
          })
        );
      });
  }, []);

  const addTodo = (event) => {
    event.preventDefault();
    if(!fileUrl){
      return;
    }
    db.collection("products").add({
      product_name: input,
      datetime: firebase.firestore.FieldValue.serverTimestamp(),
      price: price,
      avatar:fileUrl

    });
    setInput("");
    setprice("");
    setFileUrl(null)
  };

  const deleteTodo = (id) => {
    db.collection("products")
      .doc(id)
      .delete()
      .then((res) => {
        console.log("Deleted!", res);
      });
  };

  const openUpdateDialog = (todo) => {
    setOpen(true);
    setToUpdateId(todo.id);
    setUpdate(todo.product_name);
    setUpdateprice(todo.price);
  };

  const editTodo = () => {
    db.collection("products").doc(toUpdateId).update({
    product_name: update,
      price: updateprice,
    });
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container     
    >
         <Button
        variant="contained"
        onClick={handleperson}
        style={{ background: [show ? "green" : "red"],color:"white" ,fontSize:10 }}
      >
        {title}
      </Button>
      <center style={{ display: [show ? "none" : "block"] }}>
        <form noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="todo"
            label="prodct name"
            name="todo"
            autoComplete="off"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            type="number"
            fullWidth
            id="price"
            label="price"
            name="price"
            autoComplete="off"
            value={price}
            onChange={(event) => setprice(event.target.value)}
          />
       
       <input type="file" onChange={onFileChange} />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            onClick={addTodo}
            disabled={!input || !price || !fileUrl }
            startIcon={<AddCircleOutlineRounded />}
          >
            Save
          </Button>
        </form>
      </center>

      <List dense={true}>
        {todos.map((todo) => (
          <ListItem key={todo.id}>
            <ListItemText primary={todo.product_name} secondary={todo.datetime} />
            <ListItemText primary={todo.price} secondary={todo.datetime} />

            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="Edit"
                onClick={() => openUpdateDialog(todo)}
              >
                <Edit />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => deleteTodo(todo.id)}
              >
                <DeleteOutlineRounded />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Dialog fullScreen  open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
                    variant="outlined"

            margin="normal"
            label="product name"
            type="text"
            fullWidth
            name="updateTodo"
            value={update}
            autoComplete="off"

            onChange={(event) => setUpdate(event.target.value)}
          />
          <TextField
          variant="outlined"
            margin="normal"
            label="price"
            type="number"
            autoComplete="off"
            fullWidth
            name="updateTodo"
            value={updateprice}
            onChange={(event) => setUpdateprice(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" style={{background:"red",color:"white"}} >
            Cancel
          </Button>
          <Button
          
          disabled={!updateprice || !update} onClick={editTodo} variant="contained"  style={{background:"green",color:"white"}}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default App;
