import React,{useState, useContext, useEffect} from 'react'
import styled from 'styled-components'
import img from "./images/avatar.png"
import * as yup from "yup"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import {app} from "../base"
import firebase from "firebase"
import {NavLink, useNavigate} from "react-router-dom"
import {AuthContext} from "./AuthProvider"

const AddImage = () => {
    const navigate = useNavigate()
    const {currentUser} = useContext(AuthContext)
    const [image, setImage] = useState(`${img}`)
    const [avatar, setAvatar] = useState("")
    const [percent, setPercent] = useState(0)

    const upload = async (e)=>{
        const file = e.target.files[0]
        const save = URL.createObjectURL(file)
        setImage(save)

        const fileRef = await app.storage().ref();
        const storageRef = fileRef.child("userImage/" + file.name).put(file);
    
        storageRef.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot) => {
            const counter = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setPercent(counter);
            console.log(counter);
          },
          (error) => console.log(errors),
    
          () => {
            storageRef.snapshot.ref.getDownloadURL().then((url) => {
              setAvatar(url);
              console.log(url);
            });
          }
        );
    }

    const schema = yup.object().shape({
        gender: yup.string().required(),
        marital: yup.string().required(),
        school: yup.string().required(),
        searching: yup.string().required(),
    })

    const {register, handleSubmit, formState: {errors}, reset} = useForm({resolver: yupResolver(schema)})

    const done = handleSubmit(async (data)=>{
        console.log(data)
        const {gender, marital, school, searching} = data

        // await app.firestore().collection("newUser").doc(currentUser.uid).update({
        //     avatar,
        // })

        await app.firestore().collection("userDatas").doc(currentUser?.uid).collection("details").doc(currentUser?.uid).set({
            gender,
            marital, 
            school,
            searching
        })
        navigate("/")
        reset()
    })

  
    return (
        <Container>
            <Wrapper>
                <Card onSubmit={done}>
                    <Profile src={image}/>
                    <Upload htmlFor="pix">Upload Profile </Upload>
                    <input type="file" id="pix" style={{display: "none"}} onChange={upload}/>
                    <Ask>Dear Confidence, please fill the required field</Ask>
                    <InputHolders>
                        <LabelAndIcon>
                            <Label>Gender:</Label>
                            <Input {...register("gender")}>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Others</option>
                            </Input>
                        </LabelAndIcon>
                        <LabelAndIcon>
                            <Label>Marital Status:</Label>
                            <Input {...register("marital")}>
                                <option>Married</option>
                                <option>Single</option>
                            </Input>
                        </LabelAndIcon>
                        <LabelAndIcon>
                            <Label>Completed School:</Label>
                            <Input {...register("school")}>
                                <option>Yes</option>
                                <option>No</option>
                            </Input>
                        </LabelAndIcon>
                        <LabelAndIcon>
                            <Label>Searching:</Label>
                            <Input {...register("searching")}>
                                <option>Yes</option>
                                <option>No</option>
                            </Input>
                        </LabelAndIcon>
                    </InputHolders>
                    <Continue type="submit">Submit</Continue>
                </Card>
            </Wrapper>
        </Container>
    )
}

export default AddImage
const Continue = styled.button`
padding: 8px 40px;
background-color: black;
color: white;
font-size: 13px;
border-radius: 3px;
cursor: pointer;
border: none;
outline: none;
margin-top: 20px;
transition: all 350ms;
:hover{
    background-color: lightgray;
}
`
const Input = styled.select`
width: 350px;
height: 33px;
option{
    font-size: 13px;
}

`
const Label = styled.div`
font-size: 12px;
color: red;
font-weight: bold;
margin-bottom: 5px;

`
const LabelAndIcon = styled.div`
display: flex;
flex-direction: column;
margin: 15px 0;
`
const InputHolders = styled.div``
const Ask = styled.div`
font-size: 13px;
color: red;
margin-bottom: 20px;
font-weight: bold;
`
const Upload = styled.label`
padding: 8px 70px;
cursor: pointer;
background-color: black;
color: white;
font-size: 13px;
margin-bottom: 30px;
border-radius: 20px;
cursor: pointer;
`
const Profile = styled.img`
width: 150px;
height: 150px;
border-radius: 50%;
object-fit: cover;
margin-top: 20px;
margin-bottom: 10px;
`
const Card = styled.form`
width: 400px;
height: 650px;
background-color: white;
margin-top: 40px;
display: flex;
align-items: center;
flex-direction: column;
`
const Wrapper = styled.div`
width: 100%;
display: flex;
justify-content:center;
`
const Container = styled.div`
width: 100%;
min-height: 100vh;
height: 100%;
display: flex;
background-color: #eee;
`
