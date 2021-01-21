const stateDefault = {
    dsSlider: [
        { id: 1, name: 'Hinh1', image: './image/1.jpg' },
        { id: 2, name: 'Hinh2', image: './image/2.jpg' },
        { id: 3, name: 'Hinh3', image: './image/3.jpg' },
        { id: 4, name: 'Hinh4', image: './image/4.png' },
    ],
}
export const SliderReducer = (state = stateDefault, action) => {
    return { ...state }
}