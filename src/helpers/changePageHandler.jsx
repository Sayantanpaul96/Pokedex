

const changePageHandler = (state, action) => {
    switch (action.type) {
        case 'next': 
            return {...state, offset: state.offset + 20, currentPage: state.currentPage + 1 };
        case 'previous':
            return  {...state, offset: state.offset <= 20 ? 0 : state.offset - 20, currentPage: state.currentPage - 1  };
        case 'reset':
            return {...state, offset: 0, currentPage: 1 };
        default:
            return state
    }
}

export default changePageHandler;