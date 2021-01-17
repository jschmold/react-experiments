import React from 'react';
import './Welcome.scss'

export interface IWelcomeProps {
  name?: string;
}

export function Welcome(props: IWelcomeProps = {}) {
  if (props.name == null || props?.name.length === 0) {
    return (
      <div className="welcome">
        <h3 className="message">Welcome to the App!</h3>
      </div>
    )
  }

  return (
    <div className="welcome">
      <h3 className="message">Welcome to the App, {props?.name} !</h3>
    </div>
  ) 
}