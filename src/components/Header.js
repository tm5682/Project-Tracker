//Header component 
//Button component imported 

import PropTypes from 'prop-types'
import Button from './Button'

const Header = ( { title } ) => {

    const onClick = () => {
        console.log('click')
    }

    return (
        <header className='header'>
          <h1>{title}</h1>  
          <Button color='green' text ='Hello' onClick={onClick} />
        </header>
    )
}

Header.defaultProps = {
    title: 'Project Tracker',
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header
