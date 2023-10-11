"use client"
import React, { Component } from "react";

import { Crisp } from "crisp-sdk-web";

class CrispChat extends Component {
  componentDidMount () {
    Crisp.configure("23740f2b-9191-4167-a717-159d70220021");
  }

  render () {
    return null;
  }
}
export default CrispChat