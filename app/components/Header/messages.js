/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'shop.components.Header';

export default defineMessages({
  login: {
    id: `${scope}.login`,
    defaultMessage: 'Login',
  },
  logout: {
    id: `${scope}.logout`,
    defaultMessage: 'Logout',
  },
  register: {
    id: `${scope}.register`,
    defaultMessage: 'Register',
  },
});
