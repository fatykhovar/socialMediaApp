import { useState } from "react";
import { makeRequest } from "../../axios";
import "./update.css";
import {useQuery, useMutation, useQueryClient } from "react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import React  from 'react'; 
import ChoiceList from '../choiceList/ChoiseList';

const Update = ({ setOpenUpdate, user }) => {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [country, setCountry] = useState('Россия');
  const [region, setRegion] = useState('Татарстан');
  const [city, setCity] = useState('Казань');
  const [texts, setTexts] = useState({
    email: user.email,
    name: user.name,
  });
  const upload = async (file) => {
    //console.log(file);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (user) => {
      console.log("user: ", user);
      return makeRequest.put("/user", user);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["user"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();

    //TODO: find a better way to get image URL

    let coverUrl;
    let profileUrl;
    coverUrl = cover ? await upload(cover) : user.coverpic;
    profileUrl = profile ? await upload(profile) : user.profilepic;

    mutation.mutate({ ...texts, coverPic: coverUrl, profilePic: profileUrl, country:country});
    setOpenUpdate(false);
    setCover(null);
    setProfile(null);
  };

  const handleSelectCountry = (event) => {
    setCountry(event.target.value);
  };

  const handleSelectRegion = (event) => {
    setRegion(event.target.value);
  };

  const handleSelectCity = (event) => {
    setCity(event.target.value);
  };

  const countries = ['Option 1', 'Option 2', 'Option 3'];

  const {isLoading: countryIsLoading, data: countryData} = useQuery(
    ["country"],
    () =>
      makeRequest.get("/location/country").then((res) => {
      return res.data;
      })
  );

  const {isLoading: regionIsLoading, data: regionData} = useQuery(
    ["region"],
    () =>
      makeRequest.get("/location/region").then((res) => {
      return res.data;
      })
  );

  const {isLoading: cityIsLoading, data: cityData} = useQuery(
    ["city"],
    () =>
      makeRequest.get("/location/city").then((res) => {
      return res.data;
      })
  );

  return (
    <div className="update">
      <div className="wrapper">
        <h1>Редактирование профиля</h1>
        <div className="scroller">
          <form>
            <div className="files">
              <label htmlFor="cover">
                <span>Обложка</span>
                <div className="imgContainer">
                  <img
                    src={
                      cover
                        ? URL.createObjectURL(cover)
                        : "/upload/" + user.coverpic
                    }
                    alt=""
                  />
                  <CloudUploadIcon className="icon" />
                </div>
              </label>
              <input
                type="file"
                id="cover"
                style={{ display: "none" }}
                onChange={(e) => setCover(e.target.files[0])}
              />
              <label htmlFor="profile">
                <span>Фото профиля</span>
                <div className="imgContainer">
                  <img
                    src={
                      profile
                        ? URL.createObjectURL(profile)
                        : "/upload/" + user.profilepic
                    }
                    alt=""
                  />
                  <CloudUploadIcon className="icon" />
                </div>
              </label>
              <input
                type="file"
                id="profile"
                style={{ display: "none" }}
                onChange={(e) => setProfile(e.target.files[0])}
              />
            </div>
            <label>Email</label>
            <input
              type="text"
              value={texts.email}
              name="email"
              onChange={handleChange}
            />
            <label>Имя</label>
            <input
              type="text"
              value={texts.name}
              name="name"
              onChange={handleChange}
            />
            <div className="select">
              <label>Страна: </label>
              <select
                value={country}
                onChange={handleSelectCountry}>
                {countryIsLoading ? (
                  "Загрузка"
                ):(
                  countryData.map(o => (
                  <option key={o} value={o}>{o}</option>
                ))
                ) }
              </select>
            </div>
            <div className="select">
              <label>Регион: </label>
              <select
                value={region}
                onChange={handleSelectRegion}>
                {regionIsLoading ? (
                  "Загрузка"
                ):(
                  regionData.map(o => (
                  <option key={o} value={o}>{o}</option>
                ))
                ) }
              </select>
            </div>
            <div className="select">
              <label>Город: </label>
              <select
                value={city}
                onChange={handleSelectCity}>
                {cityIsLoading ? (
                  "Загрузка"
                ):(
                  cityData.map(o => (
                  <option key={o} value={o}>{o}</option>
                ))
                ) }
              </select>
            </div>
              {/* <ChoiceList choices={countries} selectedChoice={country} onSelect={handleSelectCountry} /> */}
            {/* <label>Город</label>
            <input
              type="text"
              name="city"
              value={texts.city}
              onChange={handleChange}
            /> */}
            <button onClick={handleClick}>Сохранить</button>
          </form>
        </div>
        <button className="close" onClick={() => setOpenUpdate(false)}>
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default Update;