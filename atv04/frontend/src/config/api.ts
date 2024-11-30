import axios from "axios";

export const Api = () =>{
    return axios.create({
        baseURL: 'http://localhost:32831',
        validateStatus: (status) => {
            // Trata 200, 302, e outros códigos desejados como sucesso
            return status >= 200 && status < 300 || status === 302;
          },
    })
}

export const hostname = 'http://localhost:5000/'