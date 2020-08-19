import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Clipboard,
  ToastAndroid,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import makeStyles from './styles';

import {requestTokenFirebase} from '../../services/firebase';
import RNCallKeep from 'react-native-callkeep';

import createUUID from '../../helpers/createUUID';

export default function Main() {
  const styles = makeStyles();
  const [token, setToken] = React.useState('');

  /*  RECUPERANDO TOKEN DO FIREBASE */

  async function getToken() {
    const tokenRequest = await requestTokenFirebase(display);
    console.log(tokenRequest)

    setToken(tokenRequest);
  }

  function copy(_token) {
    if (_token) {
      Clipboard.setString(_token);
      ToastAndroid.show('Token copiado!', ToastAndroid.SHORT);
    }
  }

  function handleCallRemote() {
    Alert.alert(
      'Chamada Remota',
      "É um serviço para realizar uma 'chamada' online e tempo real que usa o seu token do firebase para localizar seu celular. \n\nVocê vai ser redirecionado para o site do serviço, depois localize e clique no botão 'Ligar' do site para ver a mágica acontencer.",
      [{text: 'Prosseguir', onPress: () => Linking.openURL('')}],
    );
  }

  React.useEffect(getToken, []);

  const options = {
    ios: {
      appName: 'Nome do meu app',
    },
    android: {
      alertTitle: 'Permissions required',
      alertDescription: 'This application needs to access your phone accounts',
      cancelButton: 'Cancel',
      okButton: 'ok',
      imageName: 'phone_account_icon',
      additionalPermissions: [PermissionsAndroid.PERMISSIONS.CALL_PHONE],
    },
  };

  RNCallKeep.setup(options).then((accepted) => {
    RNCallKeep.setAvailable(true);
  });

  React.useEffect(definirContaTelefonePadrao, []);

  async function definirContaTelefonePadrao() {
    const status = await RNCallKeep.hasPhoneAccount();
    console.log('Status: ', status);
    if (status == false) {
      const optionsDefaultNumber = {
        alertTitle: 'Padrão não definido.',
        alertDescription: 'Defina a conta de telefone padrão.',
      };

      RNCallKeep.hasDefaultPhoneAccount(optionsDefaultNumber);
    }
  }

  RNCallKeep.addEventListener('answerCall', ({callUUID}) => {
    console.log('Usuário Atendeu a Chamada: ', callUUID);
    RNCallKeep.setCurrentCallActive(callUUID);
  });

  RNCallKeep.addEventListener('endCall', ({callUUID}) => {
    console.log('Usuário Encerrou a Chamada');
  });

  RNCallKeep.addEventListener(
    'didDisplayIncomingCall',
    ({error, callUUID, handle, localizedCallerName, hasVideo, fromPushKit}) => {
      // você pode fazer as seguintes ações ao receber este evento:
      // - iniciar a reprodução de toque se for uma chamada efetuada
      console.log('Realizando chamda');
    },
  );

  RNCallKeep.addEventListener(
    'didReceiveStartCallAction',
    ({handle, callUUID, name}) => {
      console.log('Esse fera aqui mesmo');
    },
  );

  RNCallKeep.addEventListener('didPerformDTMFAction', ({digits, callUUID}) => {
    console.log('Digito: ', digits);
  });

  function display() {
    const uuid = createUUID();
    try {
      RNCallKeep.displayIncomingCall(
        uuid,
        'DEDICADO PRÓPRIO',
        'Thompson Silva',
      );
      RNCallKeep.answerIncomingCall(uuid);
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  function chamar() {
    const uuid = createUUID();
    RNCallKeep.startCall(uuid, '+5561993133465', 'Teste Teste');
  }

  function connectionService() {
    const status = RNCallKeep.supportConnectionService();
    Alert.alert('Connection Service disponível: ', status ? 'Sim' : 'Não');
  }

  async function contaTelefone() {
    const status = await RNCallKeep.hasPhoneAccount();
    Alert.alert('Conta Telefone configurada: ', status ? 'Sim' : 'Não');
  }

  return (
    <View style={styles.container}>
      {/* Container Imagem */}
      <View>
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
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => copy(token)}
            style={styles.contentToken.box}>
            <Text style={styles.contentToken.box.text}>{token}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() => handleCallRemote()}
          style={[styles.buttons.button, styles.buttons.button.colorPink]}>
          <Text style={styles.buttons.button.text}>Chamada Remota</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => display()}
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
