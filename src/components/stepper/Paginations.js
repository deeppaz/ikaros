import React, { Component } from 'react';
import Yiyecek from '../../images/yiyecekler.jpg';
import Icecek from '../../images/icecekler.png';
import Tatli from '../../images/tatlilar.jpg';



export  class BasicExample extends Component {
  render() {
    return (
      <div>
        <a href='#yiyecekler'><img className="" src={Yiyecek} /> </a>
        <a href='#icecekler'> <img className="" src={Icecek} /> </a>
        <a href='#tatlilar'> <img className="" src={Tatli} /> </a>
      </div>
    )
  }
}

export default BasicExample;
