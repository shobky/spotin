import { ImSpinner8 } from 'react-icons/im'
import './spinner.css'
const Spinner = ({ text }) => {
    return (
        <div className='loading-spinnner'>
            <div className='loadign-spinner_ico' ></div>
            {
                text &&
                <p> {text} </p>

            }
        </div>
    )
}

export default Spinner