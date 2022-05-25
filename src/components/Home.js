import React,{useContext, useState,useEffect} from 'react'
import styled from "styled-components"
import {MdCreateNewFolder} from "react-icons/md"
import {BiCircle} from "react-icons/bi"
import {BsThreeDotsVertical} from "react-icons/bs"
import {AiTwotoneHeart,AiOutlineHeart} from "react-icons/ai"
import {FaCircle} from "react-icons/fa"
import {NavLink} from "react-router-dom"
import Header from './Header'
import {app} from "../base"
import {AuthContext} from "./AuthProvider"
import moment from "moment"
import PostProfile from './PostProfile'
import LikePost from './LikePost'
import ColdPost from './ColdPost'

const Home = () => {
    const {currentUser} = useContext(AuthContext)

    const [data, setData] = useState([])

    const getData = async ()=>{
        await app.firestore().collection("post").onSnapshot((snapshot)=>{
            const store = []
            snapshot.forEach((doc)=>{
                    store.push({...doc.data(), id: doc.id})
            })
            setData(store)
        })
    }

    useEffect(()=>{
getData()
console.log(data)
    },[])
    return (
        <Container>
            <Header/>
            <Wrapper>
                <InfoCard>
                    <InfoHeading>
                        How to use Hot or NOt 
                    </InfoHeading>
                    <Instructions>
                        After login into your account you 
                    </Instructions>
                    <TheList>
                        <li>Create a post</li>
                        <li>Add a sexy image of yourself</li>
                        <li>Like friends and your image Hot or Not</li>
                        <li>Want to meet an Hot friend? Click Meet me</li>
                        <li>The Hottest friend got to be posted on every page</li>
                    </TheList>
                </InfoCard>
                <PostCard>
                   <PostComp to="/createpost">
                       <Head>Create a post</Head>
                       <PostIcon>
                           <TheIcon/>
                       </PostIcon>
                       {/* <Input/> */}
                   </PostComp>
                   <PostedCardHolder>
                   {data?.map((props)=>(
                       <PostedCard>
                       <PostProfile id={props.createdBy} time={props.createdAt}/>
                       <Image src={props.avatar}/>
                       <IconComp>
                           <LikePost id={props.id} current={props.createdBy} time={props.createdAt}/>
                           <Meet to={`meetme/${props.id}`}>Meet me</Meet>
                           <ColdPost id={props.createdBy} time={props.createdAt} current={props.createdBy}/>
                       </IconComp>
                   </PostedCard>
                   ))}
                   </PostedCardHolder>
                </PostCard>
                <SuccessCard>
                <PostedCard1>
                           <ProfileComp1>
                               <ProfileAndName1>
                               <Profile1/>
                               <NameAndDate1>
                                   <UserName1>Confidence Efem</UserName1>
                                   <Time1>2mins ago</Time1>
                               </NameAndDate1>
                               </ProfileAndName1>
                           </ProfileComp1>
                           <Image1/>
                           <IconComp1>
                           <IconAndText>
                                   <Hot1/>
                                   <Text>19</Text>
                               </IconAndText>
                               <Meet1 to="/meetme">Meet me</Meet1>
                               <IconAndText>
                                   <Cold1/>
                                   <Text>2</Text>
                               </IconAndText>
                           </IconComp1>
                       </PostedCard1>
                </SuccessCard>
            </Wrapper>
        </Container>
    )
}

export default Home
const TheList = styled.div`
width: 90%;
font-size: 14px;
li{
    margin: 5px 0;
}`
const Instructions = styled.div`
font-size: 14px;
margin-top: 5px;
width: 90%;
margin-bottom: 10px;
`
const InfoHeading = styled.div`
margin-top: 20px;
font-size: 15px;
color: red;
width: 90%;
font-weight: bold;
/* text-align: left; */
`
const IconComp1 = styled.div`
display: flex;
width: 95%;
justify-content: space-between;
margin-bottom: 20px;
`
const IconComp = styled.div`
display: flex;
width: 95%;
justify-content: space-between;
margin-bottom: 20px;
`
const Meet1 = styled(NavLink)`
padding: 5px 10px;
background-color: red;
border-radius: 3px;
cursor: pointer;
color: white;
font-size: 14px;
transform: scale(1);
transition: all 350ms;
text-decoration: none;
:hover{
    transform: scale(1.01);
}
`
const Meet = styled(NavLink)`
padding: 5px 10px;
text-decoration: none;
background-color: red;
border-radius: 3px;
cursor: pointer;
color: white;
font-size: 14px;
transform: scale(1);
transition: all 350ms;
:hover{
    transform: scale(1.01);
}
`

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
const Cold1 = styled(FaCircle)`
color: blue;
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
const PostedCard1 = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
box-shadow: 1px 1px 5px 1px lightgray;
/* margin: 10px 0; */
`
const PostedCard = styled.div`
width: 100%;
height: 100%auto;
background-color: whitesmoke;
display: flex;
flex-direction: column;
align-items: center;
box-shadow: 1px 1px 5px 1px lightgray;
margin: 10px 0;
`
const PostedCardHolder = styled.div`
display: flex;
flex-direction: column;
align-items: center;
flex-wrap: wrap;
width: 100%;
`
const TheIcon = styled(MdCreateNewFolder)``
const PostIcon = styled.div`
width: 40px;
height: 40px;
border-radius: 50%;
color: white;
background-color: rgb(255, 255, 255,0.3);
display: flex;
justify-content: center;
align-items: center;
`
const Input = styled.input``
const Head = styled.div`
margin-top: 20px;
font-size: 14px;
font-family: Arial, Helvetica, sans-serif;
color: white;
margin-bottom: 10px;
`
const PostComp = styled(NavLink)`
width: 100%;
display: flex;
flex-direction: column;
text-decoration: none;
align-items: center;
height: 120px;
background-color: blue;
justify-content: center;
transform: scale(1);
transition: all 350ms;
cursor: pointer;
:hover{
    transform: scale(1.02);
}
margin-bottom:50px;
`
const SuccessCard = styled.div`
width: 350px;
height: 380px;
background-color: whitesmoke;
box-shadow: 1px 1px 5px 1px lightgray;
border-radius: 5px;
display: flex;
flex-direction: column;
align-items: center;
display: flex;
`
const InfoCard = styled.div`
width: 400px;
height: 230px;
background-color: whitesmoke;
box-shadow: 1px 1px 5px 1px lightgray;
border-radius: 5px;
display: flex;
flex-direction: column;
align-items: center;
display: flex;

`
const PostCard = styled.div`
width: 500px;
/* height: 200px; */
/* background-color: whitesmoke; */
/* box-shadow: 1px 1px 5px 1px lightgray; */
border-radius: 5px;
display: flex;
flex-direction: column;
align-items: center;
`
const Wrapper = styled.div`
width: 95%;
display: flex;
justify-content: space-between;
margin-top: 20px;
`
const Container = styled.div`
width: 100%;
min-height: 100vh;
height: 100%;
background-color: #eee;
display: flex;
align-items: center;
flex-direction: column;

`