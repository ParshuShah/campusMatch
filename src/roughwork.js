import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";



const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);

  const fetchConnections = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,  
      });
      const connectionData = res.data.data || res.data;
      dispatch(addConnections(connectionData));
      setHasFetched(true);
    } catch (err) {
      console.error("Error fetching connections:", err);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    if (!hasFetched) {
      fetchConnections();
    }
  }, [hasFetched]);

  if (isLoading) {
    return (
      <div className="text-center my-10">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="text-white">Loading connections...</p>
      </div>
    );
  }

  if (!connections || connections.length === 0) {
    return (
      <div className="text-center my-10">
        <h1 className="text-white text-3xl">No Connections Found</h1>
        <button 
          className="btn btn-primary mt-4"
          onClick={() => {
            setHasFetched(false);
            fetchConnections();
          }}
        >
          Refresh
        </button>
      </div>
    );
  }
  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, photoURL, age, gender, about } =
          connection;

        return (
          <div
            key={_id}
            className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full object-cover"
                src={photoURL}
              />
            </div>
            <div className="text-left mx-4 ">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            {/* <Link to={"/chat/" + _id}>
              <button className="btn btn-primary">Chat</button>
            </Link> */}
          </div>
        );
      })}
    </div>
  );
};
export default Connections;