import React,{useState,useEffect,useContext} from 'react'
import styled from 'styled-components'
import img from "./images/avatar.png"
import {MdCreateNewFolder} from "react-icons/md"
import {BiCircle} from "react-icons/bi"
import {BsThreeDotsVertical} from "react-icons/bs"
import {AiTwotoneHeart,AiOutlineHeart,AiFillHome} from "react-icons/ai"
import {FaCircle} from "react-icons/fa"
import {NavLink,useParams} from "react-router-dom"
import {app} from "../base"
import Header from './Header'
import {AuthContext} from "./AuthProvider"
import Slider from "@mui/material/Slider";
import PostProfile from './PostProfile'


const MeetMe = () => {
    const {id} = useParams()

    const {currentUser} = useContext(AuthContext)
    const [postData, setPostData] = useState([])
    const [data, setData] = useState([])
    const  [personalPost, setPersonalPost] = useState([])
    const [detailsData, setDetailsData] = useState([])
    const [image, setImage] = useState(`${img}`)
    const [valueHolder, setValueHolder] = useState(0);

    const getPersonalPost = async()=>{
      await app.firestore().collection("post").doc(id).get().then((val)=>{
        setPersonalPost(val.data())
      })
    }


const getData = async ()=>{
    await app.firestore().collection("newUser").doc().get().then((val)=>{
        setData(val.data())
    })
}

const getDetails = async ()=>{
    await app.firestore().collection("userDatas").doc(id).collection("details").doc(id).get()
    .then((val)=>{
            setDetailsData(val.data())
    })
}

const getPostData = async ()=>{
    await app.firestore().collection("post").onSnapshot((snap)=>{
        const store = []
        snap.forEach((doc)=>{
            store.push({...doc.data(), id: doc.id})
        })
        setPostData(store)
    })
}


useEffect(()=>{
    getData()
    getDetails()
    console.log(detailsData)
    getPostData()
},[])

useEffect(()=>{
getData()
console.log(data)
},[])

useEffect(()=>{
  getPersonalPost()
  console.log(personalPost)
},[])

const marks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 10,
      label: "1",
    },
    {
      value: 20,
      label: "2",
    },
    {
      value: 30,
      label: "3",
    },
    {
      value: 40,
      label: "4",
    },
    {
      value: 50,
      label: "5",
    },
    {
      value: 60,
      label: "6",
    },
    {
      value: 70,
      label: "7",
    },
    {
      value: 80,
      label: "8",
    },
    {
      value: 90,
      label: "9",
    },

    {
      value: 100,
      label: "10",
    },
  ];

  const valuetext = (value) => {
    return `${value}°C`;
  };

  
    return (
        <Container>
            <Header/>
            <Wrapper>
                {/* <Left></Left> */}
                <Right>
                    <Upright bg={personalPost?.avatar}>
                        <ProfileImage src={data?.avatar}/>
                        <Name>Confidence</Name>

                    </Upright>
                    <Slide>
          <Slider
            color="secondary"
            aria-label="Always visible"
            defaultValue={8}
            getAriaValueText={valuetext}
            step={10}
            marks={marks}
            valueLabelDisplay="off"
            onChange={(e) => {
              setValueHolder(e.target.value);
            }}
          />
        </Slide>

        <Vote
          bg="#004080"
          cl="white"
          onClick={() => {
            console.log("show: ", valueHolder);
          }}
        >
          Vote
        </Vote>
                    <InfoHolder>
                    <Infos>
                        Gender: <span>{detailsData?.gender}</span>
                    </Infos>
                    <Infos>
                        Marital Status: <span>{detailsData?.marital}</span>
                    </Infos>
                    <Infos>
                        Completed School: <span>{detailsData?.school}</span>
                    </Infos>
                    <Infos>
                        Searching: <span>{detailsData?.searching}</span>
                    </Infos>
                    </InfoHolder>
                    <Details>
                        <IconAndText>
                            <Icon/>
                            <Text>Lives in <span>Lagos Nigeria</span></Text>
                        </IconAndText>
                    </Details>
                    <AddDetailsHolder>
                    <AddDetails>
                        <PicText>
                            <AddIconCircle>
                                <AddIcon/>
                            </AddIconCircle>
                            <TopicContent>
                                <Topic>Where did you go to high school?</Topic>
                                <Content>
                                To bring teens to Christ and mature them for excellence in life and ministry through serial exposure to the Word of God and Life Workshops.
                                </Content>
                            </TopicContent>
                        </PicText>
                        <Buttons>
                            <AddName>Add School</AddName>
                        </Buttons>
                    </AddDetails>
                    </AddDetailsHolder>
                    <EditProfile to="/edit">Edit Profile</EditProfile>
                    {/* <PostComp>
                        <PostCard>
                        {postData?.map((props)=>(
                            <div>
                                {props.createdBy === currentUser?.uid?
                                <PostedCard1>
                                <ProfileComp1>
                                    <ProfileAndName1>
                                    <Profile1/>
                                    <NameAndDate1>
                                        <UserName1>Confidence Efem</UserName1>
                                        <Time1>2mins ago</Time1>
                                    </NameAndDate1>
                                    </ProfileAndName1>
                                </ProfileComp1> */}
                                {/* <PostProfile /> */}
                                {/* <Image1 src={props.avatar}/>
                                <IconComp1>
                                <IconAndText1>
                                        <Hot1/>
                                        <Text1>19</Text1>
                                    </IconAndText1>
                
                                    <IconAndText1>
                                        <Cold1/>
                                        <Text1>2</Text1>
                                    </IconAndText1>
                                </IconComp1>
                            </PostedCard1>: null} */}
                            {/* </div> */}
                        {/* ))} */}
                        {/* </PostCard> */}
                    {/* </PostComp> */}
                </Right>
            </Wrapper>
        </Container>
    )
}

export default MeetMe

const Vote = styled.div`
  font-size: 13px;
  text-decoration: none;
  padding: 15px 35px;
  margin: 20px 10px;
  background-color: ${({ bg }) => bg};
  color: ${({ cl }) => cl};
  font-weight: bold;
  border-radius: 3px;
  transition: all 350ms;
  transform: scale(1);
  text-transform: uppercase;

  :hover {
    cursor: pointer;
    transform: scale(1.012);
  }
`;

const Slide = styled.div`
  margin: 10px 0;
  width: 300px;
`;

const IconComp1 = styled.div`
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


const Text1 = styled.div`
font-size: 10px;
margin-left: 3px;
`
const Hot1 = styled(AiTwotoneHeart)`
color: red;
`
const Cold1 = styled(FaCircle)`
color: blue;
`
const IconAndText1 = styled.div`
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
`
const Time1 = styled.div`
font-size: 11px;
`
const UserName1 = styled.div`
font-size: 11px;
font-weight: bold;
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










const PostCard = styled.div`
width: 50%;
display: flex;
align-items: center;
display: flex;
flex-direction: column;
`
const PostComp = styled.div`
width: 100%;
display: flex;
flex-wrap: wrap;
justify-content:center;
margin-bottom: 30px;
`
const TopicContent = styled.div`
width: 80%;
`
const Content = styled.div`
font-size: 13px;
`
const Topic = styled.div`
font-weight: bold;
font-size: 16px;
margin-bottom: 5px;

`
const AddName = styled.div`
display:flex;
padding: 8px 20px;
cursor: pointer;
background-color: blue;
font-size: 12px;
transform: sclae(1);
transition: all 350ms;
:hover{
    transform: scale(1.02);
}
`
const AddIcon = styled.div``
const AddIconCircle = styled.div`
width: 40px;
height: 40px;
border-radius: 50%;
background-color: rgb(0,0,255,0.7);
/* margin-right: 8px; */

`
const AddDetailsHolder = styled.div`
width: 90%;
display: flex;
margin: 20px 0;
`
const Buttons = styled.div`
display: flex;
width: 60%;
align-items: center;
/* background-color: blue; */
height: 35px;
color: white;
justify-content: center;
border-radius: 3px;
`
const PicText = styled.div`
display: flex;
width: 90%;
margin-top: 15px;
justify-content: space-between;
margin-bottom: 15px;
`
const AddDetails = styled.div`
width: 300px;
height: 200px;
background-color: #eee;
display: flex;
flex-direction: column;
align-items: center;
border-radius: 8px;
`
const EditProfile = styled(NavLink)`
border-radius: 5px;
width:70%;
text-decoration:none;
background-color: lightgray;
display: flex;
cursor: pointer;
height: 40px;
margin-bottom: 30px;
justify-content: center;
align-items: center;
font-size: 12px;
color: blue;
transform: scale(1);
margin-top: 20px;
transition: all 350ms;
:hover{
    background-color: #eee;
    transform: scale(1.03);

}
`
const Text = styled.div`
font-size: 15px;
span{
    font-weight: bold;
}
`
const Icon = styled(AiFillHome)`
font-size: 18px;
margin-right: 10px;
color: blue;
`
const IconAndText = styled.div`
display: flex;
align-items: center;
margin: 12px 0;
`
const Details = styled.div`
width: 90%;
display: flex;
flex-direction: column;
margin-top: 20px;
margin-bottom: 20px;
`
const InfoHolder = styled.div`
width: 90%;
display: flex;
flex-wrap: wrap;
justify-content: center;
`
const Infos = styled.li`
font-size: 16px;
margin:10px  20px;
span{
    font-weight: bold;
}
::placeholder{
    color: blue;
}
`
const Name = styled.div`
font-size: 18px;
width: 100%;
display: flex;
justify-content: center;
margin-top: 100px;
font-weight: bold;
margin-bottom: 30px;
`
const ProfileImage = styled.img`
width: 180px;
height: 180px;
border-radius: 50%;
position: absolute;
top: 150px;
left: 380px;
object-fit: cover;
`
const Upright = styled.div`
width: 100%;
height: 250px;
background-color: blue;
position: relative;
background-image: url(${({bg})=>bg});
background-size: cover;
background-repeat: no-repeat;

`
const Right = styled.div`
width: 63%;
height: 100%;
background-color: white;
box-shadow: 1px 1px 5px 1px lightgray;
display: flex;
border-radius: 8px;
overflow: hidden;
flex-direction: column;
align-items: center;
`
const Left = styled.div`
width: 36%;
height: 100%;
background-color: white;
box-shadow: 1px 1px 5px 1px lightgray;
display: flex;
`
const Wrapper = styled.div`
display: flex;
/* justify-content: space-between; */
justify-content:center;
width: 100%;

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