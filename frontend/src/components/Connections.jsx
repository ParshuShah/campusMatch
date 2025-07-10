import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router";
import { MessageCircle, User, Heart } from 'lucide-react';

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 flex items-center justify-center">
        <div className="text-center p-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-purple-900/50 max-w-md mx-auto">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">No Connections Yet</h2>
          <p className="text-gray-400">Start matching to see your connections here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
          Your Connections
        </h1>

        <div className="space-y-4">
          {connections.map((connection) => {
            const { _id, firstName, lastName, photoURL, age, gender, about } = connection;

            return (
              <div
                key={_id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-900/50 shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      alt={`${firstName} ${lastName}`}
                      className="w-16 h-16 rounded-full object-cover border-2 border-purple-500"
                      src={photoURL || "https://www.svgrepo.com/show/512317/avatar-1295.svg"}
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-white">
                        {firstName} {lastName}
                      </h2>
                      <Link 
                        to={"/app/chat/" + _id}
                        className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all flex items-center space-x-2"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Chat</span>
                      </Link>
                    </div>
                    
                    {age && gender && (
                      <p className="text-gray-400 text-sm mb-2">
                        {age}, {gender}
                      </p>
                    )}
                    
                    {about && (
                      <p className="text-gray-300 text-sm line-clamp-2">
                        {about}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Connections;