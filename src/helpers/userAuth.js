    const userAuth = () => {
        const session = {
            email: localStorage.getItem('email'),
            token: localStorage.getItem('token')
          };

        return { 'headers': { 'X-User-Email': session.email, 'X-User-Token': session.token  } };
    };

    export default userAuth;
