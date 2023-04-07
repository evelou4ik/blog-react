import {useState} from 'react';

import AddNewPostForm from "./AddNewPostForm";
import Button from "../UI/Button/Button";

import formStyles from '../Posts/Posts.module.css'
import btnStyles from '../UI/Button/Button.module.css';

const AddNewPost = (props) => {
    const {onAddNewPost} = props;

    const [isCreateMode, setIsCreateMode] = useState(false);

    const showAddPostFormHandler = () => {
        setIsCreateMode(!isCreateMode);
    }

    return (
        <div className={`${formStyles["form-content"]}`}>
            {
                isCreateMode ?
                <AddNewPostForm onAddNewPost={onAddNewPost} onShowAddPostForm={showAddPostFormHandler}/>
                :
                <Button
                    className={`${btnStyles.btn}`}
                    typeButton={"button"}
                    onClickHandler={showAddPostFormHandler}>
                    Add New Post
                </Button>
            }
        </div>
    );
};

export default AddNewPost;