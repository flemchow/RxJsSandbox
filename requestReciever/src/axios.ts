import axios from 'axios';

export default class ConcreteAxios {
  #url: string;

  constructor(url: string) {
    this.#url = url;
  }

  async get() {
    try {
      return await axios({
          method: 'get',
          url: this.#url,
        })
    } catch (error) {
      throw new AxiosError(`ConcreteAxios get failed: ${this.#url}`)
    }
  }
}

class AxiosError extends Error {
  constructor(message: string) {
    super(message);
  }
}
