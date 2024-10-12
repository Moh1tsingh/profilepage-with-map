import React, { useEffect, useState } from "react";
import ProfileCardDashboard from "../components/ProfileCardDashboard";

function Dashboard() {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [profiles, setProfiles] = useState([]);

  const createProfile = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const profileData = {
      id: Date.now(),
      name: formData.get("name"),
      description: formData.get("desc"),
      lat: formData.get("lat"),
      lng: formData.get("lng"),
    };
    const newProfiles = [...profiles, profileData];
    setProfiles(newProfiles);
    localStorage.setItem("profilesData", JSON.stringify(newProfiles));
    setModalOpen(false);
  };
  const updateProfile = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedProfile = {
      id: selectedProfile.id,
      name: formData.get("name"),
      description: formData.get("description"),
      lat: formData.get("lat"),
      lng: formData.get("lng"),
    };
    const newProfiles = profiles.map((profile) =>
      profile.id === selectedProfile.id ? updatedProfile : profile
    );
    setProfiles(newProfiles);
    localStorage.setItem("profilesData", JSON.stringify(newProfiles));
    setSelectedProfile(null);
    setModalOpen(false);
  };
  useEffect(() => {
    const profilesData = localStorage.getItem("profilesData");
    if (profilesData) {
      setProfiles(JSON.parse(profilesData));
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const deleteProfile = (profile) => {
    const newProfiles = profiles.filter(prf => prf.id !== profile.id);
    setProfiles(newProfiles);
    localStorage.setItem("profilesData", JSON.stringify(newProfiles));
  };

  return (
    <div className=" w-screen flex items-center p-4 bg-slate-100 min-h-screen flex-col ">
      <div>
        <button
          onClick={() => setModalOpen(true)}
          className=" py-2 w-64 px-4 bg-blue-500 rounded-xl text-lg text-white font-semibold"
        >
          Create new profile
        </button>
      </div>

      <div className=" w-full grid grid-cols-4 max-sm:grid-cols-1 max-md:grid-cols-2 place-items-center gap-y-5 mt-5 ">
        {profiles.map((profile) => (
          <ProfileCardDashboard
            key={profile.id}
            profile={profile}
            onSelect={() => setSelectedProfile(profile)}
            onDelete={() => deleteProfile(profile)}
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
            <form
              onSubmit={updateProfile}
              className=" w-full flex flex-col gap-y-2 mt-4 "
            >
              <input type="hidden" name="id" value={selectedProfile.id} />
              <input
                className=" w-full bg-neutral-200 p-2 rounded-lg"
                type="text"
                name="name"
                onChange={handleInputChange}
                value={selectedProfile.name}
              />
              <input
                className=" w-full bg-neutral-200 p-2 rounded-lg"
                type="text"
                name="description"
                placeholder="Job Description"
                onChange={handleInputChange}
                value={selectedProfile.description}
              />
              <input
                className=" w-full bg-neutral-200 p-2 rounded-lg"
                type="text"
                name="lat"
                placeholder="Latitude"
                onChange={handleInputChange}
                value={selectedProfile.lat}
              />
              <input
                className=" w-full bg-neutral-200 p-2 rounded-lg"
                type="text"
                name="lng"
                placeholder="Longititude"
                onChange={handleInputChange}
                value={selectedProfile.lng}
              />
              <input
                className=" py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg w-full"
                type="submit"
                value="Update Profile"
              />
            </form>
          </div>
        </div>
      )}
      {modalOpen && (
        <div className=" w-screen h-screen top-0 right-0 fixed">
          <div
            onClick={() => setModalOpen(false)}
            className="w-screen h-screen top-0 right-0 fixed bg-black/25"
          ></div>
          <div className=" w-11/12 sm:w-[600px] p-4 flex flex-col justify-items-center items-center rounded-lg absolute z-10 bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <button
              className=" text-black absolute -top-2 font-bold right-0 p-4"
              onClick={() => setModalOpen(false)}
            >
              X
            </button>
            <form
              onSubmit={createProfile}
              className=" w-full flex flex-col gap-y-2 mt-4 "
            >
              <input
                className=" w-full bg-neutral-200 p-2 rounded-lg"
                type="text"
                name="name"
                placeholder="Name"
              />
              <input
                className=" w-full bg-neutral-200 p-2 rounded-lg"
                type="text"
                name="desc"
                placeholder="Job Description"
              />
              <input
                className=" w-full bg-neutral-200 p-2 rounded-lg"
                type="text"
                name="lat"
                placeholder="Latitude "
              />
              <input
                className=" w-full bg-neutral-200 p-2 rounded-lg"
                type="text"
                name="lng"
                placeholder="Longititude"
              />
              <input
                className=" py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg w-full"
                type="submit"
                value="Create Profile"
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
