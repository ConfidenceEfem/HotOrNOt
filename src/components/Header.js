import React,{useContext, useState, useEffect} from 'react'
import styled from "styled-components"
import {AuthContext} from "./AuthProvider"
import {app} from "../base"
import {NavLink, useNavigate} from "react-router-dom"
import logo from "./images/logo.jpg"
const Header = () => {
    const navigate = useNavigate()
    
    const {msg,currentUser} = useContext(AuthContext)

    const [data, setData] = useState([])

    
    const getData = async ()=>{
        await app.firestore().collection("newUser").doc(currentUser?.uid).get().then((val)=>{
            setData(val.data())
        })
    }

    useEffect(()=>{
        getData()
    },[])
    
    return (
        <Container>
            <Wrapper>
               <LogoHolder>
               <Logo src={logo}/>
               </LogoHolder>
               <RightItems>
                   <Name>{data?.name}</Name>
                   <Image src={data?.avatar}/>
                   <Logout onClick={async ()=>{
                        await app.auth().signOut()

                        navigate("/signup")
                   }}>Logout</Logout>
               </RightItems>
            </Wrapper>
        </Container>
    )
}

export default Header
const Logout = styled.div`
padding: 8px 50px;
background-color: black;
font-size: 14px;
color: white;
border-radius: 4px;
`
const Image = styled.img`
width: 40px;
height: 40px;
border-radius: 50%;
object-fit: cover;
/* background-color: red; */
margin: 0 20px;
`
const Name = styled.div`
font-size: 15px;
font-weight: bold;

`
const RightItems = styled.div`
display: flex;
align-items: center;
`
const Logo = styled.img`
width: 180px;
height: 40px;
object-fit: cover;
/* background-color: red; */
`
const LogoHolder = styled.div`
display: flex;
flex: 1;
align-items: center;
`
const Wrapper = styled.div`
width: 90%;
display: flex;
`
const Container = styled.div`
width: 100%;
height: 80px;
background-color: white;
box-shadow: 1px 1px 5px 1px lightgray;
display: flex;
justify-content: center;
/* position: fixed; */
/* align-items: center; */
`