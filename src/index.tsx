import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from './reducer';

const Button = {
  variants: {
    primaryAction: {
      bg: 'brand.blue',
      borderColor: 'brand.blue',
      borderRadius: '2px',
      color: 'white',
      transition: 'none',
      _active: {
        opacity: '0.5',
        bg: 'brand.blue'
      },
      _hover: {
        opacity: '0.8'
      }
    },
    primaryActionInactive: {
      bg: 'brand.blue',
      borderColor: 'brand.blue',
      borderRadius: '2px',
      color: 'white',
      opacity: '0.3',
      transition: 'none',
      _active: {
        bg: 'brand.blue'
      }
    },
    primaryActionLined: {
      bg: 'transparent',
      borderColor: 'brand.blue',
      borderRadius: '2px',
      borderWidth: '1px',
      color: 'brand.blue',
      transition: 'none',
      _active: {
        opacity: '0.5'
      },
      _hover: {
        // bg: 'white',
        // color: 'brand.blue',
        opacity: '0.8'
      }
    },
    primaryActionInverted: {
      bg: 'transparent',
      borderColor: 'brand.blue',
      borderRadius: '2px',
      color: 'brand.blue',
      transition: 'none',
      _active: {
        opacity: '0.5'
      },
      _hover: {
        bg: 'brand.blue',
        color: 'white'
      }
    },
    secondaryAction: {
      bg: 'brand.blue',
      color: 'brand.background',
      borderColor: 'brand.blue',
      borderRadius: '2px',
      borderWidth: '1px',
      transition: 'none',
      _active: {
        opacity: '0.5',
        bg: 'brand.blue'
      },
      _hover: {
        bg: 'brand.blue',
        color: 'brand.background',
        opacity: '0.8'
      }
    },
    secondaryActionLined: {
      bg: 'brand.blue',
      borderColor: 'brand.darkGray',
      borderRadius: '20px',
      borderWidth: '3px',
      color: 'white',
      transition: 'none',
      _active: {
        opacity: '0.8',
        bg: 'brand.blue'
      },
      _hover: {
        bg: 'brand.darkGray'//,
        //color: 'brand.darkGray'
      }
    },
    cancelAction: {
      bg: 'none',
      borderColor: 'brand.red',
      borderRadius: '2px',
      borderWidth: '1px',
      color: 'brand.red',
      transition: 'none',
      _active: {
        opacity: '0.8',
        bg: 'brand.red'
      },
      _hover: {
        bg: 'brand.red',
        color: 'white'
      }
    },
    tertiaryAction: {
      bg: 'gray.200',
      color: 'gray.500',
      borderRadius: '2px',
      _hover: {
        bg: 'gray.100',
        color: 'gray.400'
      },
      _active: {
        bg: 'gray.100',
        color: 'gray.400'
      }
    }
  }
};

const Link = {
  variants: {
    primaryAction: {
      alignItems: 'center',
      bg: 'brand.blue',
      borderColor: 'brand.blue',
      borderRadius: '2px',
      color: 'white',
      display: 'inline-flex',
      fontSize: '1rem',
      fontWeight: '600',
      height: 10,
      justifyContent: 'center',
      lineHeight: '1.2',
      paddingX: 4,
      transition: 'none',
      _hover: {
        bg: 'white',
        color: 'brand.blue',
        textDecoration: 'none'
      }
    },
    primaryActionInactive: {
      alignItems: 'center',
      bg: 'gray.600',
      borderRadius: '2px',
      color: 'gray.400',
      display: 'inline-flex',
      fontSize: '1rem',
      fontWeight: '600',
      height: 10,
      justifyContent: 'center',
      lineHeight: '1.2',
      paddingX: 4,
      transition: 'none',
      _hover: {
        color: 'gray.400',
        textDecoration: 'none'
      }
    }
  }
};

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        height: '100%'
      }
    }
  },
  colors: {
    brand: {
      black: '#1D2227',
      background: '#1C2228',
      darkGray: '#282B30',
      gray: '#AEBBC9',
      lightGray: '#ABBBCB',
      brightGray: '#F2F4F7',
      red: '#EB586F',
      yellow: '#FACB43',
      green: '#27B278',
      blue: '#4AA0D5',
      lightBlue: '#D3DEF5',
      turquoise: '#00FFBE'
    }
  },
  components: {
    Button,
    Link,
    Input: {
      variants: {
        outline: {
          field: {
            borderRadius: '2px',
            _focus: {
              boxShadow: '0px 0px 0px 4px rgba(0, 0, 0, 1)'
            }
          }
        }
      }
    },
    Textarea: {
      variants: {
        outline: {
          borderRadius: '1px',
          _focus: {
            boxShadow: '0px 0px 0px 4px rgba(15, 97, 255, 0.1)'
          }
        }
      }
    },
    MenuButton: {
      variants: {
        primary: {
          color: 'gray.300',
          _hover: { color: "brand.blue" },
          _expanded: { color: "brand.blue" },
          _focus: { color: "brand.blue" }
        }
      }
    },
    MenuItem: {
      variants: {
        primary: {
          _focus: {
            bg: "brand.lightBlue",
            color: "brand.blue"
          }
        }
      }
    }
  },
  fonts: {
    body: "'Helvetica', sans-serif",
    heading: "'Helvetica', sans-serif",
    mono: "'Helvetica', monospace"
  },
  fontWeights: {
    normal: 400,
    bold: 700
  }
});

function Root() {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Provider>
  );
}

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
