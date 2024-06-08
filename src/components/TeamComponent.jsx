import React from 'react';
import '../styles/TeamComponent.css';
import Meghal from '../assets/Meghal.jpg';
import Mitu from '../assets/Mitu.jpg'; 
import Apekshya from '../assets/Apekshya.jpg'

const TeamComponent = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Apekshya Bharadwaj',
      email: 'apekshyajiya.25@gmail.com',
      image: Apekshya, 
      role: 'Frontend',
      bio: 'UX design , Web development, Machine Learning  ',
    },
    {
      id: 2,
      name: 'Mitumoni Kalita',
      email: 'mitumonikalita2002@gmail.com',
      image: Mitu,
      role: 'Backend',
      bio: 'Web development, Android dev , Machine Learning ',
    },
    {
      id: 3,
      name: 'Meghal Bothra',
      email: 'meghalbothra@gmail.com',
      image: Meghal, 
      role: 'Frontend',
      bio: 'Web development, Machine Learning, Game Development ',
    },
  ];

  return (
    <div className="team-container">
      <h1>Our Team</h1>
      <div className="team-members">
        {teamMembers.map((member) => (
          <div key={member.id} className="team-member">
            <img src={member.image} alt={member.name} />
            <div className="member-details">
              <h2>{member.name}</h2>
              <p><strong>Email:</strong> {member.email}</p>
              <p><strong>Contributed on :</strong> {member.role}</p>
              <p><strong>Interested Domain -</strong>{member.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamComponent;
