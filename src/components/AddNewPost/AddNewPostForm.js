import {useState} from 'react';
import uuid from 'react-uuid';
import Button from "../UI/Button/Button";

import formStyles from "../AddNewPost/AddNewPostForm.module.css"
import btnStyles from "../UI/Button/Button.module.css"


const AddNewPostForm = (props) => {
    const {onAddNewPost, onShowAddNewPostForm} = props;

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [user, setUser] = useState("");


    const titleEditHandler = (e) => {
        setTitle(e.target.value);
    }

    const bodyEditHandler = (e) => {
        setBody(e.target.value);
    }

    const userSelectHandler = (e) => {
        setUser(e.target.value);
    }

    const submitHandler = (e) => {
        e.preventDefault();

        const date = new Date().getTime();

        const postData = {
            "userId": Number(user),
            "id": uuid(),
            "title": title,
            "body": body,
            'dateOfCreate': date,
        }

        onAddNewPost(postData);
    }

    return (
        <form onSubmit={submitHandler}>
            <div className={formStyles["new-post__controls"]}>
                <div className={formStyles["new-post__control"]}>
                    <label>Title</label>
                    <input type="text" onChange={titleEditHandler}/>
                </div>
                <div className={formStyles["new-post__control"]}>
                    <label>Post body</label>
                    <textarea onChange={bodyEditHandler}/>
                </div>
                <div className={formStyles["new-post__control"]}>
                    <label>User</label>
                    <select defaultValue={1} onChange={userSelectHandler}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
            </div>
            <div className={formStyles["new-post__actions"]}>
                <Button className={btnStyles.btn} typeButton={"button"} onClickHandler={onShowAddNewPostForm}>Cancel</Button>
                <Button className={btnStyles.btn} typeButton={"submit"}>Add Post</Button>
            </div>
        </form>
    );
};

export default AddNewPostForm;

