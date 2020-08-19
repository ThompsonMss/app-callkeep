export default function makeStyles() {
  return {
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

    contentTitle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: -30,

      text: {
        fontSize: 25,
        textTransform: 'uppercase',
      },

      bold: {
        fontWeight: 'bold',
      },
    },

    contentAction: {
      marginTop: 40,
    },

    contentToken: {
      width: '100%',
      padding: 20,

      text: {
        fontSize: 15,
      },

      box: {
        backgroundColor: '#eee',
        borderWidth: 1,
        borderColor: '#ddd',
        borderStyle: 'solid',
        borderRadius: 4,
        marginTop: 5,
        padding: 10,
        width: '100%',

        text: {},
      },
    },

    buttons: {
      width: '100%',
      marginTop: 30,
      padding: 20,

      button: {
        height: 50,
        width: '100%',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,

        text: {
          fontSize: 18,
          textTransform: 'uppercase',
          color: '#FFF',
        },

        colorPink: {
          backgroundColor: '#686de0',
          borderWidth: 1,
          borderColor: '#4834d4',
          borderStyle: 'solid',
        },
        colorBlurple: {
          backgroundColor: '#ff7979',
          borderWidth: 1,
          borderColor: '#eb4d4b',
          borderStyle: 'solid',
        },
      },
    },

    footer: {
      width: '100%',
      position: 'absolute',
      bottom: 15,
      alignItems: 'center',
      justifyContent: 'center',

      button: {
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      },

      text: {
        color: '#CCC',
        fontSize: 17,
      },
    },
  };
}
