// class Auth {
//   constructor() {
//     this.authenticated = false;
//   }

//   login(cb) {
//     this.authenticated = true;
//     cb();
//   }

//   logout(cb) {
//     this.authenticated = false;
//     cb();
//   }

//   isAuthenticated() {
//     return this.authenticated;
//   }
// }

// export default new Auth();

const Auth = {
  authenticated: false,
  login(cb, data) {
    Auth.authenticated = true;
    sessionStorage.setItem("auth-token", data.token);
    cb();
  },

  logout(cb) {
    Auth.authenticated = false;
    sessionStorage.clear("auth-token");
    cb();
  },

  isAuthenticated() {
    const token = sessionStorage.getItem("auth-token");
    if (token) Auth.authenticated = true;
    return Auth.authenticated;
  },
};

export default Auth;
