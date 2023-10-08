import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
            <h2>Ovo je SPA(single page aplikacija), napravljena u:</h2>
        <ul>
          <li><a href='https://get.asp.net/'>ASP.NET Core</a> i <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> za cros-platform serverski kod</li>
          <li><a href='https://facebook.github.io/react/'>React</a> za klijentski kod</li>
          <li><a href='http://getbootstrap.com/'>Bootstrap</a> za stilisanje</li>
            </ul>
            <h2>Za isprobavanje forme, idite na "Register" </h2>
      </div>
    );
  }
}
