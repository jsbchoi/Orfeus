import React from 'react'
import './admin.css'

import { Component } from 'react';
import {Link} from 'react-router-dom';
import { Admin } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

//connect the data provider to the REST endpoint
const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

export default class AdminView extends Component {
    render() {
        return(
            <Admin dataProvider={dataProvider} />
        )
    }
}