const serverUrl = 'https://6db6-117-207-140-43.in.ngrok.io'

const runAPI = async (url, body) => {
  const apiUrl = new URL(`${serverUrl}${url}`)

  return await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  }).then(res => res.json())
}

// ===========================================================================================================

var token = localStorage.getItem('token')

export const getToken = () => {
  token = localStorage.getItem('token')
  return token ? token : null
}
export const setToken = newToken => {
  localStorage.setItem('token', newToken)
}

export const getProfile = () => {
  return localStorage.getItem('profile')
}
export const setProfile = newProfile => {
  localStorage.setItem('profile', JSON.stringify(newProfile))
}

export const getRole = () => {
  let profile = localStorage.getItem('profile')
  return profile ? JSON.parse(profile).role : null
}

//clear the local storage
export const clearData = () => {
  console.log('clear data')
  localStorage.removeItem('token')
  localStorage.removeItem('profile')
  window.location.href = '/login.html'
}

// ===========================================================================================================
// Auth APIs

// API to register a user
export const registerAPI = async details => {
  return await runAPI('/auth/register', details)
}

// API to login a user, staff, or doctor
export const loginAPI = async details => {
  return await runAPI('/auth/login', details)
}

// ===========================================================================================================
// APIs related to a patient

// API to get profile
export const getProfileAPI = async () => {
  return await runAPI('/user/profile')
}

// API to create a new appointment
export const createAppointmentAPI = async (date, notes) => {
  return await runAPI('/user/create-appointment', { date, notes })
}

// API to cancel an appointment
export const cancelAppointmentAPI = async appointmentId => {
  return await runAPI('/user/cancel-appointment', { id: appointmentId })
}



// ===========================================================================================================
// APIs related to a doctor

// View appointments for a doctor
export const viewAppointmentsAPI = async () => {
  return await runAPI('/doctor/appointments')
}

// Modify an appointment
export const modifyAppointmentAPI = async (id, prescription) => {
  return await runAPI('/doctor/modify-appointment', { id, prescription })
}



// ===========================================================================================================
// APIs related to a staff

// API to add a new staff, doctor, or patient
export const addNewStaffAPI = async details => {
  return await runAPI('/auth/addStaff', details)
}

// API to remove a staff, doctor, or patient
export const removeStaffAPI = async email => {
  return await runAPI('/auth/removeStaff', { email })
}

// API to get all patients
export const getPatientsAPI = async () => {
  return await runAPI('/staff/patients')
}

// API to get all doctors
export const getDoctorsAPI = async () => {
  return await runAPI('/staff/doctors')
}

// API to get all the appointments
export const getAppointmentsAPI = async () => {
  return await runAPI('/staff/appointments')
}

// API to approve or deny an appointment
export const respondAppointmentAPI = async (id, status, doctor, time) => {
  return await runAPI('/staff/modify-appointment', {
    id,
    status,
    doctor,
    time
  })
}

// Get appointment by id
export const getAppointmentByIdAPI = async id => {
  return await runAPI(`/staff/appointment/${id}`)
}

// Get number of appointment count for every doctor on a particular date
export const getAppointmentCountAPI = async date => {
  return await runAPI('/staff/appointment-count', { date })
}

// ===========================================================================================================
