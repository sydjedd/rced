import axios from 'axios'

const options = {
  // Gestion automatique du jeton avec une variable X-CSRFToken dans l entete
  // au lieu de la variable csrfmiddlewaretoken dans le body
  /*
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
  */
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
}

if (process.env.NODE_ENV === 'development') {
  options.withCredentials = true
}

async function get (url, data = {}) {
  return xhr('get', url, data)
}

async function post (url, data = {}) {
  return xhr('post', url, data)
}

async function xhr (method = 'get', url, data = {}) {
  options.method = method
  options.url = url
  options.data = data
  try {
    const response = await axios(options)

    if (response.status === 200) {
      return response.data
    }
  } catch (error) {
    // TODO: Boite de dialogue global pour indiquer l erreur
    /*
    store.dispatch('common/showDialog', {
      title: 'Problème Internet',
      text: 'Impossible de se connecter à Internet',
    });
    */
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log(error.response.status)
      console.log(error.response.headers)
      console.log(error.response.data)
    } else if (error.request) {
      /*
      * The request was made but no response was received, `error.request`
      * is an instance of XMLHttpRequest in the browser and an instance
      * of http.ClientRequest in Node.js
      */
      console.log(error.request)
    } else {
      // Something happened in setting up the request and triggered an Error
      console.log('Error', error.message)
    }
    console.log(error)
  }
  return false
}

/*
async function jsonHttpRequest(uri, requestOptions) {
  const apiUrl = process.env.VUE_APP_API_URL || '';
  try {
    requestOptions.headers = {
      'Content-Type': 'application/json',
    };
    if (process.env.NODE_ENV !== 'development') {
      requestOptions.headers['credentials'] = 'same-origin';
    }
    const response = await fetch(apiUrl + uri, requestOptions);
    const responseJson = await response.json();

    if (response.ok) {
      return responseJson;
    }

    // TODO Mieux gerer les erreurs http ex 500 ne pas revenir sur login
    //Gestion plus fine de l'erreur 401 invalid token, expired token,
    if (response.status === 401 && responseJson.message === 'Expired token') {
      //store.dispatch('common/alertError', { text: 'Problème d\'authentification' }) // TODO afficher une fenetre erreur
      user.logout();
      await router.push('/login');
    }

    /*
    if(response.status !== 401) {
      store.dispatch('common/alertError', { text: 'Problème serveur' })
    }

    if(responseJson.message !== 'Authentication error') {
      store.dispatch('user/logout')
      router.push('/login')
    }
    */
/*
  } catch (e) {
    store.dispatch('common/showDialog', {
      title: 'Problème Internet',
      text: 'Impossible de se connecter à Internet',
    });
  }
  return null;
}
*/
export default {
  // jsonHttpRequest,
  get,
  post
}
