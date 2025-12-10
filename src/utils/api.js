// src/utils/api.js
class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  async _request(path, options = {}) {
    const res = await fetch(`${this._baseUrl}${path}`, {
      headers: this._headers,
      ...options,
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`API error ${res.status}: ${text}`);
    }
    return res.json();
  }

  // --- USER ---
  getUserInfo() {
    return this._request('/users/me');
  }

  setUserInfo({ name, about }) {
    return this._request('/users/me', {
      method: 'PATCH',
      body: JSON.stringify({ name, about }),
    });
  }

  setUserAvatar({ avatar }) {
    return this._request('/users/me/avatar', {
      method: 'PATCH',
      body: JSON.stringify({ avatar }),
    });
  }

  // --- CARDS ---
  getCardList() {
    return this._request('/cards');
  }

  // compatibilidade com o nome antigo:
  getInitialCards() {
    return this.getCardList();
  }

  addCard({ name, link }) {
    return this._request('/cards', {
      method: 'POST',
      body: JSON.stringify({ name, link }),
    });
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: 'DELETE',
    });
  }
  
  // --- LIKES ---
  changeLikeCardStatus(cardId, like) {
    return this._request(`/cards/${cardId}/likes`, {
      method: like ? 'PUT' : 'DELETE',
    });
  }

  getInitialData() {
    return Promise.all([this.getUserInfo(), this.getCardList()]);
  }  
}


// CONFIG
const BASE_URL = 'https://around-api.pt-br.tripleten-services.com/v1';
const TOKEN = '80bec454-e86a-45fb-87e6-90e02b604577'; 

const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    authorization: TOKEN,
    'Content-Type': 'application/json',
  },
});

export default api;


// // ================validado ===========================================

// // ULTIMAS ATUALIZAÇÕES FICOU PERFEITO (SÓ FALTA OS LOADING)
// // src/utils/api.js
// class Api {
//   constructor({ baseUrl, headers }) {
//     this._baseUrl = baseUrl;
//     this._headers = headers;
//   }

//   async _request(path, options = {}) {
//     const res = await fetch(`${this._baseUrl}${path}`, {
//       headers: this._headers,
//       ...options,
//     });
//     if (!res.ok) {
//       const text = await res.text();
//       throw new Error(`API error ${res.status}: ${text}`);
//     }
//     return res.json();
//   }

//   // --- USER ---
//   getUserInfo() {
//     return this._request('/users/me');
//   }

//   setUserInfo({ name, about }) {
//     return this._request('/users/me', {
//       method: 'PATCH',
//       body: JSON.stringify({ name, about }),
//     });
//   }

//   setUserAvatar({ avatar }) {
//     return this._request('/users/me/avatar', {
//       method: 'PATCH',
//       body: JSON.stringify({ avatar }),
//     });
//   }

//   // --- CARDS ---
//   getCardList() {
//     return this._request('/cards');
//   }

//   // compatibilidade com o nome antigo:
//   getInitialCards() {
//     return this.getCardList();
//   }

//   addCard({ name, link }) {
//     return this._request('/cards', {
//       method: 'POST',
//       body: JSON.stringify({ name, link }),
//     });
//   }

//   deleteCard(cardId) {
//     return this._request(`/cards/${cardId}`, {
//       method: 'DELETE',
//     });
//   }

//   // --- LIKES ---
//   changeLikeCardStatus(cardId, like) {
//     return this._request(`/cards/${cardId}/likes`, {
//       method: like ? 'PUT' : 'DELETE',
//     });
//   }

//   getInitialData() {
//     return Promise.all([this.getUserInfo(), this.getCardList()]);
//   }  
// }


// // CONFIG
// const BASE_URL = 'https://around-api.pt-br.tripleten-services.com/v1';
// const TOKEN = '80bec454-e86a-45fb-87e6-90e02b604577';

// const api = new Api({
//   baseUrl: BASE_URL,
//   headers: {
//     authorization: TOKEN,
//     'Content-Type': 'application/json',
//   },
// });

// export default api;

// // =========================================================================




// class Api {
//   constructor({ baseUrl, headers }) {
//     this._baseUrl = baseUrl;
//     this._headers = headers;
//   }

//   async _request(path, options = {}) {
//     const res = await fetch(`${this._baseUrl}${path}`, {
//       headers: this._headers,
//       ...options,
//     });
//     if (!res.ok) {
//       const text = await res.text();
//       throw new Error(`API error ${res.status}: ${text}`);
//     }
//     return res.json();
//   }

//   getUserInfo() {
//     return this._request('/users/me');
//   }

//   getCardList() {
//     return this._request('/cards');
//   }

//   setUserInfo({ name, about }) {
//     return this._request('/users/me', {
//       method: 'PATCH',
//       body: JSON.stringify({ name, about }),
//     });
//   }

//   setUserAvatar({ avatar }) {
//     return this._request('/users/me/avatar', {
//       method: 'PATCH',
//       body: JSON.stringify({ avatar }),
//     });
//   }

//   addCard({ name, link }) {
//     return this._request('/cards', {
//       method: 'POST',
//       body: JSON.stringify({ name, link }),
//     });
//   }

//   changeLikeCardStatus(cardId, like) {
//     // like = true -> PUT, like = false -> DELETE
//     return this._request(`/cards/${cardId}/likes`, {
//       method: like ? 'PUT' : 'DELETE',
//     });
//   }

//   deleteCard(cardId) {
//     return this._request(`/cards/${cardId}`, {
//       method: 'DELETE',
//     });
//   }
// }

// // CONFIGURA
// const BASE_URL = 'https://around-api.pt-br.tripleten-services.com/v1'; 
// const TOKEN = '80bec454-e86a-45fb-87e6-90e02b604577'; 

// const api = new Api({
//   baseUrl: BASE_URL,
//   headers: {
//     authorization: TOKEN,
//     'Content-Type': 'application/json',
//   },
// });

// export default api;
