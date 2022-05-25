import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import * as yup from "yup"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import {app} from "../base"

const Login = () => {
    const navigate = useNavigate()
    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required(),
    })

    const {register, handleSubmit, formState: {errors}, reset} = useForm({resolver: yupResolver(schema)})

    const done = handleSubmit(async(data)=>{
        console.log(data)
        const {email, password} = data
        await app.auth().signInWithEmailAndPassword(email,password)


        navigate("/")
        reset()
    })
    return (
        <Container>
        <Wrapper>
          <Card onSubmit={done}>
              <Text>Login into your account</Text>
              <SubTopic>Just an image away</SubTopic>
              <InputsContainer>
                  <Name placeholder="Please enter your email"
                  {...register("email")}/>
                  <Name placeholder="Please enter your password"
                  {...register("password")}/> 
              </InputsContainer>
              <Button type="submit">Sign Up</Button>
              <Already>
                  Don't have an account with Hot or Not?
                  <Nav to="/signup">Sign up</Nav>
                   </Already>
          </Card>
        </Wrapper>
      </Container>
    )
}

export default Login

const Nav = styled(NavLink)`
margin-left: 3px;
color: red;
font-weight: bold;
cursor: pointer;
text-decoration: none;
`
const Already = styled.div`
font-size: 13px;
color: lightgray;
display: flex;
margin-bottom: 20px;
@media screen and (max-width:376px){
    font-size: 11px;
}
`
const Button = styled.button`
padding: 8px 35px;
background-color: whitesmoke;
cursor: pointer;
font-size: 13px;
/* margin-top: 25px; */
transform: scale(1);
transition: all 350ms;
border-radius: 3px;
outline: none;
border: none;
margin-top: 40px;
margin-bottom: 15px;
:hover{
    transform: scale(1.02);
    background-color: gray;
    color: lightgray;
}
@media screen and (max-width:376px){
    margin-top: 30px;
    margin-bottom: 20px;
}

`

const Select = styled.select`
height: 30px;
`
const Date = styled.input`
display: flex;
flex: 1;
height: 30px;
`
const Label = styled.div`
font-size: 10px;
margin-bottom: 7px;
color: white;

/* font-weight: bold; */

`
const TextAndInput = styled.div`
width: ${({wd})=>wd};
display: flex;
flex-direction: column;
@media screen and (max-width:376px){
    width: ${({md})=>md};
}
`
const DateAndGender = styled.div`
/* background-color: green; */
display: flex;
width: 90%;
/* height: 35px; */
/* background-color:green; */
margin-top: 20px;
justify-content: space-between;
@media screen and (max-width:376px){
    /* margin-top:20px;  */
}
`
const Name = styled.input`
width: 97%;
height: 33px;
background-color: transparent;
border: none;
outline: 2px solid white;
padding-left: 10px;
margin: 13px 0;
color: white;
border-radius: 3px;
::placeholder{
color: lightgray;
font-size: 10px;
}
@media screen and (max-width:376px){
    margin: 11px 0;
}
`
const InputsContainer = styled.div`
margin-top: 30px;
width: 90%;
border-top: 2px solid lightgray;
border-bottom: 2px solid lightgray;
padding: 20px 0;
@media screen and (max-width:376px){
    margin-top: 25px;
    padding: 10px 0;
}
`
const SubTopic = styled.div`
font-size: 12px;
margin-top: 5px;
color: red;
`
const Text = styled.div`
color: white;
margin-top: 20px;
font-weight: bold;
font-size: 18px;
letter-spacing: 0.3px;

`
const Card = styled.form`
width: 350px;
height: 100%auto;
display: flex;
background-color: blue;
overflow: hidden;
border-radius: 10px;
flex-direction: column;
align-items: center;
@media screen and (max-width:376px){
    width: 320px;
}
@media screen and (max-width:376px){
    width: 90%;
}
@media screen and (max-width:376px){
    /* height: 480px; */
}
`
const Wrapper = styled.div`
width: 100%;
height: 100%;
display: flex;
justify-content: center;
/* align-items: center; */
`
const Container = styled.div`
width: 100%;
min-height: 100vh;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
`