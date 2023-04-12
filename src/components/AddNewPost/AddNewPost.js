import {useState} from 'react';
import {useNavigate} from "react-router-dom";

import AddNewPostForm from "./AddNewPostForm";
import Button from "../UI/Button/Button";

import formStyles from '../Posts/Posts.module.css'
import btnStyles from '../UI/Button/Button.module.css';

const AddNewPost = (props) => {
    const {onAddNewPost, urls} = props;

    const [isCreateMode, setIsCreateMode] = useState(false);

    const navigate = useNavigate()

    const showAddPostFormHandler = () => {
        setIsCreateMode(!isCreateMode);

        if(isCreateMode) {
            navigate(`${urls.urlInitial}`)
            return;
        }

        navigate('/create')
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