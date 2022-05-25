import React,{useContext, useState, useEffect} from 'react'
import styled from "styled-components"
import {BiCircle} from "react-icons/bi"
import {AuthContext} from "./AuthProvider"
import {app} from "../base"
const ColdPost = ({id,current,time}) => {
    const {currentUser} = useContext(AuthContext)
    const [data, setData] = React.useState([])

    const createHot = async ()=>{
        await app
        .firestore()
        .collection("post")
        .doc(id)
        .collection("hot")
        .doc(currentUser?.uid)
        .set({
            hotBy: currentUser.uid,
            toggle: true,
        })
    }

    const deleteCold = async ()=>{
        await app.firestore().colletion("post").doc(id).collection("cold").doc(currentUser?.uid).delete()
    }

const getCold = async ()=>{
    await app
    .firestore()
    .collection("post")
    .doc(id)
    .collection("cold").onSnapshot((snap)=>{
        const store = []
        snap.forEach((doc)=>{
            store.push({...doc.data(), id: doc.id})
        })
        setData(store)
    })
}

useEffect(()=>{
getCold()
},[])
    return (
        <IconAndText>
        <Cold/>
        <Text>Not Hot</Text>
    </IconAndText>
    )
}

export default ColdPost
const Text = styled.div`
font-size: 10px;
margin-left: 3px;
`


const Cold = styled(BiCircle)`
color: blue;
`
const IconAndText = styled.div`
display: flex;
align-items: center;
padding: 5px 10px;
cursor: pointer;
transition: all 350ms;
:hover{
    background-color: rgb(0,0,0,0.3);
}
`
const Image1 = styled.img`
width: 100%;
height: 250px;
/* border: solid 2px black; */
margin-top: 20px;
margin-bottom: 20px;
object-fit: cover;
`
const Image = styled.img`
width: 100%;
height: 300px;
margin-top: 20px;
margin-bottom: 20px;
object-fit: cover;
`
