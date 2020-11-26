import React, {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "../fbase";

const Profile = ({userObj, refreshUser}) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

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

  const onChange = (event) => {
    const {
      target: {value},
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if(userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input className="formInput" autoFocus type="text" value={newDisplayName} onChange={onChange} placeholder="display name" required/>
        <input className="formBtn" type="submit" value="Update Profile" style={{
            marginTop: 10,
          }}/>
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        LogOut
      </span>
    </div>
  );
};

export default Profile;