// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggledIsStarred} = props
  const {id, title, date, isStarred} = appointmentDetails

  const onClickStar = () => {
    toggledIsStarred(id)
  }

  const starImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <li className="appointment-item">
      <div className="item-container">
        <div className="appoint-heading-star-con">
          <p className="appoint-heading">{title}</p>
          <button
            className="star-btn"
            data-testid="star"
            type="button"
            onClick={onClickStar}
          >
            <img src={starImgUrl} alt="star" className="star-img" />
          </button>
        </div>
        <p className="date-time">{date}</p>
      </div>
    </li>
  )
}
export default AppointmentItem
