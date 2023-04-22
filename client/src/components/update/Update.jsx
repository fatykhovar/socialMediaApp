import { useState } from "react";
import { makeRequest } from "../../axios";
import "./update.css";
import { useMutation, useQueryClient } from "react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import React  from 'react'; 

const Update = ({ setOpenUpdate, user }) => {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [texts, setTexts] = useState({
    email: user.email,
    password: user.password,
    name: user.name,
    // city: user.city,
    // website: user.website,
  });
  console.log(user);
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
    coverUrl = cover ? await upload(cover) : user.coverPic;
    profileUrl = profile ? await upload(profile) : user.profilePic;

    mutation.mutate({ ...texts, coverPic: coverUrl, profilePic: profileUrl });
    setOpenUpdate(false);
    setCover(null);
    setProfile(null);
  };

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
                        : "/upload/" + user.coverPic
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
                        : "/upload/" + user.profilePic
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
            <label>Пароль</label>
            <input
              type="text"
              value={texts.password}
              name="password"
              onChange={handleChange}
            />
            <label>Имя</label>
            <input
              type="text"
              value={texts.name}
              name="name"
              onChange={handleChange}
            />
            <label>Стрвна / Город</label>
            <input
              type="text"
              name="city"
              value={texts.city}
              onChange={handleChange}
            />
            {/* <label>Website</label>
            <input
              type="text"
              name="website"
              value={texts.website}
              onChange={handleChange}
            /> */}
            <button onClick={handleClick}>Сохранить</button>
          </form>
        </div>
        <button className="close" onClick={() => setOpenUpdate(false)}>
          close
        </button>
      </div>
    </div>
  );
};

export default Update;