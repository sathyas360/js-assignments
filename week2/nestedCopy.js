const state = {
  user: { id: 101, details: { city: 'Bangalore' } },
  theme: 'dark'
};

const newState = {
    ...state,
    user: {
        ...state.user,
        details: {
            ...state.user.details,
            city: 'Chennai'
        }
    }
}

console.log(state.user.details.city)