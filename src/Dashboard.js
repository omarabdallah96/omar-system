import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import "./Dashboard.css";
import { auth, db, logout } from "./firebase";
import Home from "./Home";
import Product from "./Product/product";

import {
  AddCircleOutlineRounded,
  DeleteOutlineRounded,
  Edit,
  ExitToApp,
  LocalCafe,
  Person,
  ToggleOff,
} from "@material-ui/icons";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const history = useHistory();
  const [toggle, settoggle] = useState(true);
  const [title, settitle] = useState("Person");

  const handletabs = () => {
    if (toggle) {
      settoggle(false);
      settitle("products");
    } else {
      settoggle(true);
      settitle("person");
    }
  };

  const fetchUserName = async () => {
    try {
      const query = await db
        .collection("users")
        .where("uid", "==", user?.uid)
        .get();
      const data = await query.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("ناكد من اتصالك بالانترنت");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return history.replace("/");

    fetchUserName();
  }, [user, loading]);

  return (
    <div className="home-content">
      <br />
      &nbsp;
      <Button
        variant="contained"
        style={{ background: "red", color: "white" }}
        onClick={logout}
      >
        <ExitToApp />
      </Button>
      &nbsp;
      <Button onClick={handletabs} variant="contained">
        {toggle ? <Person /> : <LocalCafe />}
      </Button>
      <center>
        <br />
      </center>
      <div>{toggle ? <Home /> : <Product />}</div>
    </div>
  );
}

export default Dashboard;
