import React from 'react'
import { useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'

function VideoCall() {
    const { roomId } = useParams()
    console.log(roomId);
    const myMetting = async (element) => {
        const appId = 26075018
        const server = "c12f079e8384505f9c847e79740c54c3"
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appId, server, roomId, Date.now().toString(), "NameMember")
        const zc = ZegoUIKitPrebuilt.create(kitToken)
        zc.joinRoom({
            container: element,
            scenario: {
                mode: ZegoUIKitPrebuilt.GroupCall
            },
            showScreenSharingButton: true,
            showLeaveRoomConfirmDialog: true,
            showPreJoinView: false,
            preJoinViewConfig: false,
            // onJoinRoom:
            // show


        })
    }
    // console.log(myMetting);

    return (
        <div>
            <div className="" ref={myMetting} style={{ width: '100vw', height: '100vh' }}></div>
        </div>
    )
}

export default VideoCall