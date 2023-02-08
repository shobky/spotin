import './cover.css'
import Logo from '../../assets/logo.png'

const Cover = () => {
    return (
        <div className='cover-container'>
            <img className='cover-logo' src={Logo} alt="logo" />
            <div className='cover__vertical'>
                <p className='cover_small-ball cover_play'>PLAY</p>
                <p className='cover_small-ball cover_meet'>MEET</p>
            </div>
            <p className='cover_big-ball'>LEARN</p>
            <div className='cover_brown-ball'></div>
        </div>
    )
}

export default Cover