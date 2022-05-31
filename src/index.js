import React from 'react';
import ReactDOM from 'react-dom/client';
import { MoralisProvider } from "react-moralis";
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <MoralisProvider serverUrl="https://rdsjvkmd7iu5.usemoralis.com:2053/server" appId="QVNSJhp9Q6SvV6dSsssV77cQsestl1viUTji232K">
    <App />
    </MoralisProvider>
  </React.StrictMode>
);


