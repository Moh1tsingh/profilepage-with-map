import React, { useEffect } from "react";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import MapComponent from "../components/MapComponent";
import ProfileCard from "../components/ProfileCard";

function Home() {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [searchedProfiles, setSearchedProfiles] = useState([]);

  // localStorage.setItem(
  //   "profilesData",
  //   JSON.stringify([
  //     {
  //       id: 1,
  //       name: "John Doe",
  //       description: "Software Engineer",
  //       lat: 19.863109,
  //       lng: 75.353033,
  //     },
  //     {
  //       id: 2,
  //       name: "Jane Smith",
  //       description: "Data Scientist",
  //       lat: 48.8566,
  //       lng: 2.3522,
  //     },
  //     {
  //       id: 3,
  //       name: "Jane Smith",
  //       description: "Data Scientist",
  //       lat: 48.8566,
  //       lng: 2.3522,
  //     },
  //   ])
  // );

  useEffect(() => {
    const storedProfiles = localStorage.getItem("profilesData");
    if (storedProfiles) {
      setProfiles(JSON.parse(storedProfiles));
    }
  }, []);

  useEffect(() => {
    const filteredProperties = profiles.filter((profile) =>
      profile.name.toLowerCase().includes(searchVal.toLowerCase())
        ? profile.name.toLowerCase().includes(searchVal.toLowerCase())
        : profile.description.toLowerCase().includes(searchVal.toLowerCase())
        ? profile.description.toLowerCase().includes(searchVal.toLowerCase())
        : profile.lat.includes(searchVal)
        ? profile.lat.includes(searchVal)
        : profile.lng.includes(searchVal)
    );
    setSearchedProfiles(filteredProperties);
  }, [searchVal, profiles]);

  return (
    <div className=" w-screen min-h-screen bg-slate-100 flex items-center flex-col ">
      <div className=" w-full flex items-center flex-col">
        <input
          type="text"
          placeholder="Search"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          className=" w-4/5 sm:w-96 px-2 py-1 mt-2 rounded-md shadow outline-none"
        />
        {searchedProfiles && searchVal && (
          <div className=" absolute top-24 shadow-md w-4/5 sm:w-96 min-h-56 bg-white rounded-lg">
            {searchedProfiles.map((profile) => (
              <div className=" w-full p-2 flex gap-x-2 border-b border-neutral-200">
                <h1 className=" font-semibold">{profile.name}</h1>
                <h2>{profile.description}</h2>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className=" w-full grid grid-cols-4 max-sm:grid-cols-1 max-md:grid-cols-2  place-items-center gap-y-5 mt-5 ">
        {profiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            onSelect={() => setSelectedProfile(profile)}
          />
        ))}
      </div>

      {selectedProfile && (
        <div className=" w-screen h-screen top-0 right-0 fixed">
          <div
            onClick={() => setSelectedProfile(null)}
            className="w-screen h-screen top-0 right-0 fixed bg-black/25"
          ></div>
          <div className=" w-11/12 sm:w-[700px] p-4 flex flex-col justify-items-center items-center rounded-lg absolute z-10 bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <button
              className=" text-black absolute -top-2 font-bold right-0 p-4"
              onClick={() => setSelectedProfile(null)}
            >
              X
            </button>
            <h3 className=" text-xl font-semibold mb-2">
              {selectedProfile.name}'s Location
            </h3>
            <MapComponent profile={selectedProfile} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
