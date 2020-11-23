import React, { useState } from "react";
import { dbService } from "../fbase";

const Nweet = ({nweetObj, isOwner}) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    if(ok) {
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
    }
  };

  const onEditClick = async () => {
    toggleEditing();
  };
  
  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`nweets/${nweetObj.id}`).update({
      text: newNweet,
    });
    toggleEditing();
  };

  const onChange = (event) => {
    const {
      target: {value},
    } = event;
    setNewNweet(value);
  };

  return(
    <div>
      {
        editing ? 
        <>
          <form onSubmit={onSubmit}>
            <input type="text" onChange={onChange} placeholder="Edit your nweet" value={newNweet} required/>
            <input type="submit" value="Update Nweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
        : 
        <>
          <h4>{nweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onEditClick}>Edit</button>
              <button onClick={onDeleteClick}>Delete</button>
            </>
          )}   
        </>
      }

    </div>
  );
}

export default Nweet;
