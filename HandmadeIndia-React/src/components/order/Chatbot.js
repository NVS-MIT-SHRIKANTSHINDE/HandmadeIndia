import React, { useState } from 'react';
import ChatBot from 'react-simple-chatbot';

const ChatBots = () => {
  const [userInput, setUserInput] = useState('');

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const stateCultureInfo = {
    "Andhra Pradesh": 'Andhra Pradesh is known for its rich history and spicy cuisine, especially the famous Hyderabadi biryani.',
    "Arunachal Pradesh": 'Arunachal Pradesh is known for its picturesque landscapes and diverse tribal cultures.',
    "Assam": 'Assam is famous for its tea gardens, wildlife, and the Brahmaputra River.',
    "Bihar": 'Bihar has a rich cultural heritage with historical sites like Nalanda and Bodh Gaya.',
    "Chhattisgarh": 'Chhattisgarh is known for its tribal culture, traditional dance forms, and ancient temples.',
    "Goa": 'Goa is famous for its beaches, vibrant nightlife, and Portuguese-influenced culture.',
    "Gujarat": 'Gujarat is known for its rich history, traditional handicrafts, and the vibrant Navratri festival.',
    "Haryana": 'Haryana is known for its agricultural prosperity, folk music, and dance forms like Dhamal.',
    "Himachal Pradesh": 'Himachal Pradesh is famous for its scenic landscapes, adventure sports, and Tibetan culture.',
    "Jharkhand": 'Jharkhand is known for its tribal traditions, natural beauty, and waterfalls like Hundru Falls.',
    "Karnataka": 'Karnataka is known for its diverse culture, ancient temples, and classical dance forms like Bharatanatyam.',
    "Kerala": 'Kerala is known for its backwaters, lush greenery, and classical dance form called Kathakali.',
    "Madhya Pradesh": 'Madhya Pradesh has a rich history with landmarks like Khajuraho and is known for its tribal art forms.',
    "Maharashtra": 'Maharashtra is known for its bustling cities, diverse culture, and festivals like Ganesh Chaturthi.',
    "Manipur": 'Manipur is known for its classical dance form called Manipuri and the Loktak Lake.',
    "Meghalaya": 'Meghalaya is known for its scenic beauty, living root bridges, and diverse tribal cultures.',
    "Mizoram": 'Mizoram is known for its bamboo craft, traditional festivals, and the picturesque Dampa Tiger Reserve.',
    "Nagaland": 'Nagaland is known for its vibrant tribal cultures, Hornbill Festival, and traditional Naga shawls.',
    "Odisha": 'Odisha is known for its ancient temples, classical dance form Odissi, and the Konark Sun Temple.',
    "Punjab": 'Punjab is known for its rich agricultural land, Sikh culture, and lively Bhangra dance.',
    "Rajasthan": 'Rajasthan is known for its royal history, majestic forts, and vibrant folk music and dance.',
    "Sikkim": 'Sikkim is known for its Himalayan landscapes, monasteries, and traditional Sikkimese cuisine.',
    "Tamil Nadu": 'Tamil Nadu is known for its classical dance forms like Bharatanatyam, temples, and the vibrant Pongal festival.',
    "Telangana": 'Telangana is known for its rich history, Charminar, and the colorful Bathukamma festival.',
    "Tripura": 'Tripura is known for its diverse tribal cultures, traditional music, and the Tripuri dance.',
    "Uttar Pradesh": 'Uttar Pradesh is known for its historical cities like Agra and Varanasi, and it has a rich cultural heritage.',
    "Uttarakhand": 'Uttarakhand is known for its Himalayan beauty, pilgrimage sites, and traditional Garhwali and Kumaoni music.',
    "West Bengal": 'West Bengal is known for its cultural capital Kolkata, festivals like Durga Puja, and classical dance forms like Kathak.',
  };

  const steps = [
    {
      id: '0',
      message: 'Welcome to the React chatbot!',
      trigger: '1',
    },
    {
      id: '1',
      message: 'Let me share some insights about Indian culture. Type the name of the state you are interested in:',
      trigger: 'userInput',
    },
    {
      id: 'userInput',
      user: true,
      trigger: 'responseToUserInput',
    },
    {
      id: 'responseToUserInput',
      message: ({ previousValue }) => {
        const state = previousValue.trim();
        const cultureInfo = stateCultureInfo[state];
        return cultureInfo ? cultureInfo + ' Would you like to learn about another state?' : 'Sorry, information not available for this state. Please enter a valid Indian state.';
      },
      trigger: 'userInput',
    },
    {
      id: 'end',
      message: 'I hope you enjoyed learning about Indian culture. Bye!',
      end: true,
    },
  ];

  return <ChatBot steps={steps} />;
};

export default ChatBots;
