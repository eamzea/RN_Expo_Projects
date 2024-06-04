import React, { useContext } from "react";
import { Context as LocationContext } from "../context/LocationContext";
import { Input, Button } from "react-native-elements";
import Spacer from "./Spacer";
import useSaveTrack from "../hooks/useSaveTrack";

const TrackForm = () => {
  const [saveTrack] = useSaveTrack();
  const {
    state: { name, recording, locations },
    startRecording,
    stopRecording,
    changeName,
  } = useContext(LocationContext);

  return (
    <>
      <Spacer />
      <Input value={name} onChangeText={changeName} placeholder="Enter name" />
      <Spacer />
      {recording ? (
        <Button title="STOP" onPress={stopRecording} />
      ) : (
        <Button title="Start Recording" onPress={startRecording} />
      )}
      <Spacer />
      {!recording && locations.length ? (
        <Button title="Save Recording" onPress={saveTrack} />
      ) : null}
    </>
  );
};

export default TrackForm;
