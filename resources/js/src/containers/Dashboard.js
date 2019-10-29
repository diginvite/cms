import React, { Component } from 'react';
import {Link, Route}  from 'react-router-dom';

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <section className="content-header">
          <h1>
            Dashboard
            <small>Control panel</small>
          </h1>
          <ol className="breadcrumb">
            <li className="active">Dashboard</li>
          </ol>
        </section>
      </div>
    );
  }
}
