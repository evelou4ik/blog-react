import React, {useState} from 'react';
import Button from "../UI/Button/Button";

import formStyles from '../Posts/Posts.module.css'
import btnStyles from '../UI/Button/Button.module.css';
import AddNewPostForm from "./AddNewPostForm";

const AddNewPost = ({onAddNewPost}) => {
    const [isCreateMode, setIsCreateMode] = useState(false);

    const onShowAddNewPostForm = () => {
        setIsCreateMode(!isCreateMode);
    }

    return (
        <div className={`${formStyles["form-content"]}`}>
            {isCreateMode ?
                <AddNewPostForm onAddNewPost={onAddNewPost}/> :
                <Button className={`${btnStyles.btn}`} typeButton={"button"} onClickHandler={onShowAddNewPostForm}>Add
                    New Post</Button>
            }
        </div>
    );
};

export default AddNewPost;