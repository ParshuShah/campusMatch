import React from 'react'

const UserCard = ({ user }) => {
    if (!user) {
        return <div className="text-center">No user data available</div>;
      }
    const {firstName, lastName, photoURL, age, gender, about, skills} = user;
//     console.log(user);
//     console.log("Hello from the userCard")
    
//     console.log("User object:", user);
// console.log("Photo URL:", user?.photoUrl);
    
    return (
        <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
                <img
                    src={user.photoURL || "https://media.istockphoto.com/id/1336021035/photo/black-and-white-color-cat-looking-at-camera-curiosity.jpg?s=2048x2048&w=is&k=20&c=_G7Fxv6qO_DShw16yH8nRVU6JqHve3egCrUvNu6oTyA="}
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                {age && gender && <p>{age + ", " + gender}</p>}
                <p>{about}</p>
                <div className="card-actions justify-center my-4">
                    <button className="btn btn-secondary rounded-sm">Ignore</button>
                    <button className="btn btn-primary rounded-sm">Interested</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard