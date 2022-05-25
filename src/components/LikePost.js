import React,{useState, useEffect, useContext} from 'react'
import styled from "styled-components"
import {AiOutlineHeart,AiTwotoneHeart} from "react-icons/ai"
import {app} from "../base"
import {AuthContext} from "./AuthProvider"
const LikePost = ({id, current, time}) => {

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


    const deleteHot = async ()=>{
        await app.firestore().colletion("post").doc(id).collection("hot").doc(currentUser?.uid).delete()
    }


const getHot = async ()=>{
    await app
    .firestore()
    .collection("post")
    .doc(id)
    .collection("hot").onSnapshot((snap)=>{
        const store = []
        snap.forEach((doc)=>{
            store.push({...doc.data(), id: doc.id})
        })
        setData(store)
    })
}


useEffect(()=>{
getHot()
},[])


    return (
       <div>
           {data.every((el)=>el.id !== currentUser.uid)? 
           <IconAndText onClick={createHot}>
        <Hot/>
        <Text>Hot</Text>
    </IconAndText>  : 
           <div>
           {data?.map((props)=>(
                <div>
                    {props.hotBy === currentUser.uid? (
                        <div>
                            {props.toggle? 
                            <IconAndText onClick={deleteHot}>
                            <Hot1/>
                            <Text>Hot</Text>
                        </IconAndText> : 
                        <IconAndText 
                        onClick={createHot}>
                            <Hot/>
                            <Text>Hot</Text>
                            </IconAndText> }
                        </div>
                    )
    : null}
                </div>
           ))}
           </div>}
    
        {/* <IconAndText onClick={deleteHot}>
        <Hot1/>
        <Text>Hot</Text>
    </IconAndText> */}
       </div>
    )
}

export default LikePost
const Text = styled.div`
font-size: 10px;
margin-left: 3px;
`

const Hot1 = styled(AiTwotoneHeart)`
color: red;
`
const Hot = styled(AiOutlineHeart)`
color: red;
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