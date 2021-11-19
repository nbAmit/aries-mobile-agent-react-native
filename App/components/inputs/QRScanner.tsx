import React, { useState } from 'react'
import { useWindowDimensions, Vibration, View, StyleSheet } from 'react-native'
import { BarCodeReadEvent, RNCamera } from 'react-native-camera'

import { mainColor } from '../../globalStyles'

import QRScannerTorch from 'components/misc/QRScannerTorch'
import { useTranslation } from 'react-i18next'

interface Props {
  handleCodeScan: (event: BarCodeReadEvent) => Promise<void>
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewFinder: {
    width: 250,
    height: 250,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: mainColor,
    backgroundColor: '#ffffff30',
  },
  viewFinderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const CameraViewContainer: React.FC<{ portrait: boolean }> = ({ portrait, children }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: portrait ? 'column' : 'row',
        alignItems: 'center',
      }}
    >
      {children}
    </View>
  )
}

const QRScanner: React.FC<Props> = ({ handleCodeScan }) => {
  const [cameraActive, setCameraActive] = useState(true)
  const [torchActive, setTorchActive] = useState(false)

  const { width, height } = useWindowDimensions()
  const portraitMode = height > width
  const { t } = useTranslation()
  
  return (
    <View style={styles.container}>
      {cameraActive && (
        <RNCamera
          style={styles.container}
          type={RNCamera.Constants.Type.back}
          flashMode={torchActive ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
          captureAudio={false}
          androidCameraPermissionOptions={{
            title: t('QRScanner.permission_to_use_camera'),
            message: t('QRScanner.we_need_your_permission_to_use_your_camera'),
            buttonPositive: t('QRScanner.ok'),
            buttonNegative: t('Global.cancel'),
          }}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          onBarCodeRead={(e) => {
            Vibration.vibrate()
            setCameraActive(false)
            handleCodeScan(e)
          }}
        >
          <CameraViewContainer portrait={portraitMode}>
            <View style={styles.viewFinderContainer}>
              <View style={styles.viewFinder} />
            </View>
            <QRScannerTorch active={torchActive} onPress={() => setTorchActive(!torchActive)} />
          </CameraViewContainer>
        </RNCamera>
      )}
    </View>
  )
}

export default QRScanner
