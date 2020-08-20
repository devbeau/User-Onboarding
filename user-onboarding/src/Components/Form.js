import * as yup from 'yup';
import axios from 'axios';
import React, { useState, useEffect} from 'react';
import formSchema from '../validation/formSchema';


function Form(props){

    const {userList, setUserList} = props

    const initialFormValues = {
        name: '',
        email: '',
        password: '',
        username: '',
        tos: false,
        role: '',
        birth: '',
    }

    const initialErrorValues = {
        name: '',
        email: '',
        password: '',
        username: '',
        tos: '',
    }

    let [formValues, setFormValues] = useState(initialFormValues);
    let [errorValues, setErrorValues] = useState(initialErrorValues);
    let [disabled, setDisabled] = useState(true);

    let optionalFields = ['birth']
    function onSubmit(event){
        event.preventDefault();
        const newUser = formValues;

        axios.post('https://reqres.in/api/users', newUser)
            .then(response => {
                console.log('axios post response:', response);
                setUserList([...userList, response.data]);
            })
            .catch(error => {
                console.log('axios post error!', error);
                debugger;
            })
            .finally(() => {
                setFormValues(initialFormValues);
            });
    }

    function updateChanges(inputName, inputValue){
        setFormValues({...formValues, [inputName]: inputValue})
    }

    function onChange(event){
        const {name, value} = event.target;
        validateChange(name, value);
        updateChanges(name, value);
    }

    function onCheckBoxChange(event){
        const {name, checked} = event.target;
        validateChange(name, checked);
        updateChanges(name, checked);
    }

    
    function validateChange(name, value){
        yup
        .reach(formSchema, name)
        .validate(value)
        .then(() => {
            setErrorValues({
                ...errorValues,
                [name]: ''
            });
        })
        .catch(error => {
            if (name === 'birth'){
                setDisabled(true);
            }
            setErrorValues({
                ...errorValues,
                [name]: error.errors[0]
            });
        });
    }
    
    useEffect(() => {
        let {birth, ...restOfValues} = formValues  
        
        formSchema.isValid(restOfValues)
            .then(valid => {
                setDisabled(!valid)
            })
            .catch(error => {
                console.log(error.error[0]);
            })
        
    }, [formValues])

    return (
        <form className='form-container' onSubmit={onSubmit}>
            <div className='input-container'>
                <label htmlFor='name'> Name:
                    <input
                        id='name'
                        name='name'
                        type='text'
                        value={formValues.name}
                        onChange={onChange}
                        placeholder='enter name...'
                    />
                </label>
                <label htmlFor='email'> Email:
                    <input
                        id='email'
                        name='email'
                        type='email'
                        value={formValues.email}
                        onChange={onChange}
                        placeholder='enter email...'
                    />
                </label>
                <label htmlFor='password'> Password:
                    <input
                        id='password'
                        name='password'
                        type='password'
                        value={formValues.password}
                        onChange={onChange}
                        placeholder='enter password...'
                    />
                </label>
                <label htmlFor='username'> Username:
                    <input
                        id='username'
                        name='username'
                        type='text'
                        value={formValues.username}
                        onChange={onChange}
                        placeholder='enter username...'
                    />
                </label>
                <label htmlFor='birth'> Birthday:
                    <input
                        id='birth'
                        name='birth'
                        type='date'
                        value={formValues.birth}
                        onChange={onChange}
                    />
                </label>
                <label htmlFor='role'> Role:
                    <select
                        id='role'
                        name='role'
                        value={formValues.role}
                        onChange={onChange}
                        placeholder='--Select A Role--'
                    >
                        <option value=''>--Select A Role--</option>
                        <option value='Student'>Student</option>
                        <option value='Team Lead'>Team Lead</option>
                        <option value='Instructor'>Instructor</option>
                    </select>
                </label>
                <label htmlFor='tos'> Terms of Service:
                    <input
                        id='tos'
                        name='tos'
                        type='checkbox'
                        checked={formValues.tos}
                        onChange={onCheckBoxChange}
                    />
                </label>
            </div>
            <div className='button-container'>
                <button disabled={disabled} className='submit-button'>
                    Submit
                </button>
                {Object.values(errorValues)
                    .filter(error => error !== '')
                    .map((error, ind) => <p key={ind} style={{color: 'red'}}>{error}</p>)}
            </div>
        </form>
    )
}
export default Form;