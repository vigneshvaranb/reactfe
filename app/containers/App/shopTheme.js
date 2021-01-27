import { createMuiTheme } from '@material-ui/core/styles';

const GREEN = '#089000';
const PRIMARY = '#054087';
const SECONDARY = '#24c0b7';
const SUCCESS = '#85c17f';
const NEUTRAL = '#707070';
const LOWCONTRAST = '#d1d3d4';

const theme = createMuiTheme({
  typography: {
    shop: {
      fontFamilyHeadings: '"Roboto","Qanelas","Helvetica", "Arial", "sans-serif"',
      fontFamilyBody: '"Roboto","Qanelas", "Helvetica", "Arial", "sans-serif"',
    },
  },
  sizing: {
    shop: {
      formLabelSize: 'small',
    },
  },
  styles: {
    shop: {
      logo: {
        logoBox: {
          position: 'relative',
          marginLeft: '1.0rem',
        },
        logo: {
          width: '24%',
        },
        logoA: {
          textDecoration: 'none',
          display: 'block',
          cursor: 'auto',
        },
        tagLine: {
          fontSize: 'x-small',
          color: PRIMARY,
          fontWeight: '500',
          width: '94%',
          top: '70%',
          left: '10%',
          position: 'absolute',
        },
      },
      sectionTitle: {
        width: '100%',
        fontFamily: '"Roboto", "Qanelas", "Helvetica", "Arial", "sans-serif"',
        fontSize: 'x-large',
        backgroundColor: 'inherit',
      },
      subTitle: {
        width: '100%',
        padding: '2px',
      },
      headerLink: {
        display: 'inline-flex',
        padding: '0.25rem 0.5rem',
        margin: '0.5rem',
        textDecoration: 'none',
        userSelect: 'none',
        cursor: 'pointer',
        outline: '0',
        fontFamily: '"Roboto", "Qanelas", "Helvetica", "Arial", "sans-serif"',
        fontWeight: 'normal',
        fontSize: 'small',
        '&:active': {
          background: '#41addd',
          color: PRIMARY,
        },
      },
      linkHover: {
        '&:hover': {
          color: SECONDARY,
          background: 'transparent',
        },
      },
      pageHeader: {
        fontWeight: 400,
        margin: '2rem',
      },
      labelAbove: {
        transform: 'translate(0, 1.5px) scale(0.75)',
        transformOrigin: 'top left',
        fontSize: 'inherit',
      },
    },
  },
  palette: {
    secondary: {
      main: GREEN,
    },
    primary: {
      main: PRIMARY,
    },
    contrastThreshold: 3,
    tonalOffset: 0.4,
    shop: {
      activeMenu: '#41addd',
      wordHighlight: '#089000',
      white: '#ffffff',
      primary: PRIMARY,
      secondary: SECONDARY,
      success: SUCCESS,
      neutral: NEUTRAL,
      lowcontrast: LOWCONTRAST,
      transparent: 'transparent',
      contrastColors: {
        1: '#131516',
        2: '#373d3f',
        3: '#555f61',
        4: '#707c80',
        5: '#8c9798',
        6: '#a7b0b2',
        7: '#c1c7c9',
        8: '#dadedf',
        9: '#f2f3f4',
        10: '#fafafa',
      },
      gray: {
        1: '#d2d2d2',
        2: '#d7d7d7',
        3: '#dcdcdc',
        4: '#e6e6e6',
        5: '#ebebeb',
        6: '#f0f0f0',
        7: '#f5f5f5',
        8: '#fbfbfb',
        9: '#ffffff',
      },
      fafafa: '#fafafa',
      btnTxtColor: 'white',
      txtColorForPrimaryBg: 'white',
      btnBgColor: '#41addd',
      textHighlight: '#fada5e',
      alertColor: 'red',
      headerMenuColor: NEUTRAL,
      cardItembtnBg: 'rgba(255,255,255,0.25)',
      confirmMsgBg: '#F8F6F6',
      carouselBg: '#83c17d',
      readOnly: 'rgba(0, 0, 0, 0.04)',
      disabled: '#8c9798',
    },
  },
});
export default theme;
