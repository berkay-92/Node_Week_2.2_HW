import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { v4 as uuidv4 } from "uuid";

const Posts = () => {
  const {
    postList,
    isEditing,
    setIsEditing,
    id,
    setId,
    titleValueToBeUpdated,
    setTitleValueToBeUpdated,
    contentValueToBeUpdated,
    setContentValueToBeUpdated,
    handleClickAdd,
    handleClickCreateRandomPost,
    handleClickDelete,
    handleClickEditPost,
  } = useContext(UserContext);
  const [titleInput, setTitleInput] = useState("");
  const [contentInput, setContentInput] = useState("");

  const newPost = {
    id: uuidv4(),
    title: titleInput,
    content: contentInput,
  };

  const updatedPost = {
    id: id,
    title: titleValueToBeUpdated,
    content: contentValueToBeUpdated,
  };

  const handleUpdate = () => {
    handleClickEditPost(updatedPost, id);
    setIsEditing(false);
  };

  const handleEdit = (pId) => {
    setIsEditing(true);
    if (pId === postList.id) {
      setContentValueToBeUpdated(postList.content);
      setTitleValueToBeUpdated(postList.title);
    }
    setId(pId);
  };

  const showPostList = (post, index) => {
    let template = postList?.map((post, index) => (
      <div class="card m-3 ">
        <h5 class="card-header">{post.title}</h5>
        <div class="card-body">
          <p class="card-text">{post.content}</p>
          <button
            className="btn btn-danger"
            type="button"
            onClick={() => handleClickDelete(post.id)}
          >
            Delete
          </button>
          <button
            className="btn btn-warning"
            type="button"
            onClick={() => handleEdit(post.id)}
          >
            Edit
          </button>
          <div></div>
        </div>
      </div>
    ));
    return template;
  };

  return (
    <>
      <h1 className="mt-1">Add new Post</h1>
      {isEditing ? (
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label fw-bold">
              Title:
            </label>
            <input
              type="text"
              className="form-control"
              value={titleValueToBeUpdated}
              id="title"
              onChange={(e) => setTitleValueToBeUpdated(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="textarea" className="form-label fw-bold">
              Content:
            </label>
            <textarea
              className="form-control"
              id="textarea"
              value={contentValueToBeUpdated}
              rows="3"
              onChange={(e) => setContentValueToBeUpdated(e.target.value)}
            ></textarea>
          </div>
          <button
            type="button"
            className="btn btn-primary mb-2"
            onClick={() => handleUpdate()}
          >
            Update
          </button>
        </form>
      ) : (
        <form>
          <div className="justify-content-center mt-3 mb-4">
            <label className="mb-2">Title:</label>
            <input
              type="text"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              className="form-control"
            />
            <label className="mb-2">Content:</label>
            <input
              type="text"
              value={contentInput}
              onChange={(e) => setContentInput(e.target.value)}
              className="form-control"
            />
            <button
              type="button"
              onClick={() => {
                handleClickAdd(newPost);
              }}
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </form>
      )}
      <div>
        <button
          type="button"
          className="btn btn-success mb-4"
          onClick={handleClickCreateRandomPost}
        >
          generate a fake post
        </button>
      </div>
      {postList.length !== 0 ? showPostList() : ""}
    </>
  );
};

export default Posts;
