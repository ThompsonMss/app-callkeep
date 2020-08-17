import React from 'react';
import {View, Text, Image, TouchableOpacity, Linking} from 'react-native';
import makeStyles from './styles';

import CallIcon from '../../assets/media/images/call.png';

import {requestTokenFirebase} from '../../services/firebase';

export default function Main() {
  const styles = makeStyles();
  const [token, setToken] = React.useState('');

  /*  RECUPERANDO TOKEN DO FIREBASE */

  async function getToken() {
    const tokenRequest = await requestTokenFirebase();
    setToken(tokenRequest);
  }

  React.useEffect(getToken, []);

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
            <Text style={styles.contentToken.box.text}>{token}</Text>
          </View>
        </View>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.buttons.button, styles.buttons.button.colorPink]}>
          <Text style={styles.buttons.button.text}>Chamada Remota</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttons.button, styles.buttons.button.colorBlurple]}>
          <Text style={styles.buttons.button.text}>Chamada Local</Text>
        </TouchableOpacity>
      </View>

      {/* Container Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => Linking.openURL('https://thompson.dev.br')}
          style={styles.footer.button}>
          <Text style={styles.footer.text}>thompson.dev.br</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
