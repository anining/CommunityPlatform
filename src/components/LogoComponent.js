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
    paddingTop: '10%',
    height: 100,
  },
  logo: {
    width: '88%',
    marginLeft: '6%',
    height: '60%',
    background: "#2C67FF"
  }
}

export default LogoComponent
