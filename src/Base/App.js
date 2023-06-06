const Pet = (props) =>{
    return React.createElement(
        "div",
        {},
        [
            React.createElement("h1", null, props.name),
            React.createElement("h2", null, props.animal),
            React.createElement("h2", {}, props.breed)
        ] // variable arity - can take n numbers of arguments without even if [] is not given. take it as array always.
    );
}

const App = () =>{
    return React.createElement(
        "div",
        {},
        [
            React.createElement("h1",{},"Hey There! How you doin'? "), 
            React.createElement(Pet, {
               animal:"Dog",
               name:"Rocky",
               breed: "Husky"
            }),
            React.createElement(Pet, {
                animal:"Cat",
                name:"Lucy",
                breed: "Don't know"
             })
        ]
    )
}
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));

// react-dom.development.js:73 Warning: ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17.
// ReactDOM.render(<App/>, document.querySelector('#root'))