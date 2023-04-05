import React, {useState} from 'react';
import Button from "../UI/Button/Button";

import formStyles from "../AddNewPost/AddNewPostForm.module.css"
import btnStyles from "../UI/Button/Button.module.css"


const AddNewPostForm = ({onAddNewPost}) => {
    const [enteredTitlePost, setEnteredTitlePost] = useState("");
    const [enteredBodyPost, setEnteredBodyPost] = useState("");
    const [enteredUser, setUser] = useState("");

    const titleChangeHandler = (e) => {
        setEnteredTitlePost(e.target.value)
    }

    const bodyChangeHandler = (e) => {
        setEnteredBodyPost(e.target.value)
    }

    const userChangeHandler = (e) => {
        setUser(e.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault();

        const postData = {
            "userId": Number(enteredUser),
            "id": new Date().getTime(),
            "title": enteredTitlePost,
            "body": enteredBodyPost,
            'dateOfCreate': new Date().getTime(),
        }

        onAddNewPost(postData)
    }

    return (
        <form>
            <div className={formStyles["new-post__controls"]}>
                <div className={formStyles["new-post__control"]}>
                    <label>Title</label>
                    <input type="text" onChange={titleChangeHandler}/>
                </div>
                <div className={formStyles["new-post__control"]}>
                    <label>Post body</label>
                    <textarea onChange={bodyChangeHandler}/>
                </div>
                <div className={formStyles["new-post__control"]}>
                    <label>User</label>
                    <select defaultValue={1} onChange={userChangeHandler}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
            </div>
            <div className={formStyles["new-post__actions"]}>
                <Button className={btnStyles.btn} typeButton={"button"}>Cancel</Button>
                <Button className={btnStyles.btn} typeButton={"submit"} onClickHandler={submitHandler}>Add Post</Button>
            </div>
        </form>
    );
};

export default AddNewPostForm;

