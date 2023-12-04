import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

class CowinDashboard extends Component {
  state = {
    productsList: [],
    isLoading: false,
    showSubmitError: false,
  }

  componentDidMount() {
    this.getProducts()
  }

  onSubmitFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({showSubmitError: true})
  }

  getProducts = async () => {
    this.setState({
      isLoading: true,
    })
    const options = {
      method: 'GET',
    }
    const apiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      //   const updatedData = fetchedData.last_7_days_vaccination.map(product => ({
      //     vaccineDate: product.vaccine_date,
      //     brand: product.brand,
      //     dose_1: product.dose_1,
      //     id: product.id,
      //     imageUrl: product.image_url,
      //     rating: product.rating,
      //   }))
      this.setState({
        productsList: fetchedData,
        isLoading: false,
      })
    } else {
      this.onSubmitFailure(response.error_msg)
    }
  }

  noError = () => {
    const {productsList} = this.state
    return (
      <>
        <div>
          <h1>Vaccination Coverage</h1>
          <VaccinationCoverage
            detailsOfCoverage={productsList.last_7_days_vaccination}
          />
        </div>
        <div>
          <h1>Vaccination by gende</h1>
          <VaccinationByGender
            VaccinationByGenderDetails={productsList.vaccination_by_gender}
          />
        </div>
        <div>
          <h1>Vaccination by Age</h1>
          <VaccinationByAge
            VaccinationByAgeDetails={productsList.vaccination_by_age}
          />
        </div>
      </>
    )
  }

  errorMsg = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something went wrong</h1>
    </>
  )

  renderProductsList = () => {
    const {showSubmitError} = this.state
    return (
      <div>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
          />
          <h1>co_Win</h1>
          <h1>CoWIN Vaccination in India</h1>
        </div>
        {showSubmitError ? this.errorMsg() : this.noError()}
      </div>
    )
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  render() {
    const {isLoading} = this.state

    return isLoading ? this.renderLoader() : this.renderProductsList()
  }
}
export default CowinDashboard
