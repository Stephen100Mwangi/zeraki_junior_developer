/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'

const SubOption = ({icon,text}) => {
  return (
    <div className='flex space-x-3 justify-start items-center'>
        <div className='text-green-500 font-semibold text-xl'>{icon}</div>
        <div className='text-green-500 text-base'>{text}</div>
    </div>
  )
}


SubOption.propTypes = {
    icon: PropTypes.element,
    text: PropTypes.string
}

SubOption.defaultProps = {
    icon: '',
    text: ''
}
export default SubOption
