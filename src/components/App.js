import React from "react";
import "../styles/App.css";
import Loader from "./Loader";

const LoadingStatus = {
  NOT_STARTED: "NOT_STARTED",
  IN_PROGRESS: "IN_PROGRESS",
  SUCCESS: "SUCCESS",
};

const App = () => {
  const BASE_URL = "https://content.newtonschool.co/v1/pr/main/users";
  const [userId, setUserId] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(LoadingStatus.NOT_STARTED);
  const [userData, setUserData] = React.useState({
    id: "",
    email: "",
    name: "",
    phone: "",
    website: "",
  });

  const handleOnClick = async() => {
    if(!userId){
      setIsLoading(LoadingStatus.NOT_STARTED);
      return;
    }
    setIsLoading(LoadingStatus.IN_PROGRESS);
    try{
      const response = await fetch(`${BASE_URL}/${userId}`)
      const data = await response.json();
      // console.log(data);
      setTimeout(() => {
        setIsLoading(LoadingStatus.SUCCESS);
        setUserData({
          id: data.id,
          email: data.email,
          name: data.name,
          phone: data.phone,
          website: data.website,
        })
      }, 2000);
    }catch(error){
      console.error(error);
    }
  };

  const onChangeHandler = (event) => {
    setUserId(event.target.value);
  };

  return (
    <div id="main">
      <label htmlFor="number">Enter an id for the user between 1 to 10</label>
      <input
        type="number"
        value={userId}
        onChange={onChangeHandler}
        id="input"
        min={1}
        max={10}
      />
      <button id="btn" onClick={handleOnClick}>
        Get User
      </button>

      <div id="data">
        {isLoading == "NOT_STARTED" ? <h1>Click on the button to get the user</h1>:
        isLoading == "IN_PROGRESS"? <Loader /> :
        isLoading == "SUCCESS" ?
        <>
          <h4 id="id">{userData.id}</h4>
          <h4 id="email">{userData.email}</h4>
          <h4 id="name">{userData.name}</h4>
          <h4 id="phone">{userData.phone}</h4>
          <h4 id="website">{userData.website}</h4>
        </> :""
        }
      </div>
    </div>
  );
};

export default App;
