import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { RNCamera } from "react-native-camera";
import vision from "@react-native-firebase/ml-vision";

const FacialVerification = () => {
  const [isHuman, setIsHuman] = useState(false);
  const [cameraRef, setCameraRef] = useState(null);

  const handleFaceDetection = async (image) => {
    try {
      const faces = await vision().faceDetectorProcessImage(image);
      if (faces.length > 0) {
        setIsHuman(true);
        Alert.alert("Verification Complete", "Human detected!");
      } else {
        Alert.alert("Verification Failed", "No human face detected.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to process the image.");
    }
  };

  const handleCapture = async () => {
    if (cameraRef) {
      try {
        const options = { quality: 0.5, base64: true };
        const data = await cameraRef.takePictureAsync(options);
        await handleFaceDetection(data.uri);
      } catch (error) {
        Alert.alert("Error", "Failed to capture the image.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Facial Verification</Text>
      <RNCamera
        ref={(ref) => setCameraRef(ref)}
        style={styles.camera}
        type={RNCamera.Constants.Type.front}
        captureAudio={false}
        androidCameraPermissionOptions={{
          title: "Camera Permission",
          message: "We need your permission to use the camera",
          buttonPositive: "OK",
          buttonNegative: "Cancel",
        }}
      />
      <TouchableOpacity onPress={handleCapture} style={styles.captureButton}>
        <Text style={styles.captureButtonText}>Capture</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  camera: {
    width: "100%",
    height: 400,
  },
  captureButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#007bff",
    borderRadius: 8,
  },
  captureButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FacialVerification;
