import React, { useState, useEffect } from 'react';
import Audio from './Audio';
import sound from './audio.wav'
import { createRoutesFromChildren } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Jitsi = ({ roomName, ref, isJoined, onMessage,setIsJoined }) => {
  const [localTracks, setLocalTracks] = useState([]);
  const [roomInstance, setRoomInstance] = useState()
  const navigate = useNavigate();
//   IMPORTANT SET THE SERVER DOMAIN BELOW
  const[serverInstance,setServerInstance] = useState('meet.evolix.org')
  useEffect(() => {
    const JitsiMeetJS = window.JitsiMeetJS;
    JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.INFO);

    JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.WARN);

    const initOptions = {
      disableAudioLevels: true,
      disableThirdPartyRequests: true,
      enableAnalyticsLogging: false,
    };

    JitsiMeetJS.init(initOptions);
    
    const options = {
      hosts: {
        anonymousdomain: `${serverInstance}`,
        domain: `${serverInstance}`,
        muc: `conference.${serverInstance}`,
      },
      serviceUrl: `wss://${serverInstance}/xmpp-websocket?room=${roomName}`,
    
    };

    

    const connection = new JitsiMeetJS.JitsiConnection(null, null, options);

    connection.addEventListener(
      JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
      () => onConnectionSuccess(JitsiMeetJS,connection)
    );
    connection.addEventListener(
      JitsiMeetJS.events.connection.CONNECTION_FAILED,
      onConnectionFailed
    );
    connection.addEventListener(
      JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED,
      disconnect
    );

    connection.connect();
    JitsiMeetJS.createLocalTracks({
        devices: ['video', 'audio']
      }).then(onLocalTracks).catch(error => {
            console.error("There was an error creating the local tracks:", error);
          }
      );
    // JitsiMeetJS.createLocalTracks({ devices: ['audio'] })
    //   .then((tracks) => {
    //     setLocalTracks(tracks);
    //   })
    //   .catch((error) => {
    //     throw error;
    //   });
  }, []);

  const onConnectionSuccess = (JitsiMeetJS,connection) => {
    console.info('Connection established successfully YESS');
    const confOptions = {
        startAudioMuted: false,
    };
    let conferencePassword;
    const room = connection.initJitsiConference(roomName, confOptions);
    setRoomInstance(room)
    console.log("ROOM INTIIALIZED")
    room.setDisplayName('Bot User');
    room.on(JitsiMeetJS.events.conference.TRACK_ADDED, onRemoteTrack);

    room.on(JitsiMeetJS.events.conference.CONFERENCE_JOINED, () => {
        console.log("onConferenceJoined");
        JitsiMeetJS.createLocalTracks({
          devices: [ 'audio',],
   
        }).then((tracks) => {
            console.log("TRACKS")
          console.log("onLocalTracks", tracks);
          tracks.forEach(track => {
            room.addTrack(track);
          })
        }).catch(error => {
              console.error("There was an error creating the local tracks:", error);
            }
        );
      });
    room.join(conferencePassword);
   
  };
  const onRemoteTrack = (JitsiMeetJS,connection) => {}
  const onLocalTracks = (JitsiMeetJS,connection) => {}

  
  const onConferenceJoined = () => {
    console.info('Successfully joined conference!');
    
    setIsJoined(true)
  };

  const onConnectionFailed = () => {
    alert('Connection failed! Please report this issue');
    console.error('Connection Failed!');
  };

  const disconnect = () => {
    console.info('disconnecting!');
    roomInstance.leave()

  };



  return (
    <div>
         
    {localTracks.length > -1 ? (
      <div>
        {/* Render the Audio component */}
        <Audio src={"https://rr6---sn-8vq54voxqx-cxgs.googlevideo.com/videoplayback?expire=1715833711&ei=DjdFZoKXPPLZ6dsPsMGOoAc&ip=2a02%3A8109%3A928f%3A4a00%3Aadc3%3Af12c%3Aee40%3Af1d7&id=o-ADsbaYzneLRl7KIJSKu0Pg0EzCVdCrRHl0GyMaqjDtpq&itag=139&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=HZ&mm=31%2C29&mn=sn-8vq54voxqx-cxgs%2Csn-i5h7lnll&ms=au%2Crdu&mv=m&mvi=6&pl=47&initcwndbps=1518750&vprv=1&svpuc=1&mime=audio%2Fmp4&rqh=1&gir=yes&clen=1890716&ratebypass=yes&dur=309.893&lmt=1715605387685191&mt=1715811653&fvip=3&keepalive=yes&c=ANDROID_TESTSUITE&txp=5308224&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cvprv%2Csvpuc%2Cmime%2Crqh%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRQIgSU_X1WeGzZWvXpizuqME6kGBT9ee1KV-zag1lnM3YyICIQDWkAu9myispqyK2AmJrjzFFLzypZPQM-3f5DJUGD9bFQ%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AHWaYeowRQIgQMRwNjUhIM8riAnVNoyP3Qfa1vZGPu4hUxBEP2jpREwCIQDIoSj7GPN7kB5TqCetMZFmfYzyQ-1gOhtP8qcdy3w09A%3D%3D&host=rr6---sn-8vq54voxqx-cxgs.googlevideo.com"} />
        <button onClick={()=>{
                        disconnect()
                    
                        

            navigate('/')
        }}>
            Leave Room
        </button>
        {/* Your conference UI components here */}
      </div>
    ) : (
      <div>Connecting...</div>
    )}
  </div>
  );
};

export default React.forwardRef((props, ref) => <Jitsi {...props} ref={ref} />);