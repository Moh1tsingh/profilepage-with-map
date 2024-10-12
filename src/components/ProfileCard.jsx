import React from "react";

function ProfileCard({ profile, onSelect }) {
  return (
    <div className=" w-80 bg-stone-100 flex p-3 rounded-lg gap-x-3 shadow-md">
      <img
        src={
          "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3407.jpg"
        }
        className=" size-[7rem] rounded-lg"
        alt={profile.name}
      />
      <div>
        <h3 className=" text-lg font-semibold">{profile.name}</h3>
        <p className=" font-medium text-gray-700/60">{profile.description}</p>
        <button className="py-1 px-2 bg-blue-600 rounded-xl font-semibold text-white" onClick={() => onSelect(profile)}>Summary</button>
      </div>
    </div>
  );
}

export default ProfileCard;
