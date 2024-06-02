/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'

const DropDown = ({title,icon}) => {
  return (
    <div className={`flex justify-start items-center space-x-3`}>
        <div className='text-3xl'>{icon}</div>
        <h1 className='text-xl font-bold'>{title}</h1>
    </div>
  )
}

DropDown.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.element
}


DropDown.defaultProps = {
  title: '',
  icon: '',
}

export default DropDown
