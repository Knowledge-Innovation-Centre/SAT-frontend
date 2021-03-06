import { Request, Response, RequestError } from 'vue-mc'
import axios from './../axios'

export default class CustomRequest extends Request {
  constructor(config) {
    super()
    this.config = config
  }

  /**
   * @returns {Promise}
   */
  send() {
    return axios
      .request(this.config)
      .then(response => {
        return new Response(response)
      })
      .catch(error => {
        throw new RequestError(error, new Response(error.response))
      })
  }
}
