import React from 'react'

function LogoComponent () {

  return (
    <div style={styles.logoView}>
      <div style={styles.logo}/>
    </div>
  )
}

const styles = {
  logoView: {
    boxSizing: 'border-box',
    paddingTop: 12,
    height: 104,
  },
  logo: {
    width: 168,
    marginLeft: 16,
    height: 62,
    background: "#2C67FF"
  }
}

export default LogoComponent
