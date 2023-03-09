import React from "react";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";

const Users = () => {
  const { userList } = useContext(UserContext);
  const [mail, setMail] = useState("");

  const showUsersList = () => {
    let template = userList?.map((user, index) => (
      <li className="m-3">
        {user.name}
        <button
          className="btn btn-success m-1"
          type="button"
          onClick={() => handleClickUser(user.email)}
        >
          select
        </button>
      </li>
    ));
    return template;
  };

  const handleClickUser = (pEmail) => {
    setMail(pEmail);
  };

  return (
    <div>
      <h1>Users</h1>
      {showUsersList()}
      <p className="m-3">{mail && `Email of the selected user: ${mail}`}</p>
    </div>
  );
};

export default Users;
