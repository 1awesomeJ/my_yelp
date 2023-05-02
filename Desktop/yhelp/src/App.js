import './App.css';
import HomePage from './HomePage';

import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

export default function App() {
  return (
        <Authenticator>
      {({ signOut, user }) => (
        <HomePage user={user} signOut={signOut} />
      )}
    </Authenticator>
  );
}