import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Jitsi from '../components/Jitsi';
import { useNavigate } from 'react-router-dom';
const Bot = () => {

  const [isJoined, setIsJoined] = useState(false);
  const [jitsi, setJitsi] = useState(null);
  const params = useParams(); // assuming you're using React Router

  useEffect(() => {
    console.log("PARAMSGSASAG GSA GASGASGAS ",params.room)
    const options = {
      hosts: {
        domain: "meet.evolix.org",
        muc: `conference.meet.evolix.org`,
      },
      serviceUrl: `https://meet.evolix.org/http-bind?room=specialroomfortesting`,
    };
    if (jitsi) {
      jitsi.joinConference(options);
    }
  }, [jitsi, params]);

  const onMessage = (event) => {
    // handle chat commands (if needed)
  };

  return (
    <div>
      
        <Jitsi
          roomName={params.room}
          ref={(instance) => setJitsi(instance)}
          isJoined={isJoined}
          setIsJoined= {setIsJoined}
          onMessage={onMessage}
        />
      <div>
       
      </div>
    </div>
  );
};

export default Bot;