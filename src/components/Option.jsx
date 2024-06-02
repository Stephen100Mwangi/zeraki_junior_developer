/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import SubOption from './SubOption'

const Option = ({text,icon}) => {
  return (
      <div className='flex space-x-5 justify-start items-center'>
        <div className='text-white text-2xl'>{icon}</div>
        <div className='text-white text-lg'>{text}</div>
      </div>
   
  )
}

Option.propTypes = {
    icon: PropTypes.element,
    text: PropTypes.string
}

Option.defaultProps = {
    icon: "",
    text: ""
}

export default Option
