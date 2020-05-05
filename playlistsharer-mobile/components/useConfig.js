import {config} from '../app-config'

export default useConfig = () => {
    const API_HOST = config.API_HOST;

    return {API_HOST}
}
