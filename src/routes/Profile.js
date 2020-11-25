import React, {useEffect} from "react";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "../fbase";

const Profile = ({userObj}) => {
  const history = useHistory();

  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  const getMyNweets = async() => {
    const nweets = await dbService.collection("nweets").where("creatorId", "==", userObj.uid).orderBy("createAt").get();
    console.log(nweets.docs.map(doc => doc.data()));
  }

  useEffect(()=> {
    getMyNweets();
  }, []);

  return (
    <>
      <button onClick={onLogOutClick}>LogOut</button>
    </>
  );
};

export default Profile;