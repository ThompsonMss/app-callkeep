import React from 'react';
import {View, Text, Image} from 'react-native';
import makeStyles from './styles';

import CallIcon from '../../assets/media/images/call.png';

import {requestTokenFirebase} from '../../services/firebase';

export default function Main() {
  const styles = makeStyles();

  const ket = requestTokenFirebase();
  console.log('KET:', ket);

  return (
    <View style={styles.container}>
      {/* Container Imagem */}
      <View>
        <Image source={CallIcon} style={{width: 100, height: 100}} />
        <View style={styles.contentTitle}>
          <Text style={[styles.contentTitle.text, styles.contentTitle.bold]}>
            Call
          </Text>
          <Text style={styles.contentTitle.text}>Keep</Text>
        </View>
      </View>

      {/* Container Actions */}
      <View style={styles.contentAction}>
        <View style={styles.contentToken}>
          <Text style={styles.contentToken.text}>Seu token do firebase:</Text>
          <View style={styles.contentToken.box}>
            <Text style={styles.contentToken.box.text}>Teste</Text>
          </View>
        </View>
      </View>
      {/* Container Footer */}
    </View>
  );
}
