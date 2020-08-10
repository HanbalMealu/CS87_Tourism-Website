import axios from 'axios'

export const register = newUser => {
  return axios
    .post('users/register', {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password,
      contact:newUser.contact,
      cnic:newUser.cnic,
      gender:newUser.gender,
      pic:newUser.pic
    })
    .then(response => {
      console.log('Registered')
    })
}

export const login = user => {
  return axios
    .post('users/login', {
      email: user.email,
      password: user.password
    })
    .then(response => {
      localStorage.setItem('usertoken', response.data)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}
export const adminlogin = user => {
  return axios
    .post('users/login', {
      email: user.email,
      password: user.password
    })
    .then(response => {
      localStorage.setItem('admintoken', response.data)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}


export const getProfile = user => {
  return axios
    .get('users/profile', {
      //headers: { Authorization: ` ${this.getToken()}` }
    })
    .then(response => {
      console.log(response)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const postTour= newTrip => {
    return axios
      .post('trips/register', {
        departure_city:newTrip.departure_city ,
        departure_date:newTrip. departure_date,
        departure_time: newTrip.departure_time,
        arrival_city: newTrip.arrival_city,
        arrival_date:newTrip.arrival_date,
        return_date:newTrip.return_date,
        cost:newTrip.cost,
        details:newTrip.details,
        touroperator_id:newTrip.touroperator_id,
        errors: {}
      })
      .then(response => {
        console.log('Registered')
      })
  }

  export const rentService= newService => {
    return axios
      .post('rentalservices/register', {
        category:newService.category,
        title:newService.title,
        location:newService.location,
        price:newService.price,
        details:newService.details,
        touroperator_id:newService.touroperator_id,
        errors: {}
      })
      .then(response => {
        console.log('Registered')
      })
  }
