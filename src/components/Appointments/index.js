// Write your code here
import {Component} from 'react'

import {format} from 'date-fns'

import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentList: [],
    isFilteredStar: false,
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()

    const {titleInput, dateInput} = this.state

    const formatedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: uuidv4(),
      title: titleInput,
      date: formatedDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onClickStarred = () => {
    const {isFilteredStar} = this.state
    this.setState({isFilteredStar: !isFilteredStar})
  }

  toggledIsStarred = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  getFilteredAppointmentList = (appointmentList, isFilteredStar) => {
    if (isFilteredStar) {
      return appointmentList.filter(
        eachAppointment => eachAppointment.isStarred === true,
      )
    }
    return appointmentList
  }

  render() {
    const {titleInput, dateInput, appointmentList, isFilteredStar} = this.state
    const starredClassName = isFilteredStar ? 'active-starred' : 'starred'
    const filteredAppointmentList = this.getFilteredAppointmentList(
      appointmentList,
      isFilteredStar,
    )

    return (
      <div className="app-container">
        <div className="appointment-container">
          <div className="form-image-con">
            <form className="form" onSubmit={this.onAddAppointment}>
              <h1 className="heading">Add Appointment</h1>
              <label className="label" htmlFor="title">
                TITLE
              </label>
              <input
                className="title-input"
                id="title"
                type="text"
                value={titleInput}
                onChange={this.onChangeTitleInput}
                placeholder="Title"
              />
              <label className="label" htmlFor="date">
                DATE
              </label>
              <input
                className="date-input"
                id="date"
                type="date"
                value={dateInput}
                onChange={this.onChangeDateInput}
              />
              <br />
              <button className="add-btn" type="submit">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
          </div>
          <hr className="line" />
          <div className="appointments-con">
            <h1 className="sub-heading">Appointments</h1>
            <button
              className={starredClassName}
              type="button"
              onClick={this.onClickStarred}
            >
              Starred
            </button>
          </div>
          <ul className="appointment-list">
            {filteredAppointmentList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                toggledIsStarred={this.toggledIsStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
