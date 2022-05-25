import React,{useState, useEffect, useContext} from 'react'
import styled from "styled-components"
import {AiOutlineClose} from "react-icons/ai"
import {NavLink, useNavigate} from "react-router-dom"
import img from "./images/avatar.png"
import {app} from "../base"
import firebase from "firebase"
import { AuthContext } from './AuthProvider'
const CreatePost = () => {
    const {currentUser} = useContext(AuthContext)
    const [image, setImage] = useState(`${img}`)
    const [avatar, setAvatar] = useState("")
    const [percent, setPercent] = useState(0)

const navigate = useNavigate()

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
          (error) => console.log(error),
    
          () => {
            storageRef.snapshot.ref.getDownloadURL().then((url) => {
              setAvatar(url);
              console.log(url);
            });
          }
        );
    }

    const pushData = async ()=>{
        await app.firestore().collection("post").doc().set({
            avatar,
            createdBy: currentUser.uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })

        navigate("/")
    }
    return (
        <Container>
            <Wrapper>
                <Card>
                   <Upper>
                   <CloseCircle to="/">
                   <Close/>
                   </CloseCircle>
                   </Upper>
                   <Head>Create a Post</Head>
                   <Image src={image}/>
                   <Upload htmlFor="pix">Upload Image</Upload>
                   <input type="file" id="pix" style={{display: "none"}} 
                   onChange={upload}
                   />
                   <Post onClick={pushData}>Post</Post>
                </Card>
            </Wrapper>
        </Container>
    )
}

export default CreatePost
const Post = styled.div`
width: 350px;
text-decoration: none;
height: 40px;
background-color: red;
color: white;
display: flex;
justify-content: center;
align-items: center;
margin-top: 20px;
cursor: pointer;
transform: scale(1);
transition: all 350ms;
:hover{
    transform: scale(1.02);
    background-color: gray;
}
`
const Upload = styled.label`
padding: 10px 70px;
background-color: black;
border-radius: 3px;
color: white;
font-size: 15px;
cursor: pointer;
transform: scale(1);
transition: all 350ms;
:hover{
    transform: scale(1.02);
    background-color: gray;
}
`
const Image = styled.img`
border-radius: 50%;
height: 160px;
width: 160px;
margin: 20px 0;
object-fit: cover;
`
const CloseCircle = styled(NavLink)`
display: flex;
width: 25px;
justify-content: center;
text-decoration: none;
align-items: center;
height: 25px;
color: white;
border-radius: 50%;
cursor: pointer;
color: black;
transition: all 350ms;
font-size: 13px;

:hover{
    background-color: red;
    color: white;
}
`
const Upper = styled.div`
display: flex;
margin-top: 10px;
margin-bottom: 10px;
width: 90%;
justify-content:flex-end;
`
const Close = styled(AiOutlineClose)`
font-size: 20px;

`
const Head = styled.div`
font-size: 17px;
letter-spacing: 0.3px;
color: red;
display: flex;
margin-bottom: 10px;
`
const Card = styled.div`
width: 500px;
height: 400px;
background-color: white;
box-shadow: 1px 1px 5px 1px lightgray;
border-radius: 5px;
display: flex;
align-items: center;
flex-direction: column;
`
const Wrapper = styled.div`
display: flex;

`
const Container = styled.div`
width: 100%;
min-height: 100vh;
height: 100%;
background-color: #eee;
display: flex;
justify-content: center;
align-items: center;
`
