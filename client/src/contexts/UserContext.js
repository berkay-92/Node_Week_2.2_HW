import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [postList, setPostList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [titleValueToBeUpdated, setTitleValueToBeUpdated] = useState("");
  const [contentValueToBeUpdated, setContentValueToBeUpdated] = useState("");
  const [id, setId] = useState("");

  const getPostList = async () => {
    const response = await fetch("http://localhost:4000/posts");
    const data = await response.json();
    setPostList(data);
  };

  useEffect(() => {
    getPostList();
  }, []);

  const getUserList = async () => {
    const response = await fetch("http://localhost:4000/users");
    const data = await response.json();
    setUserList(data);
  };

  useEffect(() => {
    getUserList();
  }, []);

  const handleClickAdd = async (pNewPost) => {
    await fetch("http://localhost:4000/posts", {
      method: "POST",
      body: JSON.stringify(pNewPost),
      headers: { "Content-Type": "application/json" },
    });

    await getPostList();
  };

  const handleClickCreateRandomPost = async () => {
    await fetch("http://localhost:4000/posts/faker", {
      method: "POST",
      body: JSON.stringify(),
      headers: { "Content-Type": "application/json" },
    });

    await getPostList();
  };

  const handleClickDelete = async (pId) => {
    await fetch("http://localhost:4000/posts/" + pId, {
      method: "DELETE",
    });

    await getPostList();
  };

  const handleClickEditPost = async (pPost, pId) => {
    await fetch("http://localhost:4000/posts/" + pId, {
      method: "PUT",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify(pPost),
    });

    await getPostList();
  };

  return (
    <UserContext.Provider
      value={{
        postList,
        userList,
        isEditing,
        setIsEditing,
        titleValueToBeUpdated,
        setTitleValueToBeUpdated,
        contentValueToBeUpdated,
        setContentValueToBeUpdated,
        id,
        setId,
        handleClickAdd,
        handleClickCreateRandomPost,
        handleClickDelete,
        handleClickEditPost,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
