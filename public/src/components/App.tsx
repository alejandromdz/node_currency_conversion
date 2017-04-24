import * as React from 'react';
import {Header} from './Header';
import List from './List';

export interface AppProps 
{
   
}

export class App extends React.Component<AppProps,undefined>{
    render(){
        return (
            <div>
            <Header/>
            <List/>
            </div>
        );
    }
}