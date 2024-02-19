import React from "react";
import Layout from "../core/Layout";
import teamData from "./teamData"; // Import team member data

const Home = () => {
  return (
    <Layout title="About" description="Made with ❤ by Our Team">
      <div className="container mx-auto my-4">
        <h1 className="text-4xl font-bold mb-4">Our Team</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teamData.map((member) => (
            <div key={member.id} className="bg-white shadow-md rounded-lg p-4">
              <img
                src={member.photo}
                alt={member.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-bold mb-2">{member.name}</h2>
              <p className="text-gray-700">{member.position}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
