import React,{useContext, useState, useEffect} from 'react'
import styled from "styled-components"
import {BsThreeDotsVertical} from "react-icons/bs"
import {app} from "../base"
import {AuthContext} from "./AuthProvider"
import moment from "moment"
const PostProfile = ({id, time}) => {
    const [data, setData] = useState([])

    const getData = async ()=>{
        await app.firestore().collection("newUser").doc(id).get().then((val)=>{
            setData(val.data())
        })
    }

    useEffect(()=>{
getData()
    },[])
    return (
        <ProfileComp>
        <ProfileAndName>
        <Profile src={data?.avatar}/>
        <NameAndDate>
            <UserName>{data?.name}</UserName>
            {/* <Time>{moment(time.toDate()).fromNow()}</Time> */}
        </NameAndDate>
        </ProfileAndName>
        <Rate>Rate: <span>2</span></Rate>
        <DotIcon/>
    </ProfileComp>
    )
}

export default PostProfile

const Rate = styled.div`
font-size: 15px;
color: black;
font-weight: bold;

span{
    color: red;
    font-size: 12px;
    }
`

const Time1 = styled.div`
font-size: 11px;
`
const UserName1 = styled.div`
font-size: 11px;
font-weight: bold;
`
const Time = styled.div`
font-size: 11px;
`
const UserName = styled.div`
font-size: 11px;
font-weight: bold;
`
const DotIcon = styled(BsThreeDotsVertical)`
display: flex;
align-items: center;
cursor: pointer;
`
const ProfileAndName1 = styled.div`
display: flex;
align-items: center;
`
const NameAndDate1 = styled.div`
display: flex;
flex-direction: column;
margin-left: 6px;
`

const ProfileAndName = styled.div`
display: flex;
align-items: center;
`
const NameAndDate = styled.div`
display: flex;
flex-direction: column;
margin-left: 6px;
`
const Profile1 = styled.img`
width: 40px;
height: 40px;
border: solid 2px black;
border-radius: 50%;
object-fit: cover;

`
const ProfileComp1 = styled.div`
display: flex;
justify-content: space-between;
width: 95%;
/* background-color: white; */
margin-top: 10px;
display: flex;
align-items: center;
`
const Profile = styled.img`
width: 45px;
height: 45px;
border: solid 2px black;
border-radius: 50%;
object-fit: cover;

`
const ProfileComp = styled.div`
display: flex;
justify-content: space-between;
width: 95%;
/* background-color: white; */
margin-top: 10px;
display: flex;
align-items: center;
`
