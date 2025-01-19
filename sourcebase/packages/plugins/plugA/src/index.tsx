import {
  HookContextType,
  useGlobalHook,
  useRegisterPlugin,
} from '@repo/plugin-sdk';
import React from 'react';
import App from './App';
import './index.css'
import './styles/global.css'
import '@rainbow-me/rainbowkit/styles.css';

export const PluginA = () => {
  const { do_action, add_hook } = useGlobalHook();

  const bootstrap = (_ctx: HookContextType) => {
    // Dome some thing with this;
    add_hook(
      'subtitle',
      () => {
        return <div>Plugin contents</div>;
      },
      'action',
      'PluginA'
    );
  };

  useRegisterPlugin({
    name: 'PluginA',
    author: 'Tam map',
    bootstrap,
  });
  return (
    //Evering will render here.
    <App />
  );
};
